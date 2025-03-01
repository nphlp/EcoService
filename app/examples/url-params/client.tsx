"use client";

import Card from "@comps/server/Card";
import { useQueryState } from "nuqs";
import { CheckedParam, PageParam, TypeParam } from "./type";

export default function ParamsExampleClient() {
    // Inital values are imported from the URL params

    const [page, setPage] = useQueryState("page", PageParam["page"]);
    const [type, setType] = useQueryState("type", TypeParam["type"]);
    const [checked, setChecked] = useQueryState("checked", CheckedParam["checked"]);

    // console.log("Client component", "\n", { page, type, checked });

    return (
        <div className="flex w-[500px] flex-row gap-4">
            <Card className="w-1/3">
                <label className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400">Page</span>
                    <select
                        className="rounded px-3 py-1 outline-none hover:bg-gray-100"
                        name="page"
                        onChange={(e) => setPage(Number(e.target.value))}
                        value={page}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
            </Card>
            <Card className="w-1/3">
                <label className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400">Type</span>
                    <select
                        className="rounded px-3 py-1 outline-none hover:bg-gray-100"
                        name="type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option value="all">Tout</option>
                        <option value="concert">Concert</option>
                        <option value="spectacle">Spectacle</option>
                    </select>
                </label>
            </Card>
            <Card className="w-1/3">
                <label className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400">Checked</span>
                    <div className="flex items-center justify-between gap-2 rounded px-3 py-1 hover:bg-gray-100">
                        <span className="text-sm">Accepter</span>
                        <input
                            type="checkbox"
                            name="checked"
                            onChange={(e) => setChecked(e.target.checked)}
                            checked={checked}
                        />
                    </div>
                </label>
            </Card>
        </div>
    );
}
