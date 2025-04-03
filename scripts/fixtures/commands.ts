import { insertUsers } from "@fixtures/userData";
import PrismaInstance from "@lib/prisma";
import {
    insertArticles,
    insertCategories,
    insertDIYs,
    insertFruits,
    insertProducts,
} from "./index";

/**
 * Commandes pour la gestion des données de test (fixtures)
 *
 * Ce module fournit des fonctions pour:
 * - Charger des données de test initiales dans la base de données
 * - Réinitialiser la base de données
 * - Recharger entièrement les données (reset + fixtures)
 */

/**
 * Charge toutes les données de test dans la base de données
 *
 * Crée dans l'ordre:
 * 1. Utilisateurs et comptes
 * 2. Fruits
 * 3. Catégories
 * 4. Produits (liés aux vendeurs et catégories)
 * 5. Articles et leur contenu
 * 6. DIY (Do It Yourself) et leur contenu
 *
 * @returns true si les données ont été chargées avec succès, false sinon
 */
export const fixtures = async () => {
    try {
        // Exécuter les insertions dans l'ordre des dépendances
        await insertUsers();
        await insertCategories();
        await insertProducts();
        await insertArticles();
        await insertDIYs();
        await insertFruits();

        console.log("✅ Fixtures created successfully");
    } catch (error) {
        console.error((error as Error).message);
    }
};

/**
 * Supprime toutes les données des tables principales
 *
 * Nettoie la base de données en supprimant les données dans l'ordre
 * pour respecter les contraintes de clés étrangères.
 *
 * @returns true si le nettoyage a réussi, false sinon
 */
export const reset = async () => {
    try {
        // Supprimer d'abord les tables avec des clés étrangères
        await PrismaInstance.content.deleteMany({});
        await PrismaInstance.diy.deleteMany({});
        await PrismaInstance.article.deleteMany({});
        await PrismaInstance.product.deleteMany({});

        // Puis les tables de sécurité
        await PrismaInstance.verification.deleteMany({});
        await PrismaInstance.session.deleteMany({});
        await PrismaInstance.account.deleteMany({});

        // Enfin les tables principales
        await PrismaInstance.fruit.deleteMany({});
        await PrismaInstance.category.deleteMany({});
        await PrismaInstance.user.deleteMany({});

        console.log("✅ Database reset successfully");
    } catch (error) {
        console.error((error as Error).message);
    }
};

/**
 * Recharge complètement les données (reset + fixtures)
 *
 * Effectue un nettoyage complet de la base puis recharge
 * toutes les données de test dans l'ordre approprié.
 *
 * @returns true si l'opération complète a réussi, false sinon
 */
export const reload = async () => {
    await reset();
    await fixtures();
};
