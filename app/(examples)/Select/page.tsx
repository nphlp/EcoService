import Button from "@comps/ui/Button";
import Input from "@comps/ui/Input";
import Select, { OptionsType } from "@comps/ui/Select";
import SelectUp from "@comps/ui/SelectUp";
import { FetchV2 } from "@utils/FetchV2";

export default async function Page() {
    const options: OptionsType[] = [
        {
            label: "Homme",
            value: "H",
        },
        {
            label: "Femme",
            value: "F",
        },
        {
            label: "Non renseigné",
            value: "N",
        },
    ];

    const categoryList = await FetchV2({
        route: "/category",
        params: {
            select: {
                id: true,
                name: true,
            },
        },
    });

    const categoryOptions = categoryList.map(({ id, name }) => ({
        label: name,
        value: id,
    }));

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form action="" className="flex flex-col gap-4">
                <Input label="Nom" />
                <Select label="Genre" placeholder="Sélectionnez un genre" options={options} />
                <SelectUp label="Catégorie" placeholder="Sélectionnez une catégorie" options={categoryOptions} />
                <Button label="Envoyer" />
            </form>
        </div>
    );
}
