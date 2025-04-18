"use client";

import { Eye, EyeClosed } from "lucide-react";
import Button from "./button";
import Input, { InputProps } from "./input";
import { ChangeEvent, useState } from "react";
import { combo } from "@lib/combo";

type InputPasswordProps = {
    classPasswordComponent?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
} & Omit<InputProps, "onChange" | "value">;

export default function InputPassword(props: InputPasswordProps) {
    const { onChange, value, classPasswordComponent, ...others } = props;
    const [toggleVisibility, setToggleVisibility] = useState(false);

    return (
        <div className={combo("flex flex-row items-end gap-1.5", classPasswordComponent)}>
            <Input
                type={toggleVisibility ? "text" : "password"}
                classComponent="w-full"
                onChange={onChange}
                value={value}
                {...others}
            />
            <Button
                type="button"
                label="toggle-password-visibility"
                className="p-2 hover:border-gray-300"
                variant="outline"
                baseStyleWithout={["padding", "font"]}
                onClick={() => setToggleVisibility(!toggleVisibility)}
            >
                {toggleVisibility && <Eye className="size-5" />}
                {!toggleVisibility && <EyeClosed className="size-5" />}
            </Button>
        </div>
    );
}
