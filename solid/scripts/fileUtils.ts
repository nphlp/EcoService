import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

/**
 * Utilitaires de gestion des fichiers pour le générateur
 *
 * Ce module fournit des fonctions pour:
 * - Créer des répertoires si nécessaire
 * - Générer des fichiers à partir de templates Handlebars
 * - Supprimer des fichiers ou répertoires
 */

/**
 * Crée un répertoire s'il n'existe pas déjà
 *
 * @param dir Chemin du répertoire à créer
 */
export const ensureDir = (dir: string): void => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

/**
 * Génère un fichier à partir d'un template Handlebars
 *
 * Lit un template, applique les substitutions de variables,
 * crée les répertoires nécessaires et écrit le fichier généré.
 *
 * @param templatePath Chemin du fichier template (.hbs)
 * @param outputPath Chemin où le fichier généré sera écrit
 * @param replacements Dictionnaire des variables à remplacer dans le template
 * @throws Error si le template n'existe pas
 */
export const generateFile = (templatePath: string, outputPath: string, replacements: Record<string, unknown>): void => {
    // Vérifier si le template existe
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template ${templatePath} not found`);
    }

    // Lire le template
    const templateContent = fs.readFileSync(templatePath, "utf-8");

    // Compiler le template avec Handlebars
    const template = Handlebars.compile(templateContent);

    // Appliquer les remplacements avec Handlebars
    const content = template(replacements);

    // Créer le dossier si nécessaire
    ensureDir(path.dirname(outputPath));

    // Écrire le fichier généré
    fs.writeFileSync(outputPath, content);
};

/**
 * Supprime un fichier ou un répertoire complet
 *
 * Détecte automatiquement si le chemin est un fichier ou un répertoire
 * et utilise la méthode de suppression appropriée.
 *
 * @param pathToRemove Chemin du fichier ou répertoire à supprimer
 */
export const removePath = (pathToRemove: string): void => {
    if (!fs.existsSync(pathToRemove)) return;

    if (fs.lstatSync(pathToRemove).isDirectory()) {
        fs.rmSync(pathToRemove, { recursive: true, force: true });
    } else {
        fs.unlinkSync(pathToRemove);
    }
};
