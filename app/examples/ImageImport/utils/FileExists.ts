"use server";

import fs from "fs";
import path from "path";

export const FileExists = async (filePath: string | null, folderName: string): Promise<boolean> => {
    const absolutePath = path.join(process.cwd(), folderName, String(filePath));
    return fs.existsSync(path.resolve(absolutePath));
};
