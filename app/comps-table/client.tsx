"use client";

import Button from "@comps/ui/button";
import Input from "@comps/ui/input";
import Select from "@comps/ui/select/select";
import { combo } from "@lib/combo";
import { useState } from "react";
import { CategorySearchType } from "./fetchParams";
import { createSelectOptions } from "@comps/ui/select/utils";

type ClientProps = {
    initialData: {
        categoryList: CategorySearchType[];
    };
};

export default function Client(props: ClientProps) {
    const { initialData } = props;

    const common = combo(
        "space-y-3",
        "p-5 border border-gray-200 rounded-lg",
        // Optionnal
    );

    // Input
    const [inputValue, setInputValue] = useState("");

    // Select
    const { categoryList } = initialData;
    const selectOptions = createSelectOptions(categoryList, { label: "name", slug: "slug" });
    const [selectValue, setSelectValue] = useState("");

    return (
        <div className={combo("w-full flex-1", "grid grid-cols-4 grid-rows-4 gap-6", "p-7")}>
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
                    label="Categorie"
                    placeholder="Select a category"
                    options={selectOptions}
                    setSelected={setSelectValue}
                    selected={selectValue}
                />
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
        </div>
    );
}
