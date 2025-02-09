import { stripe } from "@lib/stripe";
import { NextResponse } from "next/server";
import { GetSession } from "@lib/auth";

export async function GET() {
    try {
        const session = await GetSession();
        if (!session?.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const products = await stripe.products.list({
            expand: ["data.default_price"],
            active: true,
        });

        return NextResponse.json({ data: products.data });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Error fetching products" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await GetSession();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const amount = formData.get("amount") as string;
        const currency = formData.get("currency") as string;
        const image = formData.get("image") as File;

        if (!name || !description || !amount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
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
                    expires_at:
                        Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
                });

                console.log("File link created:", fileLink.url);
                imageUrl = fileLink.url || undefined;
            } catch (uploadError) {
                console.error("Error uploading image to Stripe:", uploadError);
                throw new Error("Failed to upload image to Stripe");
            }
        }

        console.log("Creating product with image URL:", imageUrl);

        // Create product with image
        const product = await stripe.products.create({
            name,
            description,
            images: imageUrl ? [imageUrl] : undefined,
            shippable: false,
            type: "service",
        });

        console.log("Product created:", product.id);

        // Create price for the product
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
            currency: currency.toLowerCase(),
        });

        console.log("Price created:", price.id);

        // Update product with default price
        await stripe.products.update(product.id, {
            default_price: price.id,
        });

        // Retrieve the complete product with the price
        const completeProduct = await stripe.products.retrieve(product.id, {
            expand: ["default_price"],
        });

        console.log(
            "Complete product:",
            completeProduct.id,
            completeProduct.images
        );

        return NextResponse.json({
            data: completeProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Error creating product" },
            { status: 500 }
        );
    }
}
