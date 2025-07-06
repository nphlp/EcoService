import { ArticleFindManyCached } from "@services/cached";

export default async function Page() {
    const { data } = await ArticleFindManyCached({ select: { title: true } });

    return <pre className="p-8">{JSON.stringify(data, null, 2)}</pre>;
}
