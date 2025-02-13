import { stripe } from "@lib/stripe";
import { NextResponse } from "next/server";
import { GetSession } from "@lib/auth";
import prisma from "@lib/prisma"; // Import Prisma pour gérer la BDD

export async function GET() {
    try {
        const session = await GetSession();
        if (!session?.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const products = await stripe.products.list({
            expand: ["data.default_price"],
            active: true,
        });

        return NextResponse.json({ data: products.data });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: (error as Error).message || "Error fetching products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await GetSession();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const amount = formData.get("amount") as string;
        const currency = formData.get("currency") as string;
        const image = formData.get("image") as File;
        const categoryId = formData.get("categoryId") as string; // ✅ Récupérer la catégorie

        if (!name || !description || !amount || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Vérifier si la catégorie existe en BDD
        const categoryExists = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!categoryExists) {
            return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
        }

        let imageUrl: string | undefined;

        if (image) {
            try {
                console.log("Uploading image:", image.name, image.type);

                // Convert File to Buffer
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Upload file to Stripe
                const fileUpload = await stripe.files.create({
                    purpose: "product_image",
                    file: {
                        data: buffer,
                        name: image.name,
                        type: "application/octet-stream",
                    },
                });

                console.log("File uploaded to Stripe:", fileUpload.id);

                // Create a file link for the uploaded file
                const fileLink = await stripe.fileLinks.create({
                    file: fileUpload.id,
                    expires_at: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
                });

                console.log("File link created:", fileLink.url);
                imageUrl = fileLink.url || undefined;
            } catch (uploadError) {
                console.error("Error uploading image to Stripe:", uploadError);
                throw new Error("Failed to upload image to Stripe");
            }
        }

        console.log("Creating product with image URL:", imageUrl);

        // ✅ Créer le produit en BDD avec la catégorie
        const product = await prisma.product.create({
            data: {
                name,
                description,
                image: imageUrl || "",
                price: parseFloat(amount),
                stock: 10,
                categoryId, // 🔥 Lien avec la catégorie
                vendorId: session.user.id,
            },
        });

        console.log("Product created:", product.id);

        // ✅ Créer un produit dans Stripe
        const stripeProduct = await stripe.products.create({
            name,
            description,
            images: imageUrl ? [imageUrl] : undefined,
            shippable: false,
            type: "service",
        });

        console.log("Stripe Product created:", stripeProduct.id);

        // ✅ Créer un prix Stripe pour le produit
        const price = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
            currency: currency.toLowerCase(),
        });

        console.log("Price created:", price.id);

        // ✅ Associer le prix Stripe au produit
        await stripe.products.update(stripeProduct.id, {
            default_price: price.id,
        });

        return NextResponse.json({ data: product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: (error as Error).message || "Error creating product" }, { status: 500 });
    }
}
