import React, { useContext } from "react";
import Row from "./Row";
import Input from "./Input";
import StepContext from "../stepContext";
import DateInput from "./DateInput";

const Form3 = ({ data, setData, errors }) => {
    const { nextStep, prevStep } = useContext(StepContext);
    return (
        <div
            className="space-y-6"
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    nextStep();
                }
            }}
        >
            <Row
                error={errors.bodyPlace}
                example={
                    data.gender === "female"
                        ? "مثال: من منزلها الكائن في حي المرابط"
                        : data.gender === "male" &&
                          "مثال: من منزله الكائن في حي المرابط"
                }
            >
                <Input
                    autoFocus
                    haserror={errors.bodyPlace}
                    type="text"
                    name="bodyPlace"
                    value={data.bodyPlace}
                    onChange={(e) => setData("bodyPlace", e.target.value)}
                    placeholder={
                        data.gender === "female"
                            ? "من أين سيشيع جثمانها ؟ *"
                            : data.gender === "male" &&
                              "من أين سيشيع جثمانه ؟ *"
                    }
                />
            </Row>

            <Row className="justify-between items-start">
                <Row
                    className="w-full"
                    example="مثال: مقبرة الخضراء"
                    error={errors.cemetery}
                >
                    <Input
                        haserror={errors.cemetery}
                        type="text"
                        name="cemetery"
                        value={data.cemetery}
                        onChange={(e) => setData("cemetery", e.target.value)}
                        placeholder="المقبرة *"
                    />
                </Row>
                <Row className="w-full" error={errors.funiralDate}>
                    <DateInput
                        haserror={errors.funiralDate}
                        name="funiralDate"
                        value={data.funiralDate}
                        onChange={(date) => setData("funiralDate", date)}
                        placeholder="تاريخ التشييع *"
                    />
                </Row>
            </Row>

            <Row
                example="مثال: في مسجد محمد الحامد بعد صلاة الظهر"
                error={errors.prayer}
            >
                <Input
                    haserror={errors.prayer}
                    type="text"
                    name="prayer"
                    value={data.prayer}
                    onChange={(e) => setData("prayer", e.target.value)}
                    placeholder={"موعد و معلومات صلاة الجنازة *"}
                />
            </Row>

            <Row>
                <Input
                    type="text"
                    name="info"
                    value={data.info}
                    onChange={(e) => setData("info", e.target.value)}
                    placeholder={"معلومات إضافية في تذييل النعوة"}
                />
            </Row>

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

export default Form3;
