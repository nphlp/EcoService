import { Select } from "@base-ui/react/select";
import { combo } from "@lib/combo";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

const fonts = [
    { label: "Select font", value: null },
    { label: "Sans-serif", value: "sans" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "mono" },
    { label: "Cursive", value: "cursive" },
];

export default function SelectBaseUI() {
    return (
        <Select.Root items={fonts}>
            <Select.Trigger
                className={combo(
                    // Layout
                    "flex h-10 min-w-36 items-center justify-between gap-3 pr-3 pl-3.5",
                    // Border
                    "rounded-md border border-gray-200",
                    "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800",
                    // Background
                    "bg-[canvas] hover:bg-gray-100 data-popup-open:bg-gray-100",
                    // Text
                    "text-base text-gray-900 select-none",
                )}
            >
                <Select.Value />
                <Select.Icon className="flex">
                    <ChevronsUpDownIcon className="size-4" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner className={combo("z-10", "outline-none", "select-none")} sideOffset={8}>
                    <Select.Popup
                        className={combo(
                            // Layout
                            "group min-w-(--anchor-width) origin-(--transform-origin)",
                            "data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)]",
                            // Border
                            "rounded-md outline outline-gray-200 dark:outline-gray-300",
                            // Background
                            "bg-[canvas] bg-clip-padding",
                            // Text
                            "text-gray-900",
                            // Shadow
                            "shadow-lg shadow-gray-200 dark:shadow-none",
                            // Animation
                            "transition-[transform,scale,opacity]",
                            "data-ending-style:scale-90 data-ending-style:opacity-0",
                            "data-starting-style:scale-90 data-starting-style:opacity-0",
                            "data-[side=none]:data-ending-style:transition-none",
                            "data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none",
                        )}
                    >
                        <Select.ScrollUpArrow
                            className={combo(
                                // Layout
                                "top-0 z-1 flex h-4 w-full items-center justify-center",
                                "before:absolute before:left-0 before:h-full before:w-full",
                                "data-[side=none]:before:-top-full",
                                // Border
                                "rounded-md",
                                // Background
                                "bg-[canvas]",
                                // Text
                                "cursor-default text-center text-xs before:content-['']",
                            )}
                        />
                        <Select.List
                            className={combo(
                                // Layout
                                "relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1",
                            )}
                        >
                            {fonts.map(({ label, value }) => (
                                <Select.Item
                                    key={label}
                                    value={value}
                                    className={combo(
                                        // Layout
                                        "grid grid-cols-[1rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5",
                                        "group-data-[side=none]:pr-12",
                                        "data-highlighted:relative data-highlighted:z-0",
                                        "data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1]",
                                        "pointer-coarse:py-2.5",
                                        // Border
                                        "outline-none data-highlighted:before:rounded-sm",
                                        // Background
                                        "data-highlighted:before:bg-gray-900",
                                        // Text
                                        "cursor-default text-sm leading-4 select-none",
                                        "group-data-[side=none]:text-base group-data-[side=none]:leading-4",
                                        "data-highlighted:text-gray-50",
                                        "pointer-coarse:text-[0.925rem]",
                                    )}
                                >
                                    <Select.ItemIndicator className="col-start-1">
                                        <CheckIcon className="size-4" />
                                    </Select.ItemIndicator>
                                    <Select.ItemText className="col-start-2">{label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.List>
                        <Select.ScrollDownArrow
                            className={combo(
                                // Layout
                                "bottom-0 z-1 flex h-4 w-full items-center justify-center",
                                "before:absolute before:left-0 before:h-full before:w-full",
                                "data-[side=none]:before:-bottom-full",
                                // Border
                                "rounded-md",
                                // Background
                                "bg-[canvas]",
                                // Text
                                "cursor-default text-center text-xs before:content-['']",
                            )}
                        />
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    );
}
