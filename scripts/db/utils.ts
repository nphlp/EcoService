import { spawn } from "child_process";
import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Pose une question à l'utilisateur via le terminal
 */
export const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

/**
 * Ferme l'interface readline
 */
export const closeReadline = (): void => {
    rl.close();
};

/**
 * Vérifie si une base de données existe
 */
export async function databaseExists(password: string, dbName: string): Promise<boolean | string> {
    return new Promise((resolve) => {
        const mysql = spawn(
            "mysql",
            ["-u", "root", `--password=${password}`, "-e", "SHOW DATABASES LIKE '" + dbName + "'"],
            {
                stdio: ["pipe", "pipe", "pipe"],
            },
        );

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

        mysql.on("close", (code) => {
            if (code !== 0) {
                // Si le code d'erreur n'est pas 0, il y a eu un problème (probablement mot de passe incorrect)
                if (errorOutput.includes("Access denied")) {
                    resolve("ACCESS_DENIED");
                } else {
                    resolve("ERROR");
                }
            } else {
                // Si la base de données existe, le résultat contiendra son nom
                resolve(output.includes(dbName));
            }
        });
    });
}
