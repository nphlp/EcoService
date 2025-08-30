"use client";

import { useState } from "react";
import Toggle from "../../../components/UI/toogle";

export default function Content() {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <>
            <div className="flex items-center justify-center gap-5">
                <div className="text-md font-semibold text-gray-500">Short text</div>
                <Toggle setValue={setToggle} value={toggle} config={{ height: 26, width: 52, padding: 3 }} />
                <div className="text-md font-semibold text-gray-500">Long text</div>
            </div>
            <div>{toggle ? Array.from({ length: 10 }).map((_, index) => <Text key={index} />) : <Text />}</div>
        </>
    );
}

const Text = () => {
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum consequuntur voluptas voluptate officia, in
            magni tenetur ad iste natus est nesciunt deleniti recusandae, laboriosam nobis minus nisi esse, accusamus
            ratione!
        </div>
    );
};
