import { Fetch } from "@actions/utils/Fetch";
import Client from "./client";

export default async function Page() {
    // API call (recommended)
    const productList = await Fetch({ route: "/products", params: { take: 1 } });

    // Sever action (not recommended)
    // const productList = await SelectProductList({ take: 1 });

    return (
        <div>
            <Client productList={productList} />
        </div>
    );
}
