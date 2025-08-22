"use client";

import { useThemeStore } from "@comps/CORE/themeStore";
import Button from "@comps/UI/button/button";
import Input from "@comps/UI/input/input";
import Modal from "@comps/UI/modal/modal";
import Select from "@comps/UI/select/select";
import { createSelectOptions } from "@comps/UI/select/utils";
import { combo } from "@lib/combo";
import { useState } from "react";
import { CategorySearchType } from "./fetchParams";

type ClientProps = {
    initialData: {
        categoryList: CategorySearchType[];
    };
};

export default function Client(props: ClientProps) {
    const { initialData } = props;

    const { isDarkMode } = useThemeStore();

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

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    className={{ label: "sr-only" }}
                    setValue={setInputValue}
                    value={inputValue}
                    variant={"default"}
                />
            </div>
            <div className={combo(common)}>
                <h2 className="text-2xl font-bold">Select</h2>
                <Select
                    label="Categorie"
                    placeholder="Select a category"
                    className={{ label: "sr-only" }}
                    options={selectOptions}
                    setSelected={setSelectValue}
                    selected={selectValue}
                    variant={"default"}
                />
            </div>
            <div className={combo(common)}>
                <h2 className="text-2xl font-bold">Select</h2>
                <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} withCross>
                    <h2 className="text-lg font-semibold">Modal Title</h2>
                    <div className="mt-1">This is an awesome modal content.</div>
                </Modal>
                <Button label="Open Modal" type="button" onClick={() => setIsModalOpen(true)} />
            </div>
            <div className={combo(common)}>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Theme Info</h2>
                <div className="space-y-2 text-sm text-[var(--foreground)]">
                    <p>
                        Mode actuel:{" "}
                        <span className="font-semibold text-[var(--foreground)]">
                            {isDarkMode ? "Sombre" : "Clair"}
                        </span>
                    </p>
                    <p>
                        Préférence:{" "}
                        <span className="font-semibold text-[var(--foreground)]">
                            {isDarkMode === null ? "Système" : "Manuel"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
