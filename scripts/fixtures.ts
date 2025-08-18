#!/usr/bin/env tsx
/**
 * Gestion des données de test (fixtures)
 *
 * Ce script permet de:
 * - Initialiser la base de données avec des données de test
 * - Réinitialiser la base de données
 * - Recharger entièrement les données (reset + fixtures)
 *
 * Architecture:
 * - data.ts: définit les données à charger dans la base
 * - commands.ts: implémente les commandes pour manipuler les données
 */
import { fixtures, reload, reset } from "./fixtures/commands";

/**
 * Point d'entrée principal du script
 * Analyse les arguments de ligne de commande et exécute la commande appropriée
 */
const main = async (): Promise<void> => {
    const command = process.argv[2];

    switch (command) {
        case "setup":
            // Charge les données de test dans la base de données
            await fixtures();
            break;

        case "reset":
            // Supprime toutes les données de la base
            await reset();
            break;

        case "reload":
            // Réinitialise et recharge toutes les données
            await reload();
            break;

        default:
            console.error("❌ Invalid command. Use 'setup', 'reset', or 'reload'");
            break;
    }
};

// Exécuter le script
main();
