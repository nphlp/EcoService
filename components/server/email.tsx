import { combo } from "@lib/combo";
import { Html, Container, Tailwind, Button, Body, Section } from "@react-email/components";

type EmailTemplateProps = {
    buttonUrl: string;
    changingEmail: boolean;
};

export default function EmailTemplate(props: EmailTemplateProps) {
    const { buttonUrl, changingEmail } = props;

    return (
        <Html>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto mt-[50px] w-min min-w-[320px] rounded-2xl border border-solid border-gray-300 p-5 shadow-md">
                        <Section className="mb-4 text-center text-2xl font-bold text-black">Hey, welcome!</Section>
                        <Section className="mb-5 text-center text-sm text-gray-500">
                            Please, verify your {changingEmail ? "new email" : "email"} by clicking the following
                            button.
                        </Section>
                        <Section className="mb-4">
                            <Button
                                className={combo(
                                    "mx-auto flex w-fit rounded-md bg-black px-4 py-2 text-center text-gray-100",
                                    changingEmail && "bg-red-600",
                                )}
                                href={buttonUrl}
                            >
                                Sure, let&apos;s verify my {changingEmail ? "new email" : "email"}!
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
