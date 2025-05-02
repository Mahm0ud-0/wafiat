import React, { useContext } from "react";
import stepContext from "../stepContext";
import Naweh from "./Naweh";

const Form5 = ({ data, setData }) => {
    const { step } = useContext(stepContext);

    return (
        step === 5 && (
            <>
                <p className="text-center text-primary/90 w-2/3 mx-auto">
                    الرجاء التأكد من صحة المعلومات التي أدخلتها قبل الإرسال
                </p>
                <Naweh data={data} />
                <p className="text-center text-lg text-primary/90 w-2/3 mx-auto">
                    عند الضغط على إرسال، تعتبر مسؤولاً عن
                    <span className="font-bold text-primary/100">
                        {" "}
                        صحة ودقة{" "}
                    </span>
                    جميع المعلومات التي أدخلتها
                </p>
            </>
        )
    );
};

export default Form5;
