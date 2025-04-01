import Button from "@comps/ui/Button";
import Input from "@comps/ui/Input";
import Select, { OptionsType } from "@comps/ui/Select";

export default function Page() {
    const options: OptionsType = [
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

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form action="" className="flex flex-col gap-4">
                <Input label="Nom" />
                <Select label="Genre" placeholder="Sélectionnez un genre" options={options} />
                <Button label="Envoyer" />
            </form>
        </div>
    );
}
