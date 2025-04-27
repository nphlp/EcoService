import AddToCartButton from "@comps/addToCardButton";
import Card, { CardProps } from "@comps/server/card";
import ImageRatio from "@comps/server/imageRatio";
import { ProductModel } from "@services/types";

type ProductCardProps = {
    product: ProductModel;
} & CardProps;

export default function ProductCard(props: ProductCardProps) {
    const { product, ...others } = props;
    const { id, name, description, image, price } = product;

    return (
        <Card className="h-full overflow-hidden p-0" {...others}>
            <ImageRatio src={image} alt={name} />
            <div className="flex flex-row items-end justify-between p-5">
                <div className="space-y-2">
                    <div>
                        <h2 className="text-xl font-bold">{name}</h2>
                        <div className="text-sm text-gray-500">{description}</div>
                    </div>
                    <div className="font-bold text-nowrap text-gray-500">{price} €</div>
                </div>
                <AddToCartButton productId={id} />
            </div>
        </Card>
    );
}
