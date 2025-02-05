"use client";

import { combo } from "@lib/combo";

type InputProps = {
    label: string;
    type: "text" | "email" | "password" | "file";
    placeholder?: string | boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

    classDiv?: string;
    classLabel?: string;
    classInput?: string;
} & ({
    // If type is text, email, or password
    type: "text" | "email" | "password";
    value: string;
}|{
    // If type is file
    type: "file";
    value?: never;
})

export default function InputClient(props: InputProps) {
    const {
        label,
        onChange,
        value,
        type = "text",
        placeholder = false,
        onBlur,
        classDiv,
        classLabel,
        classInput,
    } = props;

    const labelLowerCased = label.toLocaleLowerCase();
    const labelFirstLetterCapitalized =
        label[0].toLocaleUpperCase() + label.slice(1).toLocaleLowerCase();

    const placeholderValue =
        typeof placeholder === "string"
            ? placeholder
            : placeholder
            ? labelFirstLetterCapitalized
            : "";

    if (type === "file") {
        return (
            <input
                className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={onChange}
            />
        );
    }

    return (
        <div className={combo("flex w-full flex-col gap-1", classDiv)}>
            <label
                className={combo("text-gray-600", classLabel)}
                htmlFor={labelLowerCased}
            >
                {labelFirstLetterCapitalized}
            </label>
            <input
                className={combo(
                    "rounded-md border-[1.5px] border-gray-300 px-2 outline-none ring-transparent ring-offset-0 transition-all duration-150 focus:ring-2 focus:ring-teal-300 focus:ring-offset-2",
                    classInput
                )}
                type={type}
                id={labelLowerCased}
                name={labelLowerCased}
                placeholder={placeholderValue}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
            />
        </div>
    );
}
