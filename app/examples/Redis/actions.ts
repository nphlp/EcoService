"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const normalRefresh = async () => {
    console.log("======> Normal refresh <=====");
    redirect("/examples/Redis");
};

export const refreshTag = async (tag: string) => {
    console.log("======> Revalidate cache <=====");
    revalidateTag(tag);
};
