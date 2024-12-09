import { fixtures, reset } from "./script";

const reload = async () => {
    try {
        const resultReset = await reset();
        if (!resultReset) {
            throw new Error("Reset failed...");
        }

        const resultFixtures = await fixtures();
        if (!resultFixtures) {
            throw new Error("Fixtures failed...");
        }

        console.log("Fixtures reloaded with success");
    } catch (error) {
        console.error("An error occurred ->", error);
    }
};

// Execute script
reload()
