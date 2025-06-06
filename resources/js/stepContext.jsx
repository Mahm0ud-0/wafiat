import { createContext, useCallback, useMemo, useState } from "react";
import { step1Schema, step2Schema, step3Schema } from "./validationSchema";

const StepContext = createContext();

export const StepProvider = ({ children, data, setError, clearErrors }) => {
    const [step, setStep] = useState(1);

    const validateStep = useCallback(() => {
        try {
            if (step === 1) {
                step1Schema.validateSync(data, { abortEarly: false });
            } else if (step === 2) {
                step2Schema.validateSync(data, { abortEarly: false });
            } else if (step === 3) {
                step3Schema.validateSync(data, { abortEarly: false });
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
    }, [step, data, setError]);

    const nextStep = useCallback(() => {
        clearErrors();
        const isValid = validateStep();
        if (isValid) {
            setStep((prev) => prev + 1);
            clearErrors();
        }
    }, [validateStep, clearErrors]);

    const prevStep = useCallback(() => {
        setStep((prev) => (prev > 1 ? prev - 1 : prev));
    }, []);

    const changeStep = useCallback(
        (newStep) => {
            clearErrors();
            if (newStep > step) {
                const isValid = validateStep();
                if (isValid) {
                    setStep(newStep);
                    clearErrors();
                }
            } else {
                setStep(newStep);
            }
        },
        [step, validateStep, clearErrors]
    );

    const contextValue = useMemo(
        () => ({
            step,
            nextStep,
            prevStep,
            changeStep,
        }),
        [step, nextStep, prevStep, changeStep]
    );

    return (
        <StepContext.Provider value={contextValue}>
            {children}
        </StepContext.Provider>
    );
};

export default StepContext;
