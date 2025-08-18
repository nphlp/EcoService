"use client";

import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import Button from "@comps/ui/button";
import Input from "@comps/ui/input/input";
import InputImage from "@comps/ui/inputImage";
import InputPassword from "@comps/ui/inputPassword";
import { changeEmail, changePassword, updateUser, useSession } from "@lib/authClient";
import { BetterSessionServer } from "@lib/authServer";
import { UpdateLastnameProcess } from "@process/ProfileUpdate";
import { fileToBase64 } from "@utils/base64";
import { useState } from "react";

type EditionAccordionProps = {
    session: NonNullable<BetterSessionServer>;
    index?: number;
};

export default function EditionAccordion(props: EditionAccordionProps) {
    const { session: serverSession } = props;
    const { data: clientSession } = useSession();

    // SSR session
    const session = clientSession ?? serverSession;

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Edition</div>
                <div className="text-xs text-gray-500">Modifier vos données personnelles.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-4">
                    <UpdateLastnameForm session={session} />
                    <UpdateFirstnameForm session={session} />
                    <UpdateEmailForm session={session} />
                    <UpdatePasswordForm />
                    <UpdateImageForm />
                </div>
            </AccordionContent>
        </Accordion>
    );
}

type UpdateFormProps = {
    session: NonNullable<BetterSessionServer>;
};

const UpdateLastnameForm = (props: UpdateFormProps) => {
    const { session } = props;

    const [lastname, setLastname] = useState("");
    const [placeholder, setPlaceholder] = useState(session.user.lastname ?? "");
    const [isLoading, setIsLoading] = useState(false);

    const handleNameUpdate = async (e: React.FormEvent) => {
        // Prevent refresh and check if data exists
        e.preventDefault();
        if (!lastname) return;

        // Set loading state
        setIsLoading(true);

        // Update database
        const updateResponse = await UpdateLastnameProcess({ lastname });
        if (!updateResponse.status) console.error("Erreur lors de la modification du nom");
        setPlaceholder(lastname);

        // Reset form and stop loading
        setLastname("");
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleNameUpdate} className="flex flex-col items-center gap-2">
            <Input
                label="Nom"
                placeholder={placeholder}
                setValue={setLastname}
                value={lastname}
                required={false}
                classComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdateFirstnameForm = (props: UpdateFormProps) => {
    const { session } = props;

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNameUpdate = async (e: React.FormEvent) => {
        // Prevent refresh and check if data exists
        e.preventDefault();
        if (!name) return;

        // Set loading state
        setIsLoading(true);

        // Update database through Better Auth API
        try {
            await updateUser({ name });
        } catch {
            console.error("Erreur lors de la modification du prénom");
        }

        // Reset form and stop loading
        setName("");
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleNameUpdate} className="flex flex-col items-center gap-2">
            <Input
                label="Prénom"
                placeholder={session.user.name}
                setValue={setName}
                value={name}
                required={false}
                classComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdateEmailForm = (props: UpdateFormProps) => {
    const { session } = props;

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailUpdate = async (e: React.FormEvent) => {
        // Prevent refresh and check if data exists
        e.preventDefault();
        if (!email) return;

        // Set loading state
        setIsLoading(true);

        // Update database through Better Auth API
        try {
            await changeEmail({ newEmail: email, callbackURL: "/profile" });
        } catch {
            console.error("Erreur lors de la modification de l'email");
        }

        // Reset form and stop loading
        setEmail("");
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleEmailUpdate} className="flex flex-col items-center gap-2">
            <Input
                label="Email"
                placeholder={session.user.email}
                setValue={setEmail}
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
        // Prevent refresh and check if data exists
        e.preventDefault();
        if (!currentPassword || !newPassword) return;

        // Set loading state
        setIsLoading(true);

        // Update database through Better Auth API
        try {
            await changePassword({ currentPassword, newPassword });
        } catch {
            console.error("Erreur lors de la modification du mot de passe");
        }

        // Reset form and stop loading
        setCurrentPassword("");
        setNewPassword("");
        setIsLoading(false);
    };

    return (
        <form onSubmit={handlePasswordUpdate} className="flex flex-col items-center gap-2">
            <InputPassword
                label="Mot de passe actuel"
                placeholder="Mot de passe actuel"
                setValue={setCurrentPassword}
                value={currentPassword}
                required={false}
                classPasswordComponent="w-full"
            />
            <InputPassword
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
                setValue={setNewPassword}
                value={newPassword}
                required={false}
                classPasswordComponent="w-full"
            />
            <Button label="Modifier" isLoading={isLoading} type="submit" />
        </form>
    );
};

const UpdateImageForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpdate = async (e: React.FormEvent) => {
        // Prevent refresh and check if data exists
        e.preventDefault();
        if (!image) return;

        // Set loading state
        setIsLoading(true);

        // Update database through Better Auth API
        try {
            const encodedImage = await fileToBase64(image);
            if (!encodedImage) return;
            await updateUser({ image: encodedImage });
        } catch {
            console.error("Erreur lors de la modification de l'image");
        }

        // Reset form and stop loading
        setImage(null);
        setIsLoading(false);
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
