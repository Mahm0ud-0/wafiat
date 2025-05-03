import React, { useContext } from "react";
import StepContext from "../stepContext";

const Heading = () => {
    const { step } = useContext(StepContext);

    const textArr = [
        "إنـشـاء نـعـوة لـفـقـيـدكـم",
        "إنـشـاء نـعـوة لـفـقـيـدكـم",
        "اختـيـار تـصـمـيـم الـنـعـوة",
        "إدخـال معـلـومـات أقـارب الـفـقـيـد",
        "إرسـال الـنـعـوة",
    ];

    return <h1 className="text-3xl mb-10">{textArr[step - 1]}</h1>;
};

export default Heading;
