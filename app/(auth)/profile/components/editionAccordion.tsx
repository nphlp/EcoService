"use client";

import { Accordion, AccordionButton, AccordionContent } from "@comps/ui/accordion";
import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import InputImage from "@comps/ui/inputImage";
import InputPassword from "@comps/ui/inputPassword";
import { BetterSessionServer } from "@lib/auth";
import { changeEmail, changePassword, updateUser, useSession } from "@lib/authClient";
import { encodeBase64 } from "@oslojs/encoding";
import { useState } from "react";

type EditionAccordionProps = {
    session: NonNullable<BetterSessionServer>;
}

export default function EditionAccordion(props: EditionAccordionProps) {
    const { session: init } = props;

    const [session, setSession] = useState(init);

    // Name update
    const [name, setName] = useState("");
    const [isLoadingName, setIsLoadingName] = useState(false);
    const handleNameUpdate = async () => {
        setIsLoadingName(true);
        try {
            await updateUser({ name });
            setSession({ ...session, user: { ...session.user, name } });
        } catch (error) {
            console.error("Erreur lors de la modification du nom:", error);
        } finally {
            setName("");
            setIsLoadingName(false);
        }
    };

    // Email update
    const [email, setEmail] = useState("");
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const handleEmailUpdate = async () => {
        setIsLoadingEmail(true);
        try {
            await changeEmail({ newEmail: email, callbackURL: "/profile" });
            setSession({ ...session, user: { ...session.user, email } });
        } catch (error) {
            console.error("Erreur lors de la modification de l'email:", error);
        } finally {
            setEmail("");
            setIsLoadingEmail(false);
        }
    };

    // Password update
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const handlePasswordUpdate = async () => {
        setIsLoadingPassword(true);
        try {
            // Change password and revalidate session
            await changePassword({ currentPassword, newPassword });
        } catch (error) {
            console.error("Erreur lors de la modification du mot de passe:", error);
        } finally {
            setCurrentPassword("");
            setNewPassword("");
            setIsLoadingPassword(false);
        }
    };

    // Image update
    const [image, setImage] = useState<File | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const handleImageUpdate = async () => {
        if (!image) return;
        setIsLoadingImage(true);
        try {
            // Encode image
            const arrayBuffer = await image.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const encodedImage = encodeBase64(uint8Array);
            // Update image and revalidate session
            await updateUser({ image: encodedImage });
            setSession({ ...session, user: { ...session.user, image: encodedImage } });
        } catch (error) {
            console.error("Erreur lors de l'encodage de l'image:", error);
        } finally {
            setImage(null);
            setIsLoadingImage(false);
        }
    };

    return (
        <Accordion>
            <AccordionButton>
                <div className="text-lg font-bold">Edition</div>
                <div className="text-xs text-gray-500">Modifier vos données personnelles.</div>
            </AccordionButton>
            <AccordionContent>
                <div className="space-y-4">
                    <div className="flex flex-col items-center gap-2">
                        <Input
                            label="Nom"
                            placeholder={session.user.name}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required={false}
                            classComponent="w-full"
                        />
                        <Button label="Modifier" isLoading={isLoadingName} onClick={handleNameUpdate} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Input
                            label="Email"
                            placeholder={session.user.email}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required={false}
                            classComponent="w-full"
                        />
                        <Button label="Modifier" isLoading={isLoadingEmail} onClick={handleEmailUpdate} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
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
                        <Button label="Modifier" isLoading={isLoadingPassword} onClick={handlePasswordUpdate} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <InputImage
                            label="Image"
                            onChange={setImage}
                            imagePreview={image}
                            required={false}
                            classComponent="w-full"
                        />
                        <Button label="Modifier" isLoading={isLoadingImage} onClick={handleImageUpdate} />
                    </div>
                </div>
            </AccordionContent>
        </Accordion>
    );
}
