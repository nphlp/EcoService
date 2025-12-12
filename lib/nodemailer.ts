import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP environment variables are not defined");
}

const nodemailerTransporterSingleton = () => {
    const port = Number(SMTP_PORT);

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: port,
        secure: port === 465,
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
    });
};

declare const globalThis: {
    nodemailerGlobal: ReturnType<typeof nodemailerTransporterSingleton>;
} & typeof global;

/**
 * A singleton instance of the Nodemailer transporter to prevent
 * multiple instances from being created and reuse SMTP connections.
 */
const NodemailerInstance = globalThis.nodemailerGlobal ?? nodemailerTransporterSingleton();

if (process.env.NODE_ENV !== "production") globalThis.nodemailerGlobal = NodemailerInstance;

export default NodemailerInstance;
