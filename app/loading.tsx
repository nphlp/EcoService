import Loader from "@comps/server/Loader";

export default function LoadingPage() {
    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <Loader />
            <span>Loading...</span>
        </div>
    );
}
