import React, { Suspense, useContext } from "react";
import StepContext from "../stepContext";
const Form1 = React.lazy(() => import("./Form1"));
const Form2 = React.lazy(() => import("./Form2"));
const Form3 = React.lazy(() => import("./Form3"));
const Form4 = React.lazy(() => import("./Form4"));
const Form5 = React.lazy(() => import("./Form5"));
const Form6 = React.lazy(() => import("./Form6"));

const ActiveStep = ({
    data,
    setData,
    errors,
    processing,
    submit,
    setError,
}) => {
    const { step } = useContext(StepContext);

    const test = () => {
        switch (step) {
            case 1:
                return (
                    <Suspense
                        fallback={
                            <div className="h-64 flex justify-center items-center text-xl">
                                جارٍ التحميل ...
                            </div>
                        }
                    >
                        <Form1 data={data} setData={setData} errors={errors} />
                    </Suspense>
                );
            case 2:
                return (
                    <Suspense
                        fallback={
                            <div className="h-64 flex justify-center items-center text-xl">
                                جارٍ التحميل ...
                            </div>
                        }
                    >
                        <Form2 data={data} setData={setData} errors={errors} />
                    </Suspense>
                );
            case 3:
                return (
                    <Suspense
                        fallback={
                            <div className="h-64 flex justify-center items-center text-xl">
                                جارٍ التحميل ...
                            </div>
                        }
                    >
                        <Form3 data={data} setData={setData} errors={errors} />
                    </Suspense>
                );
            case 4:
                return (
                    <Suspense
                        fallback={
                            <div className="h-64 flex justify-center items-center text-xl">
                                جارٍ التحميل ...
                            </div>
                        }
                    >
                        <Form4
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                        />
                    </Suspense>
                );
            case 6:
                return (
                    <Suspense
                        fallback={
                            <div className="h-64 flex justify-center items-center text-xl">
                                جارٍ التحميل ...
                            </div>
                        }
                    >
                        <Form6 data={data} processing={processing} />
                    </Suspense>
                );
            default:
                return;
        }
    };

    return (
        <>
            {test()}
            {
                <div style={{ display: step === 5 ? "block" : "none" }}>
                    <Suspense
                        fallback={
                            <div className="h-64 flex justify-center items-center text-xl">
                                جارٍ التحميل ...
                            </div>
                        }
                    >
                        <Form5
                            data={data}
                            setData={setData}
                            setError={setError}
                        />
                    </Suspense>
                </div>
            }
        </>
    );
};

export default ActiveStep;
