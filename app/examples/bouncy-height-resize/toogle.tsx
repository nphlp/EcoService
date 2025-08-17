import { combo } from "@lib/combo";

type ToggleProps = {
    setValue: (value: boolean) => void;
    value: boolean;
};

export default function Toggle(props: ToggleProps) {
    const { setValue, value } = props;

    const handleClick = () => {
        setValue(!value);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={combo(
                "w-18.5",
                "rounded-full p-1",
                "bg-gray-100",
                "border border-gray-300",
                "inset-shadow-[0_0_3px_rgba(0,0,0,0.2)]",
            )}
        >
            <div
                className={combo(
                    "size-6 rounded-full",
                    "bg-blue-400",
                    "inset-shadow-[2px_2px_3px_rgba(0,0,0,0.2)]",
                    "transition-all duration-300 ease-in-out",
                    value ? "translate-x-10" : "translate-x-0",
                )}
            />
        </button>
    );
}
