#!/usr/bin/env tsx
/**
 * Synchronisation des produits Stripe avec la base de données
 *
 * Ce script permet de:
 * - reset: Archiver tous les produits Stripe existants
 * - sync: Créer les produits de la DB sur Stripe
 * - reload: Reset + Sync
 *
 * Usage:
 *   pnpm stripe:reset   - Archive tous les produits Stripe
 *   pnpm stripe:sync    - Sync les produits DB vers Stripe
 *   pnpm stripe:reload  - Reset + Sync
 */
import PrismaInstance from "@lib/prisma";
import { StripeInstance } from "@lib/stripe";
import "dotenv/config";

const CURRENCY = "eur";

/**
 * Archive tous les produits Stripe existants
 * Note: Stripe ne permet pas de supprimer les produits, seulement de les archiver
 */
const resetStripeProducts = async (): Promise<void> => {
    console.log("🗑️  Archivage des produits Stripe...\n");

    let hasMore = true;
    let startingAfter: string | undefined;
    let archivedCount = 0;

    while (hasMore) {
        const products = await StripeInstance.products.list({
            active: true,
            limit: 100,
            starting_after: startingAfter,
        });

        for (const product of products.data) {
            try {
                // D'abord, retirer le default_price du produit
                if (product.default_price) {
                    await StripeInstance.products.update(product.id, {
                        default_price: "",
                    });
                }

                // Ensuite, archiver tous les prix actifs du produit
                const prices = await StripeInstance.prices.list({
                    product: product.id,
                    active: true,
                });

                for (const price of prices.data) {
                    await StripeInstance.prices.update(price.id, { active: false });
                }

                // Enfin, archiver le produit
                await StripeInstance.products.update(product.id, { active: false });
                archivedCount++;
                console.log(`   ✓ Archivé: ${product.name}`);
            } catch (error) {
                console.error(`   ✗ Erreur pour ${product.name}:`, (error as Error).message);
            }
        }

        hasMore = products.has_more;
        if (products.data.length > 0) {
            startingAfter = products.data[products.data.length - 1].id;
        }
    }

    console.log(`\n✅ ${archivedCount} produits archivés sur Stripe\n`);
};

/**
 * Synchronise les produits de la base de données vers Stripe
 */
const syncProductsToStripe = async (): Promise<void> => {
    console.log("📦 Synchronisation des produits DB vers Stripe...\n");

    // Récupérer tous les produits avec leurs relations
    const products = await PrismaInstance.product.findMany({
        include: {
            Category: true,
            Vendor: true,
        },
    });

    if (products.length === 0) {
        console.log("⚠️  Aucun produit trouvé dans la base de données");
        return;
    }

    console.log(`📋 ${products.length} produits à synchroniser\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
        try {
            // Créer le produit sur Stripe (sans image Stripe, mais avec chemin local en metadata)
            const stripeProduct = await StripeInstance.products.create({
                name: product.name,
                description: product.description,
                metadata: {
                    dbProductId: product.id,
                    categoryId: product.categoryId || "",
                    categoryName: product.Category?.name || "",
                    vendorId: product.vendorId,
                    localImage: product.image,
                },
            });

            // Créer le prix (en centimes)
            const amountInCents = Math.round(product.price * 100);
            const stripePrice = await StripeInstance.prices.create({
                product: stripeProduct.id,
                unit_amount: amountInCents,
                currency: CURRENCY,
            });

            // Mettre à jour le produit avec le prix par défaut
            await StripeInstance.products.update(stripeProduct.id, {
                default_price: stripePrice.id,
            });

            successCount++;
            console.log(`   ✓ ${product.name} (${product.price.toFixed(2)}€)`);
        } catch (error) {
            errorCount++;
            console.error(`   ✗ ${product.name}:`, (error as Error).message);
        }
    }

    console.log(`\n✅ Synchronisation terminée`);
    console.log(`   - Succès: ${successCount}`);
    if (errorCount > 0) {
        console.log(`   - Erreurs: ${errorCount}`);
    }
};

/**
 * Reset et sync complet
 */
const reloadStripeProducts = async (): Promise<void> => {
    await resetStripeProducts();
    await syncProductsToStripe();
};

/**
 * Point d'entrée principal
 */
const main = async (): Promise<void> => {
    const command = process.argv[2];

    try {
        switch (command) {
            case "reset":
                await resetStripeProducts();
                break;

            case "sync":
                await syncProductsToStripe();
                break;

            case "reload":
                await reloadStripeProducts();
                break;

            default:
                console.error("❌ Commande invalide. Utilisez 'reset', 'sync', ou 'reload'");
                console.log("\nUsage:");
                console.log("  pnpm stripe:reset   - Archive tous les produits Stripe");
                console.log("  pnpm stripe:sync    - Sync les produits DB vers Stripe");
                console.log("  pnpm stripe:reload  - Reset + Sync");
                process.exit(1);
        }
    } catch (error) {
        console.error("\n❌ Erreur fatale:", (error as Error).message);
        process.exit(1);
    } finally {
        await PrismaInstance.$disconnect();
    }
};

main();
