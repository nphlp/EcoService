import { AccountType } from "@actions/types/Account";
import { FruitType } from "@actions/types/Fruit";
import { UserType } from "@actions/types/User";

interface UserData {
    name: UserType["name"];
    email: UserType["email"];
    emailVerified: UserType["emailVerified"];
    role: UserType["role"];
    password: AccountType["password"];
}

export const userData: UserData[] = [
    {
        name: "User Lastname",
        email: "user@example.com",
        emailVerified: true,
        role: "USER",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Vendor Lastname",
        email: "vendor@example.com",
        emailVerified: true,
        role: "VENDOR",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Employee Lastname",
        email: "employee@example.com",
        emailVerified: true,
        role: "EMPLOYEE",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Admin Lastname",
        email: "admin@example.com",
        emailVerified: true,
        role: "ADMIN",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
];

interface FruitData {
    name: FruitType["name"];
    description: FruitType["description"];
    image: FruitType["image"];
}

export const fruitData: FruitData[] = [
    {
        name: "Apple",
        description:
            "A spherical fruit with a red or green skin and a whitish flesh.",
        image: "/fruit/apple.webp",
    },
    {
        name: "Banana",
        description:
            "A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.",
        image: "/fruit/banana.webp",
    },
    {
        name: "Cherry",
        description:
            "A small, round stone fruit that is typically bright or dark red.",
        image: "/fruit/cherry.webp",
    },
    {
        name: "Mango",
        description:
            "A large oval tropical fruit with smooth yellowish-red skin, hard central stone, and soft, juicy orange-yellow flesh.",
        image: "/fruit/mango.webp",
    },
    {
        name: "Orange",
        description:
            "A round juicy citrus fruit with a tough bright reddish-yellow rind.",
        image: "/fruit/orange.webp",
    },
    {
        name: "Pineapple",
        description:
            "A tropical fruit with a tough segmented skin and sweet, juicy, yellow flesh.",
        image: "/fruit/pineapple.webp",
    },
    {
        name: "Strawberry",
        description: "A sweet soft red fruit with a seed-studded surface.",
        image: "/fruit/strawberry.webp",
    },
];
