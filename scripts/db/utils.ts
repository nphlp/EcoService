import { spawn } from "child_process";
import dotenv from "dotenv";
import { once } from "events";
import { readFileSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";

// Chargement automatique des variables d'environnement (.env)
dotenv.config({ quiet: true });

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Interface pour poser une question interactive à l'utilisateur
 * Retourne la réponse saisie au clavier
 */
export const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

/**
 * Libère les ressources de l'interface readline
 * À appeler en fin de script pour éviter que le processus reste ouvert
 */
export const closeReadline = (): void => {
    rl.close();
};

/**
 * Récupère le mot de passe MySQL root
 * Priorité : variable d'environnement MYSQL_ROOT_PASSWORD, sinon saisie interactive
 */
export async function getMySqlPassword(): Promise<string> {
    // Tenter de récupérer depuis les variables d'environnement
    const envPassword = process.env.MYSQL_ROOT_PASSWORD;

    if (envPassword) {
        return envPassword;
    }

    // Fallback : demander à l'utilisateur via saisie sécurisée
    return question("🔑 Mot de passe MySQL : ");
}

/**
 * Vérifie l'existence d'une base de données MySQL
 * @param password Mot de passe MySQL root
 * @param dbName Nom de la base de données à vérifier
 * @param isSSL Active les certificats SSL pour Docker
 * @returns true si existe, false sinon, string si erreur d'accès
 */
export async function databaseExists(
    password: string,
    dbName: string,
    isSSL: boolean = false,
): Promise<boolean | string> {
    const host = process.env.MYSQL_HOST;
    if (!host) throw new Error("MYSQL_HOST environment variable is not defined");

    // Configuration de base de la connexion MySQL
    const args = ["-u", "root", `-p${password}`, "-h", host];

    // Ajout des certificats SSL pour l'environnement Docker
    if (isSSL) {
        args.push(
            "--ssl-ca=./docker/certs/ca.pem",
            "--ssl-cert=./docker/certs/client-cert.pem",
            "--ssl-key=./docker/certs/client-key.pem",
        );
    }

    // Exécution de la requête SHOW DATABASES
    args.push("-e", "SHOW DATABASES LIKE '" + dbName + "'");

    const mysql = spawn("mysql", args, {
        stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    let errorOutput = "";

    mysql.stdout.on("data", (data) => {
        output += data.toString();
    });

    mysql.stderr.on("data", (data) => {
        const errorMsg = data.toString();
        if (!errorMsg.includes("Using a password on the command line interface can be insecure")) {
            errorOutput += errorMsg;
        }
    });

    const [code] = await once(mysql, "close");

    if (code !== 0) {
        if (errorOutput.includes("Access denied")) {
            return "ACCESS_DENIED";
        } else {
            return `ERROR: ${errorOutput.trim()}`;
        }
    } else {
        // Vérifie si la base de données existe dans la sortie
        return output.includes(dbName);
    }
}

/**
 * Exécute un fichier SQL complet via le client MySQL
 * @param filename Nom du fichier ou chemin relatif à prisma/sql/
 * @param password Mot de passe MySQL root
 * @param isSSL Active les certificats SSL (environnement Docker)
 * @returns true si succès, false si échec
 */
export async function executeSqlFile(filename: string, password: string, isSSL: boolean = false): Promise<boolean> {
    const filePath = join(process.cwd(), "prisma", "sql", filename);

    try {
        const host = process.env.MYSQL_HOST;
        if (!host) throw new Error("MYSQL_HOST environment variable is not defined");

        const fileContent = readFileSync(filePath, "utf-8");

        // Configuration de base de la connexion MySQL
        const args = ["-u", "root", `-p${password}`, "-h", host];

        // Ajout des certificats SSL pour l'environnement Docker
        if (isSSL) {
            args.push(
                "--ssl-ca=./docker/certs/ca.pem",
                "--ssl-cert=./docker/certs/client-cert.pem",
                "--ssl-key=./docker/certs/client-key.pem",
            );
        }

        args.push("-e", fileContent);

        const mysql = spawn("mysql", args, {
            stdio: ["pipe", "pipe", "pipe"],
        });

        let errorOutput = "";

        mysql.stdout.on("data", (data) => {
            console.log(data.toString());
        });

        mysql.stderr.on("data", (data) => {
            const errorMsg = data.toString();
            if (!errorMsg.includes("Using a password on the command line interface can be insecure")) {
                errorOutput += errorMsg;
            }
        });

        const [code] = await once(mysql, "close");

        if (code === 0) {
            return true;
        } else {
            console.log("❌ Erreur SQL : " + errorOutput.trim());
            return false;
        }
    } catch (error) {
        console.log(`❌ Erreur lors de la lecture du fichier ${filePath} : ${error}`);
        return false;
    }
}
