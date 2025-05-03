import React, { useContext, useEffect, useState } from "react";
import Naweh from "./Naweh";
import StepContext from "../stepContext";
import Row from "./Row";

const Form3 = ({ data, setData }) => {
    const { step, nextStep, prevStep } = useContext(StepContext);

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
                            key={el.id}
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

                {/* buttons */}
                <Row className="!justify-end mt-16">
                    <button
                        className={`btn-ghost !px-10 ${
                            step > 1 ? "" : "opacity-0 !cursor-default"
                        }`}
                        onClick={prevStep}
                        type="button"
                        hidden={step <= 1}
                    >
                        السابق
                    </button>
                    <button
                        className="!px-10 !bg-primary !border-primary text-bg"
                        onClick={() => nextStep()}
                        type="button"
                    >
                        التالي
                    </button>
                </Row>
            </>
        )
    );
};

export default Form3;
