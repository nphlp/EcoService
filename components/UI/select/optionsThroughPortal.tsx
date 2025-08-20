import { PortalContext } from "@comps/CORE/portal/PortalContext";
import { useContext, useEffect } from "react";
import { Context } from "./context";
import Options from "./options";

const OptionsThroughPortal = () => {
    const selectContext = useContext(Context);
    const { isOpen: isSelectOpen, buttonRef, dropdownGap } = selectContext;

    const { setIsOpen, setBox, setContent } = useContext(PortalContext);

    const buttonRect = buttonRef.current?.getBoundingClientRect();

    const top = (buttonRect?.bottom ?? 0) + dropdownGap;
    const left = buttonRect?.left;
    const width = buttonRect?.width;

    useEffect(() => {
        if (isSelectOpen) {
            setIsOpen(true);
            setBox({ x: left, y: top, w: width });
            setContent(<Options {...selectContext} />);
        } else {
            setIsOpen(false);
            setBox({});
            setContent(null);
        }
    }, [isSelectOpen, selectContext, setIsOpen, setBox, setContent, left, top, width]);

    return <></>;
};

export default OptionsThroughPortal;
