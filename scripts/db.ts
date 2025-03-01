import { spawn } from "child_process";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { join } from "path";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

async function executeSqlFile(password: string, filename: string) {
    const sqlPath = join(process.cwd(), "prisma", "sql", filename);
    const sqlContent = readFileSync(sqlPath, "utf-8");

    const mysql = spawn("mysql", ["-u", "root", `--password=${password}`, "-e", sqlContent], {
        stdio: ["pipe", "pipe", "pipe"],
    });

    mysql.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    mysql.stderr.on("data", (data) => {
        if (!data.toString().includes("Using a password on the command line interface can be insecure")) {
            console.error(data.toString());
        }
    });

    return new Promise((resolve, reject) => {
        mysql.on("close", (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`MySQL process exited with code ${code}`));
            }
        });
    });
}

async function main() {
    try {
        const sqlFile = process.argv[2];
        if (!sqlFile) {
            console.error("Please specify a SQL file (setup.sql or reset.sql)");
            process.exit(1);
        }

        const password = await question("✔ Enter MySQL root password: ");

        await executeSqlFile(password, sqlFile);
        console.log(`✔ SQL commands from ${sqlFile} executed successfully!`);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main();
