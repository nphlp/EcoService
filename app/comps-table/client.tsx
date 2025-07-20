"use client";

import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import Select from "@comps/ui/select";
import { combo } from "@lib/combo";
import { useState } from "react";

export default function Client() {
    const common = combo(
        "space-y-3",
        "p-5 border rounded-lg",
        // Optionnal
    );

    // Button

    // Input
    const [inputValue, setInputValue] = useState("");

    // Select
    const [selectValue, setSelectValue] = useState("");

    return (
        <div className={combo("w-full flex-1", "grid grid-cols-4 gap-6", "p-7")}>
            <div className={combo(common)}>
                <h2 className="text-2xl font-bold">Button</h2>
                <div className="grid grid-cols-2 justify-items-start gap-2">
                    <Button label="Button" />
                    <Button label="Button" variant="outline" />
                    <Button label="Button" variant="ghost" />
                    <Button label="Button" variant="underline" />
                </div>
            </div>
            <div className={combo(common)}>
                <h2 className="text-2xl font-bold">Input</h2>
                <Input
                    label="Input"
                    placeholder="Type here..."
                    classLabel="sr-only"
                    setValue={setInputValue}
                    value={inputValue}
                />
            </div>
            <div className={combo(common)}>
                <h2 className="text-2xl font-bold">Select</h2>
                <Select
                    label="Select"
                    placeholder="Select an option..."
                    classLabel="sr-only"
                    options={[
                        { label: "Option 1", value: "option-1" },
                        { label: "Option 2", value: "option-2" },
                        { label: "Option 3", value: "option-3" },
                    ]}
                    onChange={(e) => setSelectValue(e.target.value)}
                    value={selectValue}
                />
            </div>
        </div>
    );
}
