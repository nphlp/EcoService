import Card from "@comps/server/Card";

export const ImageCard = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <Card className="w-fit overflow-hidden p-0">{children}</Card>;
};

export const Title = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <h2 className="text-lg font-bold">{children}</h2>;
};

export const Text = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <p className="text-wrap text-sm">{children}</p>;
};
