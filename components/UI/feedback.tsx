"use client";

import { combo } from "@lib/combo";
import { CircleAlert, CircleCheck, CircleHelp, CircleX } from "lucide-react";
import { motion } from "motion/react";

export type FeedbackMode = "success" | "info" | "warning" | "error" | "none";

type FeedbackProps = {
    isFeedbackOpen: boolean;
    message: string;
    mode: FeedbackMode;
};

/**
 * Feedback component
 * @example
 * ```tsx
 * // Define the state
 * const [message, setMessage] = useState("");
 * const [mode, setMode] = useState<FeedbackMode>("succes");
 * const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
 *
 * // Update the state
 * const handleSubmit = (e: FormEvent) => {
 *     e.preventDefault();
 *     setMode("success");
 *     setMessage("Product created successfully");
 *     setIsFeedbackOpen(true);
 * }
 *
 * // Use the component
 * return <form onSubmit={handleSubmit}>
 *     <Input label="Product name" name="product-name" />
 *     <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
 *     <Button label="Submit" />
 * </form>
 * ```
 */
export default function Feedback(props: FeedbackProps) {
    const { message, mode, isFeedbackOpen } = props;

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
            class: combo("text-gray-500 border-gray-500 bg-gray-100"),
            icon: <CircleCheck className="size-5"></CircleCheck>,
        },
    };

    return (
        <motion.div
            initial={{
                height: "0px",
            }}
            animate={{
                height: isFeedbackOpen ? "auto" : "0px",
            }}
            transition={{ duration: 0.3 }}
            className={combo("flex w-full justify-center overflow-hidden")}
        >
            <div className={combo("rounded-xl border text-sm text-wrap", modeStyle[mode].class)}>
                <div className={combo("flex items-center justify-center gap-2 px-5 py-2")}>
                    {modeStyle[mode].icon}
                    <span>{message}</span>
                </div>
            </div>
        </motion.div>
    );
}
