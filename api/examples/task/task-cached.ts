import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";

const taskFindManyCached = async <T extends Prisma.TaskFindManyArgs>(
    props: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>,
    tags: string[],
) => {
    "use cache";
    cacheTag(...tags);
    cacheLife("hours");
    return await PrismaInstance.task.findMany(props);
};

const taskFindUniqueCached = async <T extends Prisma.TaskFindUniqueArgs>(
    props: Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>,
    tags: string[],
) => {
    "use cache";
    cacheTag(...tags);
    cacheLife("hours");
    return await PrismaInstance.task.findUnique(props);
};

const taskFindFirstCached = async <T extends Prisma.TaskFindFirstArgs>(
    props: Prisma.SelectSubset<T, Prisma.TaskFindFirstArgs>,
    tags: string[],
) => {
    "use cache";
    cacheTag(...tags);
    cacheLife("hours");
    return await PrismaInstance.task.findFirst(props);
};

export { taskFindManyCached, taskFindUniqueCached, taskFindFirstCached };
