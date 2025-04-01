"use client";

import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { CircleAlert, CircleCheck, CircleHelp, CircleX } from "lucide-react";

export type FeedbackMode = "success" | "info" | "warning" | "error" | "none";

type FeedbackProps = {
    message: string;
    mode: FeedbackMode;
    classComponent?: string;
    classFeedback?: string;
};

/**
 * Feedback component
 * @example
 * ```tsx
 * // Define the state
 * const [message, setMessage] = useState("");
 * const [mode, setMode] = useState<FeedbackMode>("none"); // Hidden
 *
 * // Update the state
 * const handleSubmit = (e: FormEvent) => {
 *     e.preventDefault();
 * 
 *     setMode("success");
 *     setMessage("Product created successfully");
 * }
 *
 * // Use the component
 * return <form onSubmit={handleSubmit}>
 *     <Input label="Product name" name="product-name" />
 *     <Feedback message={message} mode={mode} />
 *     <Button label="Submit" />
 * </form>
 * ```
 */
export default function Feedback(props: FeedbackProps) {
    const { message, mode, classComponent, classFeedback } = props;

    const modeStyle = {
        success: {
            class: combo("text-green-700 border-green-500 bg-green-100"),
            icon: <CircleCheck className="size-5" />,
        },
        info: {
            class: combo("text-blue-700 border-blue-500 bg-blue-100"),
            icon: <CircleHelp className="size-5" />,
        },
        warning: {
            class: combo("text-orange-700 border-orange-500 bg-orange-100"),
            icon: <CircleAlert className="size-5" />,
        },
        error: {
            class: combo("text-red-700 border-red-500 bg-red-100"),
            icon: <CircleX className="size-5" />,
        },
        none: {
            class: combo("h-0"),
            icon: <></>,
        },
    };

    return (
        <motion.div
            initial={{
                height: "0px",
            }}
            animate={{
                height: mode === "none" ? "0px" : "auto",
            }}
            transition={{ duration: 0.3 }}
            className={combo("overflow-hidden w-full flex justify-center", classComponent)}
        >
            <div
                className={combo(
                    "flex items-center justify-center gap-2 text-wrap rounded-xl border px-5 py-2 text-center text-sm",
                    modeStyle[mode].class,
                    classFeedback,
                )}
            >
                {modeStyle[mode].icon}
                <span>{message}</span>
            </div>
        </motion.div>
    );
}
