import Card from "@comps/server/card";
import Link from "@comps/ui/link";
import { BetterSessionServer, GetSession } from "@lib/authServer";
import { UserFindManyServer } from "@services/server";
import { UserModel } from "@services/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

export default async function Page() {
    const session = await GetSession();

    const userList = await UserFindManyServer({});

    return (
        <div className="flex justify-center p-8">
            <div className="w-[600px] space-y-2">
                {userList.map((user, index) => (
                    <UserCard key={index} user={user} session={session} />
                ))}
            </div>
        </div>
    );
}

type UserCardProps = {
    user: UserModel;
    session: BetterSessionServer | null;
};

const UserCard = (props: UserCardProps) => {
    const { user, session } = props;

    const apiUrl = "/api/internal/user/unique?params=";
    const params = encodeURIComponent(JSON.stringify({ where: { id: user.id } }));
    const href = `${baseUrl}${apiUrl}${params}`;

    return (
        <Card className="space-y-1">
            <div>ID: {user.id}</div>
            <div>
                Name: {user.name} {session?.user?.id === user.id ? " (You)" : ""}
            </div>
            <div>Role: {user.role}</div>
            <Link label="API URL with ID" href={href} className="w-fit" />
        </Card>
    );
};
