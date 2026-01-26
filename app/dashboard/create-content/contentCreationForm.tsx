"use client";

import Button from "@comps/UI/button/button";
import Card from "@comps/UI/card";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import Input from "@comps/UI/input/input";
import InputImage from "@comps/UI/inputImage";
import { combo } from "@lib/combo";
import { authorizedFileSize, authorizedFormats } from "@utils/image-validation";
import { FileText, Hammer, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateContentProcess } from "@/process/CreateContentProcess";

type ContentBlock = {
    id: string;
    content: string;
    image: File | null;
};

type ContentType = "article" | "diy" | "";

export default function ContentCreationForm() {
    const [contentType, setContentType] = useState<ContentType>("");
    const [title, setTitle] = useState<string>("");
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
        { id: crypto.randomUUID(), content: "", image: null },
    ]);

    // Feedback
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [message, setMessage] = useState<string>("");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const isArticle = contentType === "article";
    const isDiy = contentType === "diy";
    const labels = {
        title: isArticle ? "Titre de l'article" : isDiy ? "Titre du DIY" : "Titre",
        blocksTitle: isArticle ? "Blocs de contenu" : "Étapes du tutoriel",
        blockLabel: isArticle ? "Bloc" : "Étape",
        contentLabel: isArticle ? "Contenu" : "Instructions",
        contentPlaceholder: isArticle ? "Écrivez votre contenu ici..." : "Décrivez cette étape du tutoriel...",
        addButton: isArticle ? "Ajouter un bloc" : "Ajouter une étape",
        submitButton: isArticle ? "Créer l'article" : "Créer le DIY",
    };

    const handleAddBlock = () => {
        setContentBlocks([...contentBlocks, { id: crypto.randomUUID(), content: "", image: null }]);
    };

    const handleRemoveBlock = (id: string) => {
        if (contentBlocks.length === 1) return;
        setContentBlocks(contentBlocks.filter((block) => block.id !== id));
    };

    const handleContentChange = (id: string, content: string) => {
        setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, content } : block)));
    };

    const handleImageChange = (id: string, file: File | null) => {
        if (!file) {
            setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, image: null } : block)));
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

        setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, image: file } : block)));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (!contentType) {
                setMode("warning");
                setMessage("Veuillez sélectionner un type de contenu");
                setIsFeedbackOpen(true);
                return;
            }

            if (!title) {
                setMode("warning");
                setMessage("Veuillez renseigner un titre");
                setIsFeedbackOpen(true);
                return;
            }

            const validBlocks = contentBlocks.filter((block) => block.content.trim() && block.image);
            if (validBlocks.length === 0) {
                setMode("warning");
                setMessage("Veuillez ajouter au moins un bloc de contenu avec texte et image");
                setIsFeedbackOpen(true);
                return;
            }

            const { status, message } = await CreateContentProcess({
                type: contentType as "article" | "diy",
                title,
                contentBlocks: validBlocks.map((block) => ({
                    content: block.content,
                    image: block.image as File,
                })),
            });

            if (status) {
                setMode("success");
                setMessage(message);
                setIsFeedbackOpen(true);

                // Reset form
                setContentType("");
                setTitle("");
                setContentBlocks([{ id: crypto.randomUUID(), content: "", image: null }]);
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
                {/* Type selection */}
                <div>
                    <label className="text-sm font-semibold text-gray-700">Type de contenu</label>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                        <button
                            type="button"
                            onClick={() => setContentType("article")}
                            className={combo(
                                "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all",
                                isArticle
                                    ? "border-blue-200 bg-blue-50 text-blue-500"
                                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
                            )}
                        >
                            <FileText className={combo("size-8", isArticle ? "text-blue-500" : "text-gray-400")} />
                            <span className="font-medium">Article</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setContentType("diy")}
                            className={combo(
                                "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all",
                                isDiy
                                    ? "border-amber-200/70 bg-amber-50 text-amber-500"
                                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
                            )}
                        >
                            <Hammer className={combo("size-8", isDiy ? "text-amber-500" : "text-gray-400")} />
                            <span className="font-medium">DIY</span>
                        </button>
                    </div>
                </div>

                {/* Title */}
                {contentType && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <Input label={labels.title} type="text" setValue={setTitle} value={title} autoFocus />
                    </div>
                )}

                {/* Content blocks */}
                {contentType && (
                    <div className="animate-in fade-in slide-in-from-top-2 space-y-4 duration-300">
                        <h3 className="text-lg font-medium text-gray-700">{labels.blocksTitle}</h3>

                        {contentBlocks.map((block, index) => (
                            <div
                                key={block.id}
                                className={combo(
                                    "relative rounded-2xl border-2 p-5",
                                    isArticle ? "border-blue-100 bg-blue-50/30" : "border-amber-200/70 bg-amber-50",
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
                                        className="absolute -top-3 -right-3 cursor-pointer rounded-full border border-gray-100 bg-white p-1.5 text-gray-400 shadow-md transition-colors hover:border-gray-300 hover:bg-red-50 hover:text-red-500"
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
                                                    : "border-amber-200/70 bg-white focus:border-amber-400",
                                            )}
                                            value={block.content}
                                            onChange={(e) => handleContentChange(block.id, e.target.value)}
                                            placeholder={labels.contentPlaceholder}
                                        />
                                    </div>

                                    <InputImage
                                        label="Image"
                                        onChange={(file) => handleImageChange(block.id, file)}
                                        imagePreview={block.image}
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddBlock}
                            className={combo(
                                "flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-1.5 font-medium transition-colors",
                                isArticle
                                    ? "border-blue-200 text-blue-500 hover:border-blue-300 hover:bg-blue-50"
                                    : "border-amber-300 text-amber-500 hover:border-amber-500 hover:bg-amber-50",
                            )}
                        >
                            <Plus className="size-5" />
                            {labels.addButton}
                        </button>
                    </div>
                )}

                {contentType && <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />}

                {/* Submit button */}
                {contentType && (
                    <div className="flex justify-center pt-4">
                        <Button type="button" label={labels.submitButton} isLoading={isLoading} onClick={handleSubmit}>
                            {labels.submitButton}
                        </Button>
                    </div>
                )}
            </form>
        </Card>
    );
}
