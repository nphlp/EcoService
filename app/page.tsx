import { SliderClient } from "@comps/client/Slider";
import ImageRatio from "@comps/server/ImageRatio";

export default async function HomePage() {

    const imageClass = "h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] xl:h-[140px] rounded";

    return (
        <div className="size-full overflow-y-auto py-4">
            <section className="flex flex-row items-center justify-between gap-12 bg-primary p-16">
                <div className="text-nowrap text-lg font-bold text-secondary sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl">
                    <div>Passez au</div>
                    <div>zéro déchet</div>
                </div>
                <div className="w-full space-y-4">
                    <div className="flex flex-row items-center justify-evenly">
                        <ImageRatio
                            src="/illustration/cafe.jpg"
                            alt="cafe"
                            className={imageClass}
                        />
                        <ImageRatio
                            src="/illustration/pots.jpg"
                            alt="pots"
                            className={imageClass}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-evenly">
                        <ImageRatio
                            src="/illustration/produit 2.jpg"
                            alt="produit"
                            className={imageClass}
                        />
                        <ImageRatio
                            src="/illustration/coton 3.jpg"
                            alt="coton"
                            className={imageClass}
                        />
                        <ImageRatio
                            src="/illustration/pshit 2.jpg"
                            alt="pshit"
                            className={imageClass}
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
