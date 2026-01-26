"use client";

import Card from "@comps/UI/card";
import { Prisma } from "@prisma/client/client";
import { Pencil, Trash2 } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteContentProcess } from "@/process/DeleteContentProcess";

type ContentItem = Prisma.ArticleGetPayload<{ select: { id: true; title: true; slug: true; createdAt: true } }>;

type ContentListProps = {
    title: string;
    type: "article" | "diy";
    items: ContentItem[];
};

export default function ContentList(props: ContentListProps) {
    const { title, type, items } = props;

    if (items.length === 0) {
        return (
            <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-700">{title}</h2>
                <p className="text-sm text-gray-500">Aucun contenu pour le moment.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-700">{title}</h2>
            <div className="space-y-2">
                {items.map((item) => (
                    <ContentItem key={item.id} item={item} type={type} />
                ))}
            </div>
        </div>
    );
}

type ContentItemProps = {
    item: ContentItem;
    type: "article" | "diy";
};

const ContentItem = (props: ContentItemProps) => {
    const { item, type } = props;
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Supprimer "${item.title}" ?`)) return;

        setIsDeleting(true);
        const result = await DeleteContentProcess({ type, id: item.id });

        if (result.status) {
            router.refresh();
        } else {
            alert(result.message);
            setIsDeleting(false);
        }
    };

    return (
        <Card className="flex items-center justify-between p-4">
            <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Link
                    href={`/dashboard/edit-content/${type}/${item.id}` as Route}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
                    title="Éditer"
                >
                    <Pencil className="size-4" />
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 disabled:opacity-50"
                    title="Supprimer"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
        </Card>
    );
};
