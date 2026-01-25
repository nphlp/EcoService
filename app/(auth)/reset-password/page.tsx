import ResetPassword from "./components/reset-password";

type PageProps = {
    searchParams: Promise<{ token?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
    const { token } = await searchParams;

    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center bg-gray-100 p-7">
            <div className="min-w-90 space-y-3">
                <div className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md">
                    <div className="space-y-4 p-7">
                        <ResetPassword token={token} />
                    </div>
                </div>
            </div>
        </div>
    );
}
