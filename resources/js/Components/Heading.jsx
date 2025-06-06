import React, { useContext } from "react";
import StepContext from "../stepContext";

const Heading = () => {
    const { step } = useContext(StepContext);

    const textArr = [
        "إنـشـاء نـعـوة لـفـقـيـدكـم",
        "إنـشـاء نـعـوة لـفـقـيـدكـم",
        "معلومات التعزية",
        "اختـيـار تـصـمـيـم الـنـعـوة",
        "معلومات أقـارب الـفـقـيـد",
        "إرسـال الـنـعـوة",
    ];

    return <h1 className={`text-2xl md:text-3xl mb-10 ${step === 5 && "mb-18"}`}>{textArr[step - 1]}</h1>;
};

export default Heading;
