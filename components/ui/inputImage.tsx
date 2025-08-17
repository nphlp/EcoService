"use client";

import ImageRatio from "@comps/ui/imageRatio";
import { combo } from "@lib/combo";
import { Image as ImageTemplate, X } from "lucide-react";
import { ChangeEvent, DragEvent, InputHTMLAttributes, MouseEvent, useRef } from "react";
import Button from "./button";

type InputFileProps = {
    label: string;
    variant?: "default" | false;
    required?: boolean;
    onChange: (file: File | null) => void;
    imagePreview: File | null;
    classComponent?: string;
    classLabel?: string;
    classContent?: string;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "label" | "type" | "accept" | "className" | "required" | "label" | "onChange"
>;

/**
 * Input image with preview
 * @example
 * ```tsx
 * // Define the state
 * const [image, setImage] = useState<File | null>(null);
 *
 * // Use the component
 * <InputImage
 *     label="Image"
 *     onChange={setImage}
 *     imagePreview={image}
 * />
 * ```
 */
export default function InputFile(props: InputFileProps) {
    const {
        label,
        variant = "default",
        required = true,
        onChange,
        imagePreview,
        classComponent,
        classLabel,
        classContent,
        ...others
    } = props;

    /** Ref of input image */
    const refInputImage = useRef<HTMLInputElement>(null);

    /** Do not trigger onChange event of file input when image is already set */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        if (imagePreview) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    /** Add image to parent state */
    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!imagePreview) onChange(e.target.files?.[0] as File);
    };

    /** Prevent default browser behavior of drag over event */
    const preventBrowserDropBehavior = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    /** Add image to parent state when dropping a file */
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!imagePreview) onChange(e.dataTransfer.files?.[0]);
    };

    /** Reset parent state and input field */
    const handleReset = () => {
        // Reset parent state
        onChange(null);
        // Reset input field
        if (refInputImage.current) {
            refInputImage.current.value = "";
        }
    };

    const theme = {
        default: {
            component: combo("block space-y-1"),
            label: combo("text-sm font-medium text-black"),
            content: combo(
                "rounded-xl border-[1.4px] border-dashed border-black/20 bg-white",
                "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
                "transition-all duration-150",
            ),
        },
        dark: {
            component: combo("block space-y-1"),
            label: combo("text-sm font-medium text-white"),
            content: combo(
                "rounded-xl border-[1.4px] border-dashed border-white/20 bg-white/10",
                "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
                "transition-all duration-150",
            ),
        },
    };

    return (
        <label className={combo(variant && theme[variant].component, classComponent)} onClick={preventDefault}>
            {/* Label */}
            <div className={combo(variant && theme[variant].label, classLabel)}>{label}</div>

            {/* Content */}
            <div
                className={combo(!imagePreview && "cursor-pointer", variant && theme[variant].content, classContent)}
                onDragOver={preventBrowserDropBehavior}
                onDrop={handleDrop}
                // Allow to focus the input when pressing Enter or Space
                role="input"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!imagePreview && refInputImage.current) {
                            refInputImage.current.click();
                        }
                    }
                    if (e.key === "Delete" || e.key === "Backspace") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReset();
                    }
                }}
            >
                {imagePreview ? (
                    // Image preview
                    <div className="relative">
                        <ImageRatio
                            src={URL.createObjectURL(imagePreview)}
                            alt="Preview"
                            className="w-full rounded-xl"
                        />
                        <Button
                            label="Retirer l'image"
                            baseStyleOnly={["outline", "rounded", "transition"]}
                            variant="none"
                            onClick={handleReset}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " " || e.key === "Delete" || e.key === "Backspace") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleReset();
                                }
                            }}
                            className={combo(imagePreview && "cursor-pointer", "absolute top-2 right-2")}
                        >
                            <X className="size-8 text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.7)]" />
                        </Button>
                    </div>
                ) : (
                    // Placeholder
                    <div className="m-5 flex flex-col items-center gap-2">
                        <ImageTemplate className="size-10 stroke-[1.5px] text-gray-400" />
                        <div className="text-center text-sm text-gray-400">
                            <div>Glissez une image</div>
                            <div>ou cliquez pour sélectionner</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden input field */}
            <input
                ref={refInputImage}
                type="file"
                onChange={handleAddImage}
                disabled={!!imagePreview}
                accept="image/*"
                className="hidden"
                required={required}
                {...others}
            />
        </label>
    );
}
