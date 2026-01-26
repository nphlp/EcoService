"use client";

import Button from "@comps/UI/button/button";
import Card from "@comps/UI/card";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import Input from "@comps/UI/input/input";
import InputImage from "@comps/UI/inputImage";
import { combo } from "@lib/combo";
import { authorizedFileSize, authorizedFormats } from "@utils/image-validation";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UpdateContentProcess } from "@/process/UpdateContentProcess";

type ContentBlock = {
    id: string;
    content: string;
    image: string;
    newImage: File | null;
    isNew: boolean;
};

type ContentEditFormProps = {
    type: "article" | "diy";
    content: {
        id: string;
        title: string;
        Content: { id: string; content: string; image: string }[];
    };
};

export default function ContentEditForm(props: ContentEditFormProps) {
    const { type, content } = props;
    const router = useRouter();

    const isArticle = type === "article";
    const labels = {
        title: isArticle ? "Titre de l'article" : "Titre du DIY",
        blocksTitle: isArticle ? "Blocs de contenu" : "Étapes du tutoriel",
        blockLabel: isArticle ? "Bloc" : "Étape",
        contentLabel: isArticle ? "Contenu" : "Instructions",
        contentPlaceholder: isArticle ? "Écrivez votre contenu ici..." : "Décrivez cette étape du tutoriel...",
        addButton: isArticle ? "Ajouter un bloc" : "Ajouter une étape",
        submitButton: isArticle ? "Mettre à jour l'article" : "Mettre à jour le DIY",
    };

    const [title, setTitle] = useState<string>(content.title);
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(
        content.Content.map((c) => ({
            id: c.id,
            content: c.content,
            image: c.image,
            newImage: null,
            isNew: false,
        })),
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [message, setMessage] = useState<string>("");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const handleAddBlock = () => {
        setContentBlocks([
            ...contentBlocks,
            { id: crypto.randomUUID(), content: "", image: "", newImage: null, isNew: true },
        ]);
    };

    const handleRemoveBlock = (id: string) => {
        if (contentBlocks.length === 1) return;
        setContentBlocks(contentBlocks.filter((block) => block.id !== id));
    };

    const handleContentChange = (id: string, text: string) => {
        setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, content: text } : block)));
    };

    const handleImageChange = (id: string, file: File | null) => {
        if (!file) {
            // Effacer à la fois l'image existante et la nouvelle image
            setContentBlocks(
                contentBlocks.map((block) => (block.id === id ? { ...block, image: "", newImage: null } : block)),
            );
            return;
        }

        if (!authorizedFormats.includes(file.type.replace("image/", ""))) {
            setMode("warning");
            setMessage("Format de l'image non autorisé");
            setIsFeedbackOpen(true);
            return;
        }

        if (file.size > authorizedFileSize) {
            setMode("warning");
            setMessage("La taille de l'image est trop grande");
            setIsFeedbackOpen(true);
            return;
        }

        setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, newImage: file } : block)));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (!title) {
                setMode("warning");
                setMessage("Veuillez renseigner un titre");
                setIsFeedbackOpen(true);
                return;
            }

            const validBlocks = contentBlocks.filter(
                (block) => block.content.trim() && (block.image || block.newImage),
            );
            if (validBlocks.length === 0) {
                setMode("warning");
                setMessage("Veuillez ajouter au moins un bloc de contenu avec texte et image");
                setIsFeedbackOpen(true);
                return;
            }

            const { status, message } = await UpdateContentProcess({
                type,
                id: content.id,
                title,
                contentBlocks: validBlocks.map((block) => ({
                    id: block.isNew ? undefined : block.id,
                    content: block.content,
                    existingImage: block.image,
                    newImage: block.newImage,
                })),
            });

            if (status) {
                setMode("success");
                setMessage(message);
                setIsFeedbackOpen(true);
                router.refresh();
            } else {
                setMode("error");
                setMessage(message);
                setIsFeedbackOpen(true);
            }
        } catch {
            setMode("error");
            setMessage("Une erreur est survenue...");
            setIsFeedbackOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-200 rounded-3xl p-8">
            <form className="space-y-8">
                <Input label={labels.title} type="text" setValue={setTitle} value={title} autoFocus />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">{labels.blocksTitle}</h3>

                    {contentBlocks.map((block, index) => (
                        <div
                            key={block.id}
                            className={combo(
                                "relative rounded-2xl border-2 p-5",
                                isArticle ? "border-blue-100 bg-blue-50/30" : "border-amber-100 bg-amber-50/30",
                            )}
                        >
                            {/* Block number badge */}
                            <div
                                className={combo(
                                    "absolute -top-3 -left-3 flex size-8 items-center justify-center rounded-full text-sm font-bold text-white",
                                    isArticle ? "bg-blue-500" : "bg-amber-500",
                                )}
                            >
                                {index + 1}
                            </div>

                            {/* Delete button */}
                            {contentBlocks.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBlock(block.id)}
                                    className="absolute -top-2 -right-2 rounded-full bg-white p-1.5 text-gray-400 shadow-md transition-colors hover:bg-red-50 hover:text-red-500"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            )}

                            <div className="mt-2 space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        {labels.contentLabel}
                                    </label>
                                    <textarea
                                        className={combo(
                                            "field-sizing-content min-h-32 w-full rounded-xl border-2 px-4 py-3 text-sm transition-colors focus:outline-none",
                                            isArticle
                                                ? "border-blue-100 bg-white focus:border-blue-300"
                                                : "border-amber-100 bg-white focus:border-amber-300",
                                        )}
                                        value={block.content}
                                        onChange={(e) => handleContentChange(block.id, e.target.value)}
                                        placeholder={labels.contentPlaceholder}
                                    />
                                </div>

                                <InputImage
                                    label="Image"
                                    onChange={(file) => handleImageChange(block.id, file)}
                                    imagePreview={block.newImage}
                                    existingImageUrl={!block.newImage ? block.image : undefined}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddBlock}
                        className={combo(
                            "flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 font-medium transition-colors",
                            isArticle
                                ? "border-blue-200 text-blue-500 hover:border-blue-300 hover:bg-blue-50"
                                : "border-amber-200 text-amber-500 hover:border-amber-300 hover:bg-amber-50",
                        )}
                    >
                        <Plus className="size-5" />
                        {labels.addButton}
                    </button>
                </div>

                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />

                <div className="flex justify-center pt-4">
                    <Button type="button" label={labels.submitButton} isLoading={isLoading} onClick={handleSubmit}>
                        {labels.submitButton}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
