import ImageRatio from "@comps/UI/imageRatio";
import PerspectiveCard from "./perspectiveCard";

export default function Page() {
    return (
        <div className="space-y-2 p-7">
            <h1 className="text-2xl font-bold">Perspective Card</h1>
            <p>
                <span>This is an example of a perspective card</span>
                <span>{" -> "}</span>
                <span className="font-bold">Hover it!</span>
            </p>
            <PerspectiveCard>
                <ImageRatio
                    src="/fruit/apple.webp"
                    alt="Apple"
                    mode="onPageLoad"
                    className="rounded-2xl border border-gray-300"
                />
            </PerspectiveCard>
        </div>
    );
}
