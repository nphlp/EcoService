"use client";

import { combo } from "@lib/combo";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import Button from "./button";
import Input, { InputProps } from "./input/input";

type InputPasswordProps = {
    classPasswordComponent?: string;
    setValue: (value: string) => void;
    value: string;
} & Omit<InputProps, "onChange" | "value">;

export default function InputPassword(props: InputPasswordProps) {
    const { setValue, value, classPasswordComponent, ...others } = props;
    const [toggleVisibility, setToggleVisibility] = useState(false);

    return (
        <div className={combo("flex flex-row items-end gap-1.5", classPasswordComponent)}>
            <Input
                type={toggleVisibility ? "text" : "password"}
                className={{ component: "w-full" }}
                setValue={setValue}
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
