import dotenv from "dotenv";

// Charger les variables d'environnement du fichier .env
dotenv.config({ quiet: true });

type CommandCategory = {
    color: string;
    description: string;
    commands: Record<string, string>;
};

const categories: Record<string, CommandCategory> = {
    help: {
        color: "\x1b[37m", // white
        description: "Help commands",
        commands: {
            help: "Display this help message",
        },
    },
    dev: {
        color: "\x1b[32m", // green
        description: "Development commands",
        commands: {
            auto: "Auto install database, prisma, fixtures and run dev server",
            dev: "Start development server",
            lint: "Check code with ESLint",
            type: "Check TypeScript types",
            format: "Format code with Prettier",
        },
    },
    db: {
        color: "\x1b[33m", // yellow
        description: "Database commands",
        commands: {
            "db:setup": "Setup database",
            "db:reset": "Reset database",
            "db:reload": "Reload database",
        },
    },
    prisma: {
        color: "\x1b[35m", // magenta
        description: "Prisma commands",
        commands: {
            "prisma:generate": "Generate Prisma client",
            "prisma:migrate": "Create or apply Prisma migrations",
            "prisma:deploy": "Apply Prisma migrations in production",
            "prisma:reset": "Reset Prisma migrations",
        },
    },
    fixtures: {
        color: "\x1b[34m", // blue
        description: "Fixtures commands",
        commands: {
            "fixtures:setup": "Setup test data",
            "fixtures:reset": "Reset test data",
            "fixtures:reload": "Reload test data",
        },
    },
    generator: {
        color: "\x1b[36m", // cyan
        description: "Generator commands",
        commands: {
            "gen:all": "Generate all models",
            "gen:list": "List all models",
            "gen:model": "Generate a model",
        },
    },
    deployment: {
        color: "\x1b[37m", // white
        description: "Deployment commands",
        commands: {
            build: "Build the project for production",
            start: "Start production server",
        },
    },
};

const reset = "\x1b[0m";
const bold = "\x1b[1m";
const dim = "\x1b[2m";
const cyan = "\x1b[36m";
const yellow = "\x1b[33m";

export function tip() {
    console.log(`💡 Tip: Use ${bold}${cyan}pnpm run help${reset} to see all available commands\n`);

    const middlewarePermissions = process.env.MIDDLEWARE_PERMISSIONS ?? "enabled";

    if (middlewarePermissions === "disabled") {
        console.log(
            "⚠️  " + bold + yellow + "Middleware skipping" + reset + " is enabled for faster refresh in dev mode",
        );
        console.log("   Remove MIDDLEWARE_PERMISSIONS=disabled from .env to enable it\n");
    }
}

export function help() {
    console.log("\n" + bold + "📦 Available Commands" + reset);
    console.log(dim + "Usage: pnpm <command>" + reset);

    // Display commands by category
    Object.values(categories).forEach((category) => {
        console.log(bold + category.color + `\n${category.description}:` + reset);

        Object.entries(category.commands).forEach(([cmd, desc]) => {
            console.log(`  ${category.color}${cmd}${reset}: ${desc}`);
        });
    });

    console.log("\n");
    return true;
}

// Gestionnaire de commandes
const command = process.argv[2];

switch (command) {
    case "help":
        const success = help();
        process.exit(success ? 0 : 1);
        break;
    case "tip":
        tip();
        process.exit(0);
        break;
    default:
        console.error("Commande invalide. Utilisez 'help' ou 'tip'");
        process.exit(1);
}
