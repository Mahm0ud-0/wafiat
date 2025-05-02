import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Row from "../Components/Row";
import Steps from "../Components/Steps";
import stepContext from "../stepContext";
import Form1 from "../Components/Form1";
import Form2 from "../Components/Form2";
import Form3 from "../Components/Form3";
import Form4 from "../Components/Form4";
import Form5 from "../Components/Form5";
import Heading from "../Components/Heading";
import { step1Schema, step2Schema } from "../validationSchema";

const Form = () => {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm({
            gender: "male",
            name: "",
            fatherName: "",
            lastName: "",
            title: null,
            surName: null,
            dateOfDeath: "",
            dateOfDeath2: "",
            age: "",
            bodyPlace: "",
            cemetery: "",
            funiralDate: "",
            prayer: "",
            menPlace: "",
            womenPlace: "",
            info: "",
            template: "",
            relatives: [],
        });

    const submit = (e) => {
        e.preventDefault();
        alert("submit");
        // post("/new-naweh");
        console.log(data);
    };

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

    const [step, setStep] = useState(1);

    const nextStep = () => {
        clearErrors();
        const isValid = validateStep();
        if (isValid) {
            setStep((prev) => prev + 1);
            setError({}); // Clear previous errors
        }
    };

    function prevStep() {
        setError({}); // Clear previous errors
        step > 1 ? setStep((prev) => prev - 1) : null;
    }

    function changeStep(s) {
        clearErrors();
        const isValid = validateStep();
        if (isValid) {
            setStep(s);
            setError({}); // Clear previous errors
        }
    }

    // when "Enter" is pressed next step will be called unless it's the last step then form will be submitted
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default form submission
                if (step < 5) {
                    nextStep(); // Call function to move to the next step
                } else {
                    alert("submit");
                    console.log(data);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [nextStep]);

    return (
        <div className="text-primary py-10 space-y-10 bg-[url(/resources/images/mosque.png)] min-h-screen bg-fixed bg-primary/10 bg-bottom">
            <stepContext.Provider
                value={{ step, nextStep, prevStep, changeStep }}
            >
                <form
                    className="bg-bg bg-[url(/resources/images/bg-shape.png)] w-1/2 mx-auto  p-10 rounded-lg space-y-6 relative"
                    onSubmit={submit}
                >
                    <Heading />
                    <Steps />

                    {/* forms */}
                    <Form1 data={data} setData={setData} errors={errors} />
                    <Form2 data={data} setData={setData} errors={errors} />
                    <Form3 data={data} setData={setData} errors={errors} />
                    <Form4 data={data} setData={setData} setError={setError} />
                    <Form5 data={data} setData={setData} errors={errors} />

                    {/* buttons */}
                    <Row className="!justify-end mt-16">
                        {
                            <button
                                className={`btn-ghost !px-10 ${
                                    step > 1 ? "" : "opacity-0 !cursor-default"
                                }`}
                                onClick={prevStep}
                                type="button"
                                hidden={step <= 1}
                            >
                                السابق
                            </button>
                        }
                        {step < 5 && (
                            <button
                                className="!px-10 !bg-primary !border-primary text-bg"
                                onClick={() => nextStep()}
                                type="button"
                            >
                                التالي
                            </button>
                        )}
                        {step === 5 && (
                            <button
                                className="!px-10 "
                                type="submit"
                                disabled={processing}
                            >
                                إرسـال
                            </button>
                        )}
                    </Row>
                </form>
            </stepContext.Provider>
        </div>
    );
};

export default Form;
