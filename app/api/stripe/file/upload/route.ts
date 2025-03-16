import { StringToSlug } from "@actions/(examples)/StringToSlug";
import { GetSession } from "@lib/auth";
import { isVendorOrEmployeeOrAdmin } from "@lib/checkRole";
import { StripeInstance } from "@lib/stripe";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z, ZodType } from "zod";

export type StripeFileUploadProps = {
    file: File;
    fileNameToSlugify: string;
};

const stripeFileUploadPropsSchema: ZodType<StripeFileUploadProps> = z.object({
    file: z.instanceof(File),
    fileNameToSlugify: z.string(),
});

export type StripeFileUploadResponse =
    | {
          data: string;
      }
    | {
          error: string;
      };

export async function POST(request: NextRequest): Promise<NextResponse<StripeFileUploadResponse>> {
    try {
        // Check if user is authorized to create a product
        const session = await GetSession();
        const isAuthorized = await isVendorOrEmployeeOrAdmin();
        if (!session || !isAuthorized) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        const params: StripeFileUploadProps = JSON.parse(stringParams);

        const { file, fileNameToSlugify } = stripeFileUploadPropsSchema.parse(params);

        if (!file || !fileNameToSlugify) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Convert File to Buffer
        const fileBytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileBytes);

        // Slugify the image name
        const fileNameSlugified = await StringToSlug(fileNameToSlugify);

        // Upload file to Stripe
        const uploadedFile = await StripeInstance.files.create({
            purpose: "dispute_evidence",
            file: {
                data: fileBuffer,
                name: fileNameSlugified,
                type: "application/octet-stream",
            },
        });

        // Check if the file was uploaded successfully
        if (!uploadedFile.id) {
            throw new Error("Failed to upload file to Stripe");
        }

        // Create a file link for the uploaded file
        const fileLink = await StripeInstance.fileLinks.create({
            file: uploadedFile.id,
            expires_at: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
        });

        // Check if the file link was created successfully
        if (!fileLink.url) {
            throw new Error("Failed to create file link");
        }

        return NextResponse.json({ data: fileLink.url }, { status: 200 });
    } catch (error) {
        console.error("StripeFileUpload -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "StripeFileUpload -> Invalid Zod params -> " + error.message });
            return NextResponse.json({ error: "StripeFileUpload -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}
