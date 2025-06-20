import React, { useContext, useState } from "react";
import Row from "./Row";
import Input from "./Input";
import Hr from "./Hr";
import StepContext from "../stepContext";

const Form4 = ({ data, setData, errors }) => {
    const [menFold, setMenFold] = useState(false);
    const [womenFold, setWomenFold] = useState(true);

    const { nextStep, prevStep } = useContext(StepContext);
    return (
        <div
            className="space-y-10"
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    nextStep();
                }
            }}
        >
            {/* men condolences */}
            <div
                className={`flex flex-col gap-5 overflow-hidden ${
                    menFold ? "h-12" : "h-auto"
                }`}
            >
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => setMenFold((prev) => !prev)}
                >
                    <h1 className="text-xl">التعزية للرجال</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`cursor-pointer ${
                            menFold ? "-rotate-90" : "rotate-90"
                        }`}
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </div>
                <Row
                    example="مثال: صالة جامع محمد الحامد"
                    error={errors.menPlace}
                >
                    {/* place */}
                    <Input
                        autoFocus
                        haserror={errors.menPlace}
                        type="text"
                        name="menPlace"
                        placeholder="مكان التعزية"
                        value={data.menPlace}
                        onChange={(e) => setData("menPlace", e.target.value)}
                    />
                </Row>
                <Row
                    example="مثال: من الساعة 7:30 و حتى الساعة 10 مساءً"
                    error={errors.menTime}
                >
                    {/* time */}
                    <Input
                        haserror={errors.menTime}
                        type="text"
                        name="menTime"
                        placeholder="توقيت التعزية"
                        value={data.menTime}
                        onChange={(e) => setData("menTime", e.target.value)}
                    />
                </Row>
                <Row error={errors.menDate}>
                    {/* date */}
                    <Input
                        haserror={errors.menDate}
                        type="text"
                        name="menDate"
                        placeholder="تاريخ التعزية"
                        value={data.menDate}
                        onChange={(e) => setData("menDate", e.target.value)}
                        onFocus={(e) => {
                            e.target.type = "date";
                            e.currentTarget.showPicker();
                        }}
                        onClick={(e) => {
                            if (e.target.type !== "date")
                                e.target.type = "date";
                            e.currentTarget.showPicker();
                        }}
                        onBlur={(e) => {
                            e.target.type = "text";
                            e.target.value = data.dateOfDeath;
                        }}
                    />
                </Row>
                <Row error={errors.menNumOfDays}>
                    {/* # of days */}
                    <Input
                        haserror={errors.menNumOfDays}
                        type="number"
                        name="menNumOfDays"
                        placeholder="عدد الأيام"
                        value={data.menNumOfDays}
                        onChange={(e) =>
                            setData("menNumOfDays", e.target.value)
                        }
                    />
                </Row>
            </div>

            <Hr />

            {/* women condolences */}
            <div
                className={`flex flex-col gap-5 overflow-hidden ${
                    womenFold ? "h-12" : "h-auto"
                }`}
            >
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => setWomenFold((prev) => !prev)}
                >
                    <h1 className="text-xl">التعزية للنساء</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`cursor-pointer ${
                            womenFold ? "-rotate-90" : "rotate-90"
                        }`}
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </div>

                <Row
                    example="مثال: صالة جامع محمد الحامد"
                    error={errors.womenPlace}
                >
                    {/* place */}
                    <Input
                        haserror={errors.womenPlace}
                        type="text"
                        name="womenPlace"
                        placeholder="مكان التعزية"
                        value={data.womenPlace}
                        onChange={(e) =>
                            setData(
                                "womenPlace",
                                e.target.value ? e.target.value : null
                            )
                        }
                    />
                </Row>
                <Row
                    example="مثال: من الساعة 7:30 و حتى الساعة 10 مساءً"
                    error={errors.womenTime}
                >
                    {/* time */}
                    <Input
                        haserror={errors.womenTime}
                        type="text"
                        name="womenTime"
                        placeholder="توقيت التعزية"
                        value={data.womenTime}
                        onChange={(e) =>
                            setData(
                                "womenTime",
                                e.target.value ? e.target.value : null
                            )
                        }
                    />
                </Row>
                <Row error={errors.womenDate}>
                    {/* date */}
                    <Input
                        haserror={errors.womenDate}
                        type="text"
                        name="womenDate"
                        placeholder="تاريخ التعزية"
                        value={data.womenDate}
                        onChange={(e) =>
                            setData(
                                "womenDate",
                                e.target.value ? e.target.value : null
                            )
                        }
                        onFocus={(e) => {
                            e.target.type = "date";
                            e.currentTarget.showPicker();
                        }}
                        onClick={(e) => {
                            if (e.target.type !== "date")
                                e.target.type = "date";
                            e.currentTarget.showPicker();
                        }}
                        onBlur={(e) => {
                            e.target.type = "text";
                            e.target.value = data.dateOfDeath;
                        }}
                    />
                </Row>
                <Row error={errors.womenNumOfDays}>
                    {/* # of days */}
                    <Input
                        haserror={errors.womenNumOfDays}
                        type="number"
                        name="womenNumOfDays"
                        placeholder="عدد الأيام"
                        value={data.womenNumOfDays}
                        onChange={(e) => {
                            setData(
                                "womenNumOfDays",
                                e.target.value ? e.target.value : null
                            );
                        }}
                    />
                </Row>
            </div>

            {/* buttons */}
            <Row className="!justify-end mt-16">
                <button
                    className={`btn-ghost `}
                    onClick={prevStep}
                    type="button"
                >
                    السابق
                </button>

                <button
                    className=" !bg-primary !border-primary text-bg"
                    onClick={nextStep}
                    type="button"
                >
                    التالي
                </button>
            </Row>
        </div>
    );
};

export default Form4;
