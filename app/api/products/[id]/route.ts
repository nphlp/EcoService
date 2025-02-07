import { stripe } from "@lib/stripe";
import { NextResponse } from "next/server";
import { GetSession } from "@lib/auth";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
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
        const image = formData.get("image") as File;

        if (!name || !description || !amount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const productId = params.id;
        let imageUrl: string | undefined;

        if (image) {
            try {
                console.log("Uploading new image:", image.name, image.type);

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

        // Update product
        const updateData = {
            name,
            description,
        };

        if (imageUrl) {
            updateData.images = [imageUrl];
        }

        const product = await stripe.products.update(productId, updateData);

        // Update or create new price if amount changed
        const existingProduct = await stripe.products.retrieve(productId, {
            expand: ["default_price"],
        });

        const currentAmount = (existingProduct.default_price as any)
            ?.unit_amount;
        const newAmount = Math.round(parseFloat(amount) * 100);

        if (currentAmount !== newAmount) {
            // Create new price
            const price = await stripe.prices.create({
                product: productId,
                unit_amount: newAmount,
                currency: "eur",
            });

            // Update product with new default price
            await stripe.products.update(productId, {
                default_price: price.id,
            });
        }

        // Retrieve the complete updated product
        const completeProduct = await stripe.products.retrieve(productId, {
            expand: ["default_price"],
        });

        return NextResponse.json({ data: completeProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Error updating product" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await GetSession();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const productId = params.id;

        // Archive the product instead of deleting it
        await stripe.products.update(productId, {
            active: false,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Error deleting product" },
            { status: 500 }
        );
    }
}
