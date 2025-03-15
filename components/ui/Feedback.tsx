import { combo } from "@lib/combo";

export type FeedbackMode = "success" | "info" | "warning" | "error" | "";

type FeedbackProps = {
    message: string;
    mode: FeedbackMode;
};

export default function FeedbackClient(props: FeedbackProps) {
    const { message, mode } = props;

    if (!message || !mode) {
        return <></>;
    }

    const modeStyle = {
        success: "text-green-600 border-green-400 bg-green-100",
        info: "text-blue-600 border-blue-400 bg-blue-100",
        warning: "text-orange-600 border-orange-400 bg-orange-100",
        error: "text-red-600 border-red-400 bg-red-100",
    };

    return (
        <div className={combo("w-full text-wrap rounded-md border px-3 py-1 text-center text-sm", modeStyle[mode])}>
            {message}
        </div>
    );
}
