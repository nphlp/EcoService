"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@comps/shadcn/lib/utils";
import { Button } from "@comps/shadcn/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@comps/shadcn/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@comps/shadcn/components/ui/popover";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "vite",
        label: "Vite",
    },
    {
        value: "svelte",
        label: "Svelte",
    },
    {
        value: "solid",
        label: "Solid",
    },
    {
        value: "vue",
        label: "Vue",
    },
    {
        value: "qwik",
        label: "Qwik",
    },
    {
        value: "lit",
        label: "Lit",
    },
    
];

export default function Page() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
