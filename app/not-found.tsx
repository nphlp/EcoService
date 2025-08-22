import Link from "@comps/UI/button/link";

export default function NotFound() {
    return (
        <div className="max-w-3/4 space-y-4">
            <h2 className="text-2xl font-bold">Mmm? There is nothing here...</h2>
            <div>Maybe this page does not exist. Please go back home, or try it again later.</div>
            <Link label="home" href="/" className="w-fit">
                Go back Home
            </Link>
        </div>
    );
}
