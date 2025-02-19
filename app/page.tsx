import { SliderClient } from "@comps/client/Slider";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";

export default async function HomePage() {

    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded";
    
    return (
        <div className="min-h-full w-full bg-white">
            <section className="flex flex-row items-center justify-between gap-12 bg-primary p-16">
                <div className="w-full text-nowrap text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <div className="text-white">Passez au</div>
                    <div className="text-secondary">zéro déchet</div>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <ImageRatio
                        src="/illustration/produit 2.jpg"
                        alt="produit"
                        className={imageClass}
                    />
                    <ImageRatio
                        src="/illustration/coton 3.jpg"
                        alt="coton"
                        className={combo("max-md:hidden",imageClass)}
                    />
                </div>
            </section>
            <section className="space-y-3 p-8">
                <h2 className="text-center text-2xl font-bold">Nos produits</h2>
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
            <section className="space-y-3 bg-primary p-8">
                <h2 className="text-center text-2xl font-bold text-white">
                    Nos produits
                </h2>
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
            <section className="space-y-3 p-8">
                <h2 className="text-center text-2xl font-bold">Nos produits</h2>
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
