import React, { useContext } from "react";
import StepContext from "../stepContext";

const Steps = () => {
    const activeStep = useContext(StepContext);
    const steps = [1, 2, 3, 4, 5];
    return (
        <div className="relative w-1/2 mx-auto mb-10">
            <div className="flex justify-between relative z-10">
                {steps.map((step) => (
                    <div
                        key={step}
                        className={`cursor-pointer hover:brightness-70 ${
                            activeStep.step < step
                                ? "step-ghost"
                                : "step-filled"
                        }`}
                        onClick={() => {
                            activeStep.step > step ||
                            activeStep.step === step - 1
                                ? activeStep.changeStep(step)
                                : null;
                        }}
                    >
                        {step}
                    </div>
                ))}
            </div>
            <hr className="absolute top-1/2 right-0 w-full z-0" />
        </div>
    );
};

export default Steps;
