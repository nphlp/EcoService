import { GetSession } from "@lib/auth";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await GetSession();

    const role = session?.user.role;

    if (role !== "ADMIN" && role !== "VENDOR" && role !== "EMPLOYEE") {
        unauthorized();
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div>{session?.user.role}</div>
        </div>
    );
}
