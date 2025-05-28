// eslint-disable-next-line
const { createClient } = require('redis')

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error("REDIS_URL environment variable is not defined");

/**
 * Cache Handler Redis pour Next.js 15-canary
 * Compatible avec "use cache", cacheTag, cacheLife
 * 
 * CacheTag: {
 *     stale: number; // expiration cache navigateur (en secondes)
 *     revalidate: number; // revalidation cache serveur (en secondes)
 *     expire: number; // expiration cache serveur (en secondes)
 * }
 * 
 * Fonctionne en dev et prod avec Docker
 */
class RedisCacheHandler {

    constructor() {
        // console.log('🚀 RedisCacheHandler loaded - Methods available:', Object.getOwnPropertyNames(Object.getPrototypeOf(this)));
        this.client = null;
        this.isConnected = false;
        this.connectionPromise = null;
        this.initializeRedis();
    }

    /**
     * Initialise la connexion Redis avec retry automatique
     */
    async initializeRedis() {
        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connectionPromise = this.connectToRedis();
        return this.connectionPromise;
    }

    async connectToRedis() {
        try {
            this.client = createClient({
                url: redisUrl,
                socket: {
                    connectTimeout: 5000,
                    reconnectStrategy: (retries) => {
                        if (retries > 10) {
                            console.warn("🔴 Redis max retries reached, using fallback cache");
                            return false;
                        }
                        return Math.min(retries * 100, 3000);
                    },
                },
            });

            // Gestion des événements Redis
            this.client.on("error", (err) => {
                console.warn("🔴 Redis error:", err.message);
                this.isConnected = false;
            });

            this.client.on("connect", () => {
                // console.log("🟢 Redis connected");
                this.isConnected = true;
            });

            this.client.on("disconnect", () => {
                console.warn("🟡 Redis disconnected");
                this.isConnected = false;
            });

            await this.client.connect();
            this.isConnected = true;
        } catch (error) {
            console.warn("🔴 Failed to connect to Redis:", error);
            this.isConnected = false;
            this.client = null;
        }
    }

    /**
     * Vérifie si Redis est disponible
     */
    async ensureConnection() {
        if (!this.client || !this.isConnected) {
            await this.initializeRedis();
        }
        return this.isConnected && this.client !== null;
    }

    /**
     * Génère une clé Redis avec préfixe
     */
    getCacheKey(key) {
        return `nextjs:cache:${key}`;
    }

    /**
     * Génère une clé pour les tags
     */
    getTagKey(tag) {
        return `nextjs:tag:${tag}`;
    }

    /**
     * Vérifie l'état du cache selon cacheLife
     */
    getCacheStatus(entry) {
        const now = Date.now();
        
        // Vérifie expiration absolue
        if (entry.expireAt && now > entry.expireAt) {
            return 'expired';
        }
        
        // Vérifie si stale
        if (entry.staleUntil && now > entry.staleUntil) {
            return 'stale';
        }
        
        return 'fresh';
    }

    /**
     * Vérifie si une revalidation est nécessaire
     */
    needsRevalidation(entry) {
        const now = Date.now();
        return entry.revalidateAt ? now > entry.revalidateAt : false;
    }

    /**
     * API Next.js Cache Handler - GET
     */
    async get(key) {
        console.log('🔍 Cache GET called for key:', key);
        try {
            if (!(await this.ensureConnection()) || !this.client) {
                return null;
            }

            const cacheKey = this.getCacheKey(key);
            const data = await this.client.get(cacheKey);

            if (!data) {
                return null;
            }

            const parsed = JSON.parse(data);
            const status = this.getCacheStatus(parsed);
            
            // Si expiré, supprimer et retourner null
            if (status === 'expired') {
                await this.client.del(cacheKey);
                return null;
            }
            
            // Si revalidation nécessaire, déclencher en arrière-plan
            if (this.needsRevalidation(parsed)) {
                console.log(`🔄 Cache needs revalidation for key: ${key}`);
            }
            
            // Retourner les données (même si stale)
            return {
                lastModified: parsed.lastModified,
                value: parsed.value,
            };
        } catch (error) {
            console.warn("🔴 Redis GET error:", error);
            return null;
        }
    }

    /**
     * API Next.js Cache Handler - SET
     */
    async set(key, data, ctx) {
        console.log('💾 Cache SET called for key:', key, 'ctx:', ctx);
        try {
            if (!(await this.ensureConnection()) || !this.client) {
                return;
            }

            const cacheKey = this.getCacheKey(key);
            const tags = ctx?.tags || [];

            const entry = {
                value: data.value,
                lastModified: data.lastModified,
                tags,
            };

            // Stocker l'entrée de cache
            await this.client.set(cacheKey, JSON.stringify(entry));

            // Associer les tags à cette clé
            if (tags.length > 0) {
                const pipeline = this.client.multi();

                for (const tag of tags) {
                    const tagKey = this.getTagKey(tag);
                    pipeline.sAdd(tagKey, cacheKey);
                }

                await pipeline.exec();
            }
        } catch (error) {
            console.warn("🔴 Redis SET error:", error);
        }
    }

    /**
     * API Next.js Cache Handler - Revalidate by tag
     */
    async revalidateTag(tag) {
        try {
            if (!(await this.ensureConnection()) || !this.client) {
                return;
            }

            const tagKey = this.getTagKey(tag);

            // Récupérer toutes les clés associées à ce tag
            const cacheKeys = await this.client.sMembers(tagKey);

            if (cacheKeys.length > 0) {
                const pipeline = this.client.multi();

                // Supprimer toutes les entrées de cache
                for (const cacheKey of cacheKeys) {
                    pipeline.del(cacheKey);
                }

                // Supprimer le set de tag
                pipeline.del(tagKey);

                await pipeline.exec();

                console.log(`🔄 Revalidated tag "${tag}" (${cacheKeys.length} entries)`);
            }
        } catch (error) {
            console.warn("🔴 Redis REVALIDATE_TAG error:", error);
        }
    }

    /**
     * API "use cache" - getCacheEntry
     */
    async getCacheEntry(key) {
        console.log('🔍 getCacheEntry called for key:', key);
        return this.get(key);
    }

    /**
     * API "use cache" - setCacheEntry avec support cacheLife complet
     */
    async setCacheEntry(key, entry, ctx) {
        console.log('💾 setCacheEntry called for key:', key, 'ctx:', ctx);
        try {
            if (!(await this.ensureConnection()) || !this.client) {
                return;
            }

            const now = Date.now();
            const cacheKey = this.getCacheKey(key);
            const tags = ctx?.tags || [];
            
            // Calculer les timestamps selon cacheLife
            let staleUntil;
            let revalidateAt;
            let expireAt;
            let redisTTL;

            if (ctx?.cacheLife) {
                const { stale, revalidate, expire } = ctx.cacheLife;
                
                if (stale) {
                    staleUntil = now + (stale * 1000);
                }
                
                if (revalidate) {
                    revalidateAt = now + (revalidate * 1000);
                }
                
                if (expire) {
                    expireAt = now + (expire * 1000);
                    redisTTL = expire; // TTL Redis en secondes
                }
            } else if (ctx?.revalidate) {
                // Fallback pour l'ancienne API
                redisTTL = ctx.revalidate;
                expireAt = now + (ctx.revalidate * 1000);
            }

            const cacheEntry = {
                value: entry.value,
                lastModified: entry.lastModified,
                tags,
                staleUntil,
                revalidateAt,
                expireAt,
            };

            // Stocker l'entrée avec métadonnées cacheLife
            await this.client.set(cacheKey, JSON.stringify(cacheEntry));

            // Appliquer TTL Redis si défini
            if (redisTTL) {
                await this.client.expire(cacheKey, redisTTL);
            }

            // Associer les tags
            if (tags.length > 0) {
                const pipeline = this.client.multi();

                for (const tag of tags) {
                    const tagKey = this.getTagKey(tag);
                    pipeline.sAdd(tagKey, cacheKey);
                }

                await pipeline.exec();
            }

            console.log(`💾 Cache set for key: ${key}`, {
                staleUntil: staleUntil ? new Date(staleUntil).toISOString() : 'none',
                revalidateAt: revalidateAt ? new Date(revalidateAt).toISOString() : 'none',
                expireAt: expireAt ? new Date(expireAt).toISOString() : 'none',
            });

        } catch (error) {
            console.warn("🔴 Redis SET_CACHE_ENTRY error:", error);
        }
    }

    /**
     * API "use cache" - deleteCacheEntry
     */
    async deleteCacheEntry(key) {
        try {
            if (!(await this.ensureConnection()) || !this.client) {
                return;
            }

            const cacheKey = this.getCacheKey(key);

            // Récupérer l'entrée pour obtenir les tags
            const data = await this.client.get(cacheKey);

            if (data) {
                const parsed = JSON.parse(data);

                // Supprimer l'entrée de cache
                await this.client.del(cacheKey);

                // Nettoyer les références dans les tags
                if (parsed.tags && parsed.tags.length > 0) {
                    const pipeline = this.client.multi();

                    for (const tag of parsed.tags) {
                        const tagKey = this.getTagKey(tag);
                        pipeline.sRem(tagKey, cacheKey);
                    }

                    await pipeline.exec();
                }
            }
        } catch (error) {
            console.warn("🔴 Redis DELETE_CACHE_ENTRY error:", error);
        }
    }

    /**
     * Fermeture propre de la connexion
     */
    async close() {
        if (this.client && this.isConnected) {
            await this.client.quit();
            this.isConnected = false;
        }
    }
}

// Export pour Next.js (la classe, pas l'instance)
module.exports = RedisCacheHandler;
