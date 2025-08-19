"use server";

import EmailTemplate from "@comps/UI/email";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";

const PLUNK_API_KEY = process.env.PLUNK_API_KEY;

if (!PLUNK_API_KEY) {
    throw new Error("PLUNK_API_KEY environment variable is not defined");
}

const plunk = new Plunk(PLUNK_API_KEY);

type SendEmailProps = {
    subject: string;
    email: string;
    buttonUrl: string;
    changingEmail?: boolean;
};

export const SendEmail = async (props: SendEmailProps) => {
    try {
        const { subject, email, buttonUrl, changingEmail = false } = props;

        const body = await render(EmailTemplate({ buttonUrl, changingEmail }), {
            pretty: true,
        });

        const success = await plunk.emails.send({
            to: email,
            subject: subject,
            body,
        });

        return success;
    } catch (error) {
        throw new Error("Unable to send email -> " + (error as Error).message);
    }
};
