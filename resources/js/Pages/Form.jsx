import { useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import Row from "../Components/Row";
import Steps from "../Components/Steps";
import { StepProvider } from "../stepContext";
import Form1 from "../Components/Form1";
import Form2 from "../Components/Form2";
import Form3 from "../Components/Form3";
import Form4 from "../Components/Form4";
import Form5 from "../Components/Form5";
import Heading from "../Components/Heading";
import { step1Schema, step2Schema } from "../validationSchema";
import StepContext from "../stepContext";
import Success from "../Components/Success";

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
        womenPlace: "",
        info: "",
        template: "",
        relatives: [],
    });

    const { success } = usePage().props;

    const [successful, setSuccessful] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post("/new-naweh", {
            onSuccess: setSuccessful(true),
        });
        console.log(data);
    };
    

    useEffect(() => {
        setSuccessful(false); // Reset state when the component is mounted
    }, []);

    return (
        <div className="text-primary py-10 space-y-10 bg-[url(/resources/images/mosque.png)] min-h-screen bg-fixed bg-primary/10 bg-bottom">
            <StepProvider
                setError={setError}
                clearErrors={clearErrors}
                data={data}
                reset={reset}
            >
                {successful ? (
                    <Success data={data} />
                ) : (
                    <form
                        className="bg-bg bg-[url(/resources/images/bg-shape.png)] w-1/2 mx-auto  p-10 rounded-lg space-y-6 relative"
                        onSubmit={submit}
                    >
                        <Heading />
                        <Steps />

                        {/* forms */}
                        <Form1
                            data={data}
                            setData={setData}
                            errors={errors}
                            // onEnter={nextStep}
                        />
                        <Form2
                            data={data}
                            setData={setData}
                            errors={errors}
                            // onEnter={nextStep}
                        />
                        <Form3
                            data={data}
                            setData={setData}
                            errors={errors}
                            // onEnter={nextStep}
                        />
                        <Form4
                            data={data}
                            setData={setData}
                            setError={setError}
                            // onEnter={nextStep}
                        />
                        <Form5
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                        />
                    </form>
                )}
            </StepProvider>
        </div>
    );
};

export default Form;
