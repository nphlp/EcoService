"use client";

import Select from "@comps/ui/select/select";
import { useState } from "react";

export default function Content() {
    const [toggle, setToggle] = useState<boolean>(true);

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Auto-Layout</h1>
                <Select
                    label="Toggle"
                    setSelected={(value) => setToggle(value === "true")}
                    selected={toggle.toString()}
                    options={[
                        { label: "Short text", slug: "true" },
                        { label: "Long text", slug: "false" },
                    ]}
                    canNotBeEmpty
                />
            </div>
            <div>{toggle ? <Text /> : Array.from({ length: 10 }).map((_, index) => <Text key={index} />)}</div>
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
