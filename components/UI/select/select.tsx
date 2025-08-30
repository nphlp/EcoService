"use client";

import { type ButtonHTMLAttributes } from "react";
import Button from "./button";
import Component from "./component";
import Dropdown from "./dropdown";
import Label from "./label";
import Option from "./options";
import Provider from "./provider";
import { VariantType } from "./theme";
import { SelectOptionType } from "./utils";

export type SelectClassName = {
    component?: string;
    label?: string;

    displayedValue?: string;
    placeholder?: string;

    buttonGroup?: string;
    button?: string;

    subButton?: string;
    subCross?: string;

    subDiv?: string;
    subChevron?: string;

    optionList?: string;
    optionButton?: string;
    optionIcon?: string;
    optionLabel?: string;
};

export type CommonProps = {
    // Props
    label: string;
    placeholder?: string;

    // Styles
    variant: VariantType;
    className?: SelectClassName;
    dropdownGap: number;

    canNotBeEmpty?: boolean;
    required?: boolean;

    // External States
    options: SelectOptionType[];
    setSelected: (value: SelectOptionType["slug"]) => void;
    selected: SelectOptionType["slug"];
};

type SelectProps = Omit<CommonProps, "variant" | "dropdownGap"> & {
    // Override this props to set a default value
    variant?: VariantType;
    dropdownGap?: number;
} & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "label" | "placeholder" | "required" | "className" | "options" | "value"
    >;

/**
 * Select component
 * 
 * @example
 * #### Server side
 * ```tsx
    // Fetch data
    const categoryList = await CategoryFindManyServer({
        select: { slug: true, name: true },
    });

    // Format options
    const categoryOptions = createSelectOptions(categoryList, { slug: "slug", label: "name" });
 * ```
 * 
 * #### Client side
 * ```tsx
    const [category, setCategory] = useState("");
    
    return (
        <Select
            label="Catégorie"
            placeholder="Sélectionnez une catégorie"
            options={categoryOptions}
            setSelected={setCategory}
            selected={category}
            className={{ component: "w-full" }}
            canNotBeEmpty
        />
    )
 * ```
 */
export default function Select(props: SelectProps) {
    // Define default values
    const { options, variant = "default", dropdownGap = 8, ...others } = props;

    return (
        <Provider {...{ options, variant, dropdownGap, ...others }}>
            <Component>
                <Label />
                <Button />
                <Dropdown>
                    {options?.map((option, index) => (
                        <Option key={index} option={option} />
                    ))}
                </Dropdown>
            </Component>
        </Provider>
    );
}
