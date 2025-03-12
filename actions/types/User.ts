import { UserModel, RelatedUserModel } from "@actions/zod-generated";
import { User, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the User's model with relations */
export type UserType = z.infer<typeof RelatedUserModel>;

/** Represents the User's unique identifier */
export type UserId = Pick<User, "id">;

/** Represents common User properties without system-managed fields */
export type UserCommon = Omit<User, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a User */
export type UserUpdate = {
    id: User["id"];
    data: UserCommon;
};

/** Represents system-managed timestamp fields */
export type UserTimestamps = Pick<User, "createdAt" | "updatedAt">;

/** Find one options for Users */
export type SelectUserProps = Pick<Prisma.UserFindUniqueArgs, "where" | "select">;

/** Find many options for Users */
export type SelectUserListProps = Pick<Prisma.UserFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Users */
export type SelectUserAmountProps = Pick<Prisma.UserCountArgs, "where">;
