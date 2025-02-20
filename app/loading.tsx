import Loader from "@comps/server/Loader";

export default function LoadingPage() {
    return (
        <div className="flex min-h-full w-full flex-row items-center justify-center bg-white">
            <div className="flex flex-row items-center justify-center gap-4">
                <Loader />
                <span className="text-lg text-gray-600">Loading...</span>
            </div>
        </div>
    );
}
