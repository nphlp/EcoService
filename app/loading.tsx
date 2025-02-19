import Loader from "@comps/server/Loader";

export default function LoadingPage() {
    return (
        <div className="flex min-h-full w-full flex-row items-center justify-center bg-white">
            <div className="flex flex-row items-center justify-center gap-4">
                <Loader className="size-8 border-4" />
                <span className="text-2xl">Loading...</span>
            </div>
        </div>
    );
}
