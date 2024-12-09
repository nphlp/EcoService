import { AccountType } from "@actions/types/Account";
import { FruitType } from "@actions/types/Fruit";
import { UserType } from "@actions/types/User";

interface UserData {
    name: UserType["name"];
    email: UserType["email"];
    emailVerified: UserType["emailVerified"];
    image: UserType["image"];
    role: UserType["role"];
    password: AccountType["password"];
}

export const userData: UserData[] = [
    {
        name: "Alice Dupont",
        email: "alice.dupont@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        name: "Gabriel Rousseau",
        email: "gabriel.rousseau@example.com",
        emailVerified: true,
        image: null,
        role: "MODO",
        password:
            "1e466a9ea4625667b0afa37f37fb606f:6a004e13b58523fa9258b26607895bb15c28845cf4a216691572cd4cf4e5e518c516f525786cc4a0abce76ac68745c32258e998e8ad721ea6c6aefe8e263f4ef",
    },
    {
        name: "Isabelle Petit",
        email: "isabelle.petit@example.com",
        emailVerified: true,
        image: null,
        role: "ADMIN",
        password:
            "572a76ee988aa5655d9365074f38bb4d:8d68bcf63ab0ab080794b4d2a4d66316c120913c81193d1a87be02f832aa0dc3cae646c87726953b78138ebac4a01014c13b2be6b85416e1341877d8f3c07844",
    },
];

interface FruitData {
    name: FruitType["name"];
}

export const fruitData: FruitData[] = [
    { name: "Apple" },
    { name: "Banana" },
    { name: "Cherry" },
    { name: "Mango" },
    { name: "Orange" },
    { name: "Pineapple" },
    { name: "Strawberry" },
];
