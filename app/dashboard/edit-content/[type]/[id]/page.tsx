import { combo } from "@lib/combo";
import { hasRole } from "@permissions/hasRole";
import { ArticleFindUniqueServer, DiyFindUniqueServer } from "@services/server";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import SidebarToggleButton from "../../../components/sidebarToggleButton";
import ContentEditForm from "./contentEditForm";

export const metadata: Metadata = {
    title: "Éditer un contenu",
};

type PageProps = {
    params: Promise<{ type: string; id: string }>;
};

export default async function Page(props: PageProps) {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

    const { params } = props;
    const { type, id } = await params;

    if (type !== "article" && type !== "diy") {
        notFound();
    }

    const session = await hasRole(["EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const content =
        type === "article"
            ? await ArticleFindUniqueServer({
                  where: { id },
                  select: {
                      id: true,
                      title: true,
                      Content: {
                          select: { id: true, content: true, image: true },
                      },
                  },
              })
            : await DiyFindUniqueServer({
                  where: { id },
                  select: {
                      id: true,
                      title: true,
                      Content: {
                          select: { id: true, content: true, image: true },
                      },
                  },
              });

    if (!content) {
        notFound();
    }

    return (
        <>
            <SidebarToggleButton title={metadata.title as string} />
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className={combo("flex w-full flex-col items-center justify-start", "px-4 py-4 md:px-7")}>
                    <ContentEditForm type={type} content={content} />
                </div>
            </div>
        </>
    );
};
