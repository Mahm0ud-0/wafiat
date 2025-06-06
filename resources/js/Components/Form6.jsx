import React, { useContext } from "react";
import Naweh from "./Naweh";
import StepContext from "../stepContext";
import Row from "./Row";

const Form6 = ({ data, processing }) => {
    const { step, prevStep } = useContext(StepContext);

    return (
        <>
            <p className="text-center text-primary/90 sm:w-2/3 mx-auto">
                الرجاء التأكد من صحة المعلومات التي أدخلتها قبل الإرسال
            </p>
            <Naweh data={data} />
            <p className="text-center sm:text-lg text-primary/90 sm:w-2/3 mx-auto">
                عند الضغط على إرسال، تعتبر مسؤولاً عن
                <span className="font-bold text-primary/100"> صحة ودقة </span>
                جميع المعلومات التي أدخلتها
            </p>

            {/* buttons */}
            <Row className="!justify-end mt-16">
                <button
                    className={`btn-ghost ${
                        step > 1 ? "" : "opacity-0 !cursor-default"
                    }`}
                    onClick={prevStep}
                    type="button"
                >
                    السابق
                </button>
                <button className="" type="submit" disabled={processing}>
                    إرسـال
                </button>
            </Row>
        </>
    );
};

export default Form6;
