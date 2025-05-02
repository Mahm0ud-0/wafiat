import React, { useContext, useEffect, useState } from "react";
import stepContext from "../stepContext";
import Naweh from "./Naweh";

const Form3 = ({ data, setData }) => {
    const { step } = useContext(stepContext);

    const templates = [
        {
            id: 1,
            title: "قالب 1",
            path: "/storage/designs/Doc1.jpg",
        },
        {
            id: 2,
            title: "قالب 2",
            path: "/storage/designs/Doc2.jpg",
        },
    ];

    const [design, setDesign] = useState(1);

    useEffect(() => {
        setData(
            "template",
            templates.find((tmplt) => tmplt.id == design)
        );
    }, [design]);

    return (
        step === 3 && (
            <>
                <div className="w-full flex justify-start gap-4">
                    {templates.map((el) => (
                        // ? "bg-primary/100 text-bg"
                        // : "hover:bg-primary/10 text-primary/50"
                        <label
                            htmlFor={el.id}
                            className={`bg-bg p-3 rounded-lg cursor-pointer ${
                                design == el.id
                                    ? "bg-primary/100 text-bg"
                                    : "hover:bg-primary/10 text-primary/50"
                            }`}
                        >
                            <input
                                type="radio"
                                id={el.id}
                                name="design"
                                value={el.id}
                                onChange={(e) => {
                                    setDesign(e.target.value);
                                }}
                                checked={el.id == design}
                                hidden
                            />
                            {el.title}
                        </label>
                    ))}
                </div>
                <Naweh data={data} />
            </>
        )
    );
};

export default Form3;
