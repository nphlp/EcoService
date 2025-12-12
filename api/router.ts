import "server-only";
import userMutations from "./user/user-mutation";
import userQueries from "./user/user-query";

export const apiRouter = {
    user: {
        ...userQueries,
        ...userMutations,
    },
};

export type ApiRouter = typeof apiRouter;
