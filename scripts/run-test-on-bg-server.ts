#!/usr/bin/env tsx
/**
 * Lance les tests d'intégration avec un serveur Next.js dédié sur le port 3005
 *
 * Usage:
 * - Dev: `tsx scripts/run-test-on-bg-server.ts`
 * - Prod: `tsx scripts/run-test-on-bg-server.ts --prod`
 *
 * Ce script :
 * 1. Lance un serveur Next.js dédié sur le port 3005 avec le répertoire .next-test
 * 2. Attend que le serveur soit prêt (première requête GET / 200)
 * 3. Lance les tests Vitest avec NEXT_PUBLIC_BASE_URL=http://localhost:3005
 * 4. Nettoie : arrête le serveur port 3005 et supprime .next-test/
 *
 * Avantages :
 * - Aucun conflit avec le serveur dev principal (port 3000)
 * - Build/cache isolés dans .next-test/ au lieu de .next/
 * - Logs filtrés (pas de bruit des erreurs source map)
 */
import { exec, spawn } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Configuration
const isProduction = process.argv.includes("--prod");
const PORT = "3005"; // Port dédié aux tests (évite conflit avec dev sur 3000)
const NEXT_PUBLIC_BASE_URL = "http://localhost:3005";

/**
 * Vérifie si le serveur répond sur le port de test
 */
async function checkServer(): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(NEXT_PUBLIC_BASE_URL, {
            signal: controller.signal,
        });

        clearTimeout(timeout);
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Filtre les logs en supprimant les erreurs legacy de source map Prisma/Vitest
 */
function filterLogs(text: string): string {
    return text
        .split("\n")
        .filter((line) => !line.includes("Failed to load source map for"))
        .filter((line) => !line.includes("library.js.map"))
        .filter((line) => !line.includes("ENOENT: no such file or directory"))
        .filter((line) => !line.includes("extractSourcemapFromFile"))
        .filter((line) => !line.includes("loadAndTransform"))
        .filter((line) => !line.includes("at async open (node:internal/fs/promises"))
        .filter((line) => !line.includes("at async Object.readFile (node:internal/fs/promises"))
        .filter((line) => !line.includes("at async extractSourcemapFromFile"))
        .filter((line) => !line.includes("at async loadAndTransform"))
        .filter((line) => !line.includes("node_modules/.pnpm/vite@"))
        .join("\n");
}

/**
 * Build l'application en mode production avec le répertoire .next-test
 */
async function buildApp(): Promise<void> {
    console.log("🔨 Build de l'application...");

    return new Promise((resolve, reject) => {
        const buildProcess = spawn("pnpm", ["run", "build"], {
            stdio: ["inherit", "inherit", "inherit"],
            env: {
                ...process.env,
                NEXT_TEST_MODE: "true",
            },
        });

        buildProcess.on("close", (code) => {
            if (code === 0) {
                console.log("✅ Build terminé avec succès");
                resolve();
            } else {
                console.error("\n❌ Erreur lors du build");
                reject(new Error(`Build échoué avec le code ${code}`));
            }
        });
    });
}

/**
 * Lance le serveur Next.js dédié sur le port 3005 (dev ou prod)
 */
async function startServer(): Promise<void> {
    if (isProduction) {
        await buildApp();
        console.log("\n🚀 Lancement du serveur de production...");

        return new Promise((resolve) => {
            const prodProcess = spawn("pnpm", ["run", "start"], {
                stdio: ["ignore", "pipe", "pipe"], // Capturer les logs
                detached: true,
                env: {
                    ...process.env,
                    PORT,
                    NEXT_PUBLIC_BASE_URL,
                    NEXT_TEST_MODE: "true",
                },
            });

            let serverStarted = false;

            // Filtrer et afficher seulement les logs de démarrage
            prodProcess.stdout?.on("data", (data) => {
                const output = data.toString();

                // Afficher seulement jusqu'au message de démarrage
                if (!serverStarted) {
                    process.stdout.write(output);

                    // Next.js prod affiche
                    if (output.includes("Ready in")) {
                        serverStarted = true;
                        setTimeout(() => resolve(), 1000);
                    }
                }
            });

            prodProcess.stderr?.on("data", (data) => {
                if (!serverStarted) {
                    process.stderr.write(data.toString());
                }
            });

            // Timeout au cas où le message de démarrage n'apparaît pas
            setTimeout(() => {
                if (!serverStarted) {
                    serverStarted = true;
                    resolve();
                }
            }, 10000);
        });
    } else {
        console.log("🚀 Lancement du serveur de développement...");

        return new Promise((resolve) => {
            const devProcess = spawn("pnpm", ["run", "dev"], {
                stdio: ["ignore", "pipe", "pipe"], // Capturer les logs
                detached: true,
                env: {
                    ...process.env,
                    PORT,
                    NEXT_PUBLIC_BASE_URL,
                    NEXT_TEST_MODE: "true",
                },
            });

            let readyFound = false;

            // Filtrer et afficher seulement les logs de démarrage
            devProcess.stdout?.on("data", (data) => {
                const output = data.toString();

                // Afficher les logs jusqu'au premier GET 200
                if (!readyFound) {
                    process.stdout.write(output);

                    // Déclencher une requête après "Ready"
                    // Cela provoque "Compiling / ..."
                    if (output.includes("Ready in")) {
                        setTimeout(() => {
                            fetch(NEXT_PUBLIC_BASE_URL).catch(() => {});
                        }, 500);
                    }

                    // Quand "Compiled / in ..." puis "GET / 200 in ..."
                    if (output.includes("GET / 200 in")) {
                        readyFound = true;
                        setTimeout(() => resolve(), 1000); // Petite pause après Ready
                    }
                }
            });

            devProcess.stderr?.on("data", (data) => {
                if (!readyFound) {
                    process.stderr.write(data.toString());
                }
            });

            // Timeout au cas où "Ready" n'apparaît pas
            setTimeout(() => {
                if (!readyFound) {
                    readyFound = true;
                    resolve();
                }
            }, 10000);
        });
    }
}

/**
 * Attend que le serveur de test soit prêt (max 30 secondes)
 */
async function waitForServer(): Promise<void> {
    for (let i = 0; i < 30; i++) {
        if (await checkServer()) {
            console.log(`\n✅ Serveur prêt sur le port ${PORT}`);
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error("❌ Timeout : le serveur n'est pas prêt après 30s");
}

/**
 * Lance les tests Vitest avec l'URL du serveur de test
 */
async function runTests(): Promise<boolean> {
    console.log("\n🧪 Lancement des tests...");

    try {
        // Configurer l'URL du serveur de test pour Vitest
        const { stdout, stderr } = await execAsync("pnpm test:run", {
            env: {
                ...process.env,
                NEXT_PUBLIC_BASE_URL,
            },
        });

        const filteredStdout = filterLogs(stdout);
        const filteredStderr = stderr ? filterLogs(stderr) : "";

        console.log(filteredStdout);

        if (filteredStderr && filteredStderr.trim()) {
            console.error(filteredStderr);
        }

        console.log("🎉 Tous les tests sont passés avec succès !");
        return true;
    } catch (error: unknown) {
        console.error("\n❌ Tests échoués :");
        const errorOutput = (error as Error & { stdout?: string }).stdout || (error as Error).message;

        const filteredError = filterLogs(errorOutput);

        console.error(filteredError);
        return false;
    }
}

/**
 * Arrête le serveur de test et nettoie les fichiers temporaires
 */
async function stopServer(): Promise<void> {
    console.log("\n🛑 Arrêt du serveur...");

    try {
        // Tuer seulement les processus sur le port 3005 (préserve le port 3000)
        await execAsync(`lsof -ti:${PORT} | xargs kill -9 &>/dev/null || true`);

        // Nettoyer le répertoire de cache de test
        await execAsync("rm -rf .next-test &>/dev/null || true");

        console.log("✅ Serveur arrêté avec succès");
    } catch {
        console.log("⚠️ Erreur lors de l'arrêt du serveur");
    }
}

/**
 * Script principal
 */
async function main(): Promise<void> {
    try {
        // 1. Lancer le serveur
        await startServer();

        // 2. Attendre qu'il soit prêt
        await waitForServer();

        // 3. Lancer les tests
        const testsSuccess = await runTests();

        // 4. Arrêter le serveur
        await stopServer();

        // Exit avec le code approprié
        process.exit(testsSuccess ? 0 : 1);
    } catch (error) {
        console.error("💥 Erreur :", (error as Error).message);
        await stopServer();
        process.exit(1);
    }
}

process.on("SIGINT", async () => {
    console.log("\n🛑 Interruption détectée...");
    await stopServer();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    await stopServer();
    process.exit(1);
});

// Lancer le script
main();
