"use server";

import { revalidateTag } from "next/cache";

export const refreshTag = async (tag: string) => {
    revalidateTag(tag);
};
