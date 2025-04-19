"use client";

import { UpdateUser } from "@actions/UserAction";
import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import InputPassword from "@comps/ui/inputPassword";
import { BetterSessionServer } from "@lib/auth";
import { changeEmail, changePassword, updateUser } from "@lib/authClient";
import { fileToBase64 } from "@utils/base64";
import { Dispatch, SetStateAction, useState } from "react";

type EditionAccordionProps = {
    session: NonNullable<BetterSessionServer>;
    index?: number;
};

export default function EditionAccordion(props: EditionAccordionProps) {
    const { session: init } = props;
    
    const [session, setSession] = useState(init);

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Edition</div>
                <div className="text-xs text-gray-500">Modifier vos données personnelles.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-4">
                    <UpdateLastnameForm session={session} setSession={setSession} />
                    <UpdateNameForm session={session} setSession={setSession} />
                    <UpdateEmailForm session={session} setSession={setSession} />
                    <UpdatePasswordForm />
                    <UpdateImageForm session={session} setSession={setSession} />
                </div>
            </AccordionContent>
        </Accordion>
    );
}

type UpdateFormProps = {
    session: NonNullable<BetterSessionServer>;
    setSession: Dispatch<SetStateAction<NonNullable<BetterSessionServer>>>;
};

const UpdateLastnameForm = (props: UpdateFormProps) => {
    const { session, setSession } = props;

    const [lastname, setLastname] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNameUpdate = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!lastname) return;
            setIsLoading(true);
            // Change name and revalidate session
            await UpdateUser({
                where: { id: session.user.id },
                data: {
                    lastname,
                },
            });
            setSession({ ...session, user: { ...session.user, lastname } });
        } catch (error) {
            console.error("Erreur lors de la modification du nom:", error);
        } finally {
            setLastname("");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleNameUpdate} className="flex flex-col items-center gap-2">
            <Input
                label="Nom"
                placeholder={session.user.lastname ?? ""}
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required={false}
                classComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdateNameForm = (props: UpdateFormProps) => {
    const { session, setSession } = props;

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNameUpdate = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!name) return;
            setIsLoading(true);
            // Change name and revalidate session
            await updateUser({ name });
            setSession({ ...session, user: { ...session.user, name } });
        } catch (error) {
            console.error("Erreur lors de la modification du nom:", error);
        } finally {
            setName("");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleNameUpdate} className="flex flex-col items-center gap-2">
            <Input
                label="Nom"
                placeholder={session.user.name}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required={false}
                classComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdateEmailForm = (props: UpdateFormProps) => {
    const { session, setSession } = props;

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailUpdate = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!email) return;
            setIsLoading(true);
            // Change email and revalidate session
            await changeEmail({ newEmail: email, callbackURL: "/profile" });
            setSession({ ...session, user: { ...session.user, email } });
        } catch (error) {
            console.error("Erreur lors de la modification de l'email:", error);
        } finally {
            setEmail("");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleEmailUpdate} className="flex flex-col items-center gap-2">
            <Input
                label="Email"
                placeholder={session.user.email}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required={false}
                classComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdatePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!currentPassword || !newPassword) return;
            setIsLoading(true);
            // Change password and revalidate session
            await changePassword({ currentPassword, newPassword });
        } catch (error) {
            console.error("Erreur lors de la modification du mot de passe:", error);
        } finally {
            setCurrentPassword("");
            setNewPassword("");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handlePasswordUpdate} className="flex flex-col items-center gap-2">
            <InputPassword
                label="Mot de passe actuel"
                placeholder="Mot de passe actuel"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                required={false}
                classPasswordComponent="w-full"
            />
            <InputPassword
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required={false}
                classPasswordComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdateImageForm = (props: UpdateFormProps) => {
    const { session, setSession } = props;

    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpdate = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!image) return;
            setIsLoading(true);
            // Encode and update image, then revalidate session
            const encodedImage = await fileToBase64(image);
            await updateUser({ image: encodedImage });
            setSession({ ...session, user: { ...session.user, image: encodedImage } });
        } catch (error) {
            console.error("Erreur lors de l'encodage de l'image:", error);
        } finally {
            setImage(null);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleImageUpdate} className="flex flex-col items-center gap-2">
            <InputImage
                label="Image"
                onChange={setImage}
                imagePreview={image}
                required={false}
                classComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};
