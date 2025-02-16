import ImageRatio from "@comps/server/ImageRatio";
import { SliderClient } from "@comps/client/Slider";

export default async function HomePage() {
    return (
        <div className="size-full overflow-y-auto py-4">
            <section className="flex flex-row items-center justify-between gap-12 bg-primary p-16">
                <div className="text-nowrap text-6xl font-bold text-secondary">
                    <div>Passez au</div>
                    <div>zéro déchet</div>
                </div>
                <div className="w-full space-y-4">
                    <div className="flex flex-row items-center justify-evenly">
                        <ImageRatio
                            src="/illustration/cafe.jpg"
                            alt="cafe"
                            className="h-[200px] rounded"
                        />
                        <ImageRatio
                            src="/illustration/pots.jpg"
                            alt="pots"
                            className="h-[200px] rounded"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-evenly">
                        <ImageRatio
                            src="/illustration/produit 2.jpg"
                            alt="produit"
                            className="h-[200px] rounded"
                        />
                        <ImageRatio
                            src="/illustration/coton 3.jpg"
                            alt="coton"
                            className="h-[200px] rounded"
                        />
                        <ImageRatio
                            src="/illustration/pshit 2.jpg"
                            alt="pshit"
                            className="h-[200px] rounded"
                        />
                    </div>
                </div>
            </section>
            <section className="p-8">
                <SliderClient
                    imageList={[
                        "/illustration/pshit 1.jpg",
                        "/illustration/pshit 2.jpg",
                        "/illustration/coton 1.jpg",
                        "/illustration/coton 2.jpg",
                        "/illustration/coton 3.jpg",
                        "/illustration/lessive 1.jpg",
                        "/illustration/lessive 2.jpg",
                    ]}
                />
            </section>
        </div>
    );
}
