import {
    SelectUserAmountProps,
    SelectUserListProps,
    SelectUserProps,
} from "@actions/types/User";
import { userIdSchema } from "@actions/zod/User";
import { strictObject, z, ZodType } from "zod";

export const selectUserUniqueSchema: ZodType<SelectUserProps> = strictObject({
    where: strictObject({
        id: userIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectUserListSchema: ZodType<SelectUserListProps> = strictObject({
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectUserAmountSchema: ZodType<SelectUserAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
