/**
 * Configuration des templates et chemins pour la génération de fichiers
 *
 * Ce module définit:
 * - L'interface FileTemplate qui associe un template source à un chemin destination
 * - Les templates pour chaque type de fichier à générer par modèle
 * - Les templates pour les fichiers index qui agrègent tous les modèles
 */

/**
 * Définit la structure d'un template de fichier
 * @property input - Chemin du fichier template Handlebars (.hbs)
 * @property output - Chemin de destination où le fichier sera généré
 */
export interface FileTemplate {
    input: string; // Chemin source du template
    output: string; // Chemin de destination pour le fichier généré
}

/**
 * Liste des chemins qui doivent être supprimés lors du nettoyage
 * avant une nouvelle génération
 */
export const pathsToRemove: string[] = [
    "services/actions",
    "services/api",
    "services/cached",
    "services/class",
    "services/server",
    "services/types",
    "app/api/internal",
];

/**
 * Templates pour la génération de fichiers spécifiques à chaque modèle
 *
 * Variables disponibles dans les templates:
 * - {{modelName}}: Nom du modèle (ex: User)
 * - {{modelNameLower}}: Nom du modèle en minuscule (ex: user)
 * - {{model}}: Placeholder remplacé par le nom du modèle dans les chemins de template
 */
export const templates: FileTemplate[] = [
    // Actions
    {
        input: `templates/services/actions/{{model}}Action.hbs`,
        output: `services/actions/{{modelName}}Action.ts`,
    },
    // API
    {
        input: `templates/services/api/{{model}}Api.hbs`,
        output: `services/api/{{modelName}}Api.ts`,
    },
    // Cached
    {
        input: `templates/services/cached/{{model}}Cached.hbs`,
        output: `services/cached/{{modelName}}Cached.ts`,
    },
    // Classes
    {
        input: `templates/services/class/{{model}}Class.hbs`,
        output: `services/class/{{modelName}}Class.ts`,
    },
    // Server
    {
        input: `templates/services/server/{{model}}Server.hbs`,
        output: `services/server/{{modelName}}Server.ts`,
    },
    // Types
    {
        input: `templates/services/types/{{model}}Type.hbs`,
        output: `services/types/{{modelName}}Type.ts`,
    },
];

/**
 * Templates pour les fichiers d'index et de routes
 *
 * Ces fichiers sont générés une seule fois et contiennent des références
 * à tous les modèles du système. Ils servent à:
 * - Exporter tous les modules depuis un point central
 * - Configurer les routes API pour tous les endpoints
 */
export const indexTemplates: FileTemplate[] = [
    // Fichiers index pour les services
    {
        input: "templates/services/actions/index.hbs",
        output: "services/actions/index.ts",
    },
    {
        input: "templates/services/api/index.hbs",
        output: "services/api/index.ts",
    },
    {
        input: "templates/services/cached/index.hbs",
        output: "services/cached/index.ts",
    },
    {
        input: "templates/services/class/index.hbs",
        output: "services/class/index.ts",
    },
    {
        input: "templates/services/server/index.hbs",
        output: "services/server/index.ts",
    },
    {
        input: "templates/services/types/index.hbs",
        output: "services/types/index.ts",
    },
    // Routes
    {
        input: "templates/app/api/internal/Routes.hbs",
        output: "app/api/internal/Routes.ts",
    },
    // Handler Next.js pour les routes API
    {
        input: "templates/app/api/internal/[...routes]/route.hbs",
        output: "app/api/internal/[...routes]/route.ts",
    },
];
