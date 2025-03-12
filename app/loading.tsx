import Loader from "@comps/server/Loader";

export default function Loading() {
    return (
        <div className="flex flex-1 flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-4">
                <Loader />
                <span className="text-lg text-gray-600">{process.env.NODE_ENV === "development" ? "Server loading..." : "Loading..."}</span>
            </div>
        </div>
    );
}
