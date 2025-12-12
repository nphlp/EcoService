import { combo } from "@lib/combo";
import { Body, Button, Container, Html, Section, Tailwind } from "@react-email/components";

type EmailTemplateProps = {
    buttonUrl: string;
    emailType: "verification" | "change" | "reset";
};

export default function EmailTemplate(props: EmailTemplateProps) {
    const { buttonUrl, emailType } = props;

    const content = {
        verification: {
            title: "Hey, welcome!",
            description: "Please, verify your email by clicking the following button.",
            buttonText: "Sure, let's verify my email!",
            buttonColor: "bg-black",
        },
        change: {
            title: "Email Change Request",
            description: "Please, verify your new email by clicking the following button.",
            buttonText: "Verify my new email!",
            buttonColor: "bg-red-600",
        },
        reset: {
            title: "Password Reset Request",
            description: "Click the button below to reset your password. This link will expire in 1 hour.",
            buttonText: "Reset my password",
            buttonColor: "bg-blue-600",
        },
    };

    const currentContent = content[emailType];

    return (
        <Html>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto mt-[50px] w-min min-w-[320px] rounded-2xl border border-solid border-gray-300 p-5 shadow-md">
                        <Section className="mb-4 text-center text-2xl font-bold text-black">
                            {currentContent.title}
                        </Section>
                        <Section className="mb-5 text-center text-sm text-gray-500">
                            {currentContent.description}
                        </Section>
                        <Section className="mb-4">
                            <Button
                                className={combo(
                                    "mx-auto flex w-fit rounded-md px-4 py-2 text-center text-gray-100",
                                    currentContent.buttonColor,
                                )}
                                href={buttonUrl}
                            >
                                {currentContent.buttonText}
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
