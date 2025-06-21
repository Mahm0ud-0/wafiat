import React, { useContext, useEffect, useState } from "react";
import Naweh from "./Naweh";
import StepContext from "../stepContext";
import Row from "./Row";
import { publicURL, dummyData } from "../helpers";
import { router } from "@inertiajs/react";
import { baseURL } from "../helpers";

const Form1 = ({ data, setData }) => {
    const { nextStep } = useContext(StepContext);

    const templates = [
        {
            id: 1,
            title: "قالب 1",
            path: publicURL + "/storage/designs/Doc1.jpg",
        },
        {
            id: 2,
            title: "قالب 2",
            path: publicURL + "/storage/designs/Doc2.jpg",
        },
    ];

    const currentTemplate = templates.find(
        (el) => el.path === data.template
    )?.id;

    const [design, setDesign] = useState(currentTemplate ?? 1);

    useEffect(() => {
        setData("template", templates.find((tmplt) => tmplt.id == design).path);
        dummyData.template = templates.find((tmplt) => tmplt.id == design).path;
    }, [design]);

    return (
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
            <Naweh data={dummyData} />

            {/* buttons */}
            <Row className="!justify-between mt-16">
                <button
                    className={`btn-ghost`}
                    onClick={() => router.visit(baseURL + "/")}
                    type="button"
                >
                    الرئيسية
                </button>

                <button
                    className=" !bg-primary !border-primary text-bg"
                    onClick={() => nextStep()}
                    type="button"
                >
                    التالي
                </button>
            </Row>
        </>
    );
};

export default Form1;
