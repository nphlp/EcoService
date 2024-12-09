import { reset } from "./script";

// Execute script
reset().then(() => {
    console.log("Database reset with success");
});
