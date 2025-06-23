import React, { useContext, useEffect, useState } from "react";
import Naweh from "./Naweh";
import StepContext from "../stepContext";
import Row from "./Row";
import { publicURL, dummyData } from "../helpers";
import { router, usePage } from "@inertiajs/react";
import { baseURL } from "../helpers";

const Form1 = ({ data, setData }) => {
    const { nextStep } = useContext(StepContext);

    const templates = usePage().props.templates;

    const [design, setDesign] = useState(
        templates.find((el) => el.path === data.template)?.id ?? templates[0].id
    );

    // Update design state when data.template changes (e.g., when loading a saved draft)
    useEffect(() => {
        setDesign(
            templates.find((tmplt) => tmplt.path === data.template)?.id ?? 1
        );
    }, [data.template]);

    // update data template when changed by user input
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
