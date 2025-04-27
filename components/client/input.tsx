"use client";

import { combo } from "@lib/combo";
import { InputHTMLAttributes, RefAttributes } from "react";

type InputProps = {
    label: string;
    placeholder?: string | boolean;
    ring?: boolean;

    classDiv?: string;
    classLabel?: string;
    classInput?: string;
} & (
    | ({
          // If type is text, email, or password
          type: "text" | "number" | "email" | "password";
      } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">)
    | ({
          // If type is file
          type: "file";
      } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">)
) &
    RefAttributes<HTMLInputElement>;

export default function InputClient(props: InputProps) {
    const {
        label,
        type = "text",
        placeholder = false,
        ring = true,
        classDiv,
        classLabel,
        classInput,
        ...others
    } = props;

    const labelLowerCased = label.toLocaleLowerCase();
    const labelFirstLetterCapitalized = label[0].toLocaleUpperCase() + label.slice(1).toLocaleLowerCase();

    const placeholderValue =
        typeof placeholder === "string" ? placeholder : placeholder ? labelFirstLetterCapitalized : "";

    if (type === "file") {
        return (
            <input
                className={combo(
                    ring && "ring-transparent ring-offset-0 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2",
                    "h-6 cursor-pointer rounded border text-xs transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200",
                )}
                name="profilePicture"
                type="file"
                accept="image/*"
                {...others}
            />
        );
    }

    return (
        <div className={combo("flex w-full flex-col gap-1", classDiv)}>
            <label className={combo("text-gray-600", classLabel)} htmlFor={labelLowerCased}>
                {labelFirstLetterCapitalized}
            </label>
            <input
                className={combo(
                    ring && "ring-transparent ring-offset-0 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2",
                    "rounded-md border border-gray-300 px-2 transition-all duration-150 outline-none",
                    classInput,
                )}
                type={type}
                id={labelLowerCased}
                name={labelLowerCased}
                placeholder={placeholderValue}
                {...others}
            />
        </div>
    );
}
