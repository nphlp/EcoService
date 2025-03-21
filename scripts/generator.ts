import { generateAllModels, generateSpecificModel, listModels } from "./generator/commands";
import { extractModelNames, getLowerName } from "./generator/modelExtractor";

function main(): void {
    const args = process.argv.slice(2);
    const command = args[0];
    const modelName = args[1];

    if (command === "list") {
        listModels();
    } else if (command === "model" && modelName) {
        generateSpecificModel(modelName);
    } else if (command === "test") {
        const modelNames = extractModelNames();
        const modelNamesLower = modelNames.map((m) => getLowerName(m));
        
        console.log(modelNamesLower);
    } else {
        generateAllModels();
    }
}

main();