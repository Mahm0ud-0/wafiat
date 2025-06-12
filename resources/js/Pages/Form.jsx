import { Head, useForm } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Steps from "../Components/Steps";
import { StepProvider } from "../stepContext";
import Form1 from "../Components/Form1";
import Form2 from "../Components/Form2";
import Form3 from "../Components/Form3";
import Form4 from "../Components/Form4";
import Form5 from "../Components/Form5";
import Heading from "../Components/Heading";
import Success from "../Components/Success";
import ActiveStep from "../Components/ActiveStep";
import { baseURL } from "../helpers";

const Form = () => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
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
        menTime: "",
        menDate: "",
        menNumOfDays: null,
        womenPlace: null,
        womenTime: null,
        womenDate: null,
        womenNumOfDays: null,
        info: "",
        template: "",
        relatives: [],
        lastNames: [],
    });

    const [successful, setSuccessful] = useState(false);

    const submit = useCallback(
        (e) => {
            e.preventDefault();
            post(baseURL + "/new-naweh", {
                onSuccess: () => setSuccessful(true),
                onError: (errors) => console.error("Failed:", errors),
            });
        },
        [post]
    );

    useEffect(() => {
        if (data) setSuccessful(false);
    }, [data]);

    const stepContextProps = useMemo(
        () => ({
            setError,
            clearErrors,
            data,
        }),
        [setError, clearErrors, data]
    );

    return (
        <div className="text-primary py-10 space-y-10 bg-[url(/resources/images/mosque.png)] min-h-screen bg-fixed bg-primary/10 bg-bottom">
            <Head title="إنشاء نعوة"/>
            <StepProvider {...stepContextProps}>
                {successful ? (
                    <Success
                        data={data}
                        reset={reset}
                        setSuccessful={setSuccessful}
                    />
                ) : (
                    <form
                        className="bg-bg bg-[url(/resources/images/bg-shape.png)] sm:w-4/5 lg:w-1/2 mx-auto p-5 sm:p-10 rounded-lg space-y-6 relative"
                        onSubmit={submit}
                    >
                        <Heading />

                        {/* step indicator */}
                        <Steps />

                        {/* forms */}
                        <ActiveStep
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                            setError={setError}
                        />
                    </form>
                )}
            </StepProvider>
        </div>
    );
};

export default Form;
