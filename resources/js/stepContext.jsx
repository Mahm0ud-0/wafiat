import { createContext, useState } from "react";
import { step1Schema, step2Schema } from "./validationSchema";

const StepContext = createContext();

export const StepProvider = ({
    children,
    data,
    setError,
    clearErrors,
    reset,
}) => {
    const [step, setStep] = useState(1);

    const validateStep = () => {
        try {
            if (step === 1) {
                step1Schema.validateSync(data, { abortEarly: false });
            } else if (step === 2) {
                step2Schema.validateSync(data, { abortEarly: false });
            }
            return true; // Validation passed
        } catch (validationError) {
            // Extract and set errors
            const formattedErrors = {};
            validationError.inner.forEach((err) => {
                formattedErrors[err.path] = err.message;
            });
            setError(formattedErrors); // Display errors
            return false; // Validation failed
        }
    };

    const nextStep = () => {
        clearErrors();
        const isValid = validateStep();
        if (isValid) {
            setStep((prev) => prev + 1);
            setError({}); // Clear previous errors
        }
    };

    const prevStep = () => {
        if (step > 1) setStep((prev) => prev - 1);
    };

    const changeStep = (newStep) => {
        setStep(newStep);
        clearErrors();
        reset();
    };

    return (
        <StepContext.Provider value={{ step, nextStep, prevStep, changeStep }}>
            {children}
        </StepContext.Provider>
    );
};

export default StepContext;
