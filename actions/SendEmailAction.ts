"use server";

import NodemailerInstance from "@lib/nodemailer";
import { render } from "@react-email/render";
import { JSX } from "react";

const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME;
const SMTP_FROM = process.env.SMTP_FROM;

if (!SMTP_FROM_NAME || !SMTP_FROM) {
    throw new Error("SMTP_FROM_NAME or SMTP_FROM environment variables are not defined");
}

type SendEmailActionProps = {
    subject: string;
    email: string;
    body: JSX.Element;
};

export default async function SendEmailAction(props: SendEmailActionProps) {
    const { subject, email, body } = props;

    try {
        const html = await render(body, {
            pretty: true,
        });

        if (process.env.NODE_ENV === "development") {
            console.log("📨 Sending email...");
        }

        const success = await NodemailerInstance.sendMail({
            from: `"${SMTP_FROM_NAME}" <${SMTP_FROM}>`,
            to: email,
            subject: subject,
            html,
        });

        if (process.env.NODE_ENV === "development") {
            console.log(`✅ Email sent successfully to ${email}`);
        }

        return success;
    } catch (error) {
        console.error(`❌ Failed to send email to ${email}:`, error);
        throw new Error("Unable to send email -> " + (error as Error).message);
    }
}
