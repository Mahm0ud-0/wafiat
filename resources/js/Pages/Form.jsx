import { Head, useForm, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Steps from "../Components/Steps";
import { StepProvider } from "../stepContext";
import Heading from "../Components/Heading";
import Success from "../Components/Success";
import ActiveStep from "../Components/ActiveStep";
import { baseURL } from "../helpers";
import Modal from "../Components/Modal";

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
        title: "",
        surName: "",
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
        menNumOfDays: "",
        womenPlace: "",
        womenTime: "",
        womenDate: "",
        womenNumOfDays: "",
        info: "",
        template: "",
        relatives: [],
        lastNames: [],
    });

    const pageErrs = usePage().props.errors;

    const [successful, setSuccessful] = useState(false);

    const [askToRestore, setAsktoRestore] = useState(
        Boolean(localStorage.getItem("localData"))
    );

    // Save the current form data to localStorage whenever it changes.
    useEffect(() => {
        if (hasData(data)) {
            localStorage.setItem("localData", JSON.stringify(data));
        }
    }, [data]);

    const loadLocalData = () => {
        const savedDraft = localStorage.getItem("localData");
        if (savedDraft) {
            try {
                setData(JSON.parse(savedDraft));
            } catch (err) {
                console.error("Failed to parse saved draft:", err);
            }
        }
    };
    const clearLocalData = () => {
        localStorage.removeItem("localData");
    };

    const submit = useCallback(
        (e) => {
            e.preventDefault();
            post(baseURL + "/new-naweh", {
                onSuccess: () => {
                    setSuccessful(true);
                    localStorage.removeItem("localData");
                },
                onError: (errors) => console.error("Failed:", errors),
            });
        },
        [post]
    );

    // Sync errors from page props to useForm
    // useEffect(() => {
    //     if (pageErrs) {
    //         setError(pageErrs);
    //     }
    // }, [pageErrs]);

    // Utility to check if any essential field has meaningful (non-empty) data.
    const hasData = (data) => {
        const essentialKeys = ["name", "fatherName", "dateOfDeath", "cemetery"];
        return essentialKeys.some((key) => {
            const value = data[key];
            return typeof value === "string"
                ? value.trim() !== ""
                : Boolean(value);
        });
    };

    const stepContextProps = useMemo(
        () => ({
            setError,
            clearErrors,
            data,
        }),
        [setError, clearErrors, data]
    );

    return (
        <div className="text-primary py-10 bg-[url(/resources/images/mosque.png)] min-h-screen bg-fixed bg-primary/10 bg-bottom">
            <Head title="إنشاء نعوة" />
            <Modal open={askToRestore} onClose={() => setAsktoRestore(false)}>
                <div className="flex flex-col justify-between gap-10 py-10 px-5">
                    <h1 className="text-xl">
                        هل تريد متابعة كتابة النعوة السابقة؟
                    </h1>
                    <div className="flex gap-6">
                        <button
                            className="btn-ghost"
                            onClick={() => {
                                setAsktoRestore(false);
                                clearLocalData();
                            }}
                        >
                            لا
                        </button>
                        <button
                            onClick={() => {
                                setAsktoRestore(false);
                                loadLocalData();
                            }}
                        >
                            نعم
                        </button>
                    </div>
                </div>
            </Modal>
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
