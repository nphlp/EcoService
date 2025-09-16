import { combo } from "@lib/combo";
import { useContext } from "react";
import { Context } from "./context";
import { theme } from "./theme";

const Label = () => {
    const { variant, className, label } = useContext(Context);

    return <div className={combo(theme[variant].label, className?.label)}>{label}</div>;
};

export default Label;
