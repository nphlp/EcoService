import Card from "@comps/server/card";
import { combo } from "@lib/combo";

export default function Page() {
    return (
        <div className="flex min-h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-5">
                <Card className="size-64">
                    <button
                        className={combo(
                            "bg-black text-white",
                            "hover:bg-gray-700",
                            "rounded-[6px] px-3 py-0.5",
                            "transition-[box-shadow,background-color] duration-200 ease-in-out",
                            "hover:inset-shadow-[0_0px_6px_1px_rgba(0,0,0,1)]",
                            "outline-0 outline-offset-[2px] outline-teal-300 active:outline-[1.75px]",
                            "hover:cursor-pointer",
                        )}
                    >
                        Button
                    </button>
                </Card>
            </div>
        </div>
    );
}
