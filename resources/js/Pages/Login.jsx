import React, { useState } from "react";
import Input from "../Components/Input";
import Row from "../Components/Row";
import Header from "../Components/Header";
import { Link, useForm, usePage } from "@inertiajs/react";
import { baseURL } from "../helpers";

const Login = () => {
    const { data, setData, post, errors, setError, processing } = useForm({
        email: "",
        password: "",
    });

    const authError = usePage().props.errors.authErr;

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(baseURL + "/login", {
            onError: (errors) => console.error("Failed:", errors),
        });
    };

    return (
        <main className="pt-20 max-h-screen overflow-hidden">
            <Header />
            <div className="text-primary py-10 bg-[url(/resources/images/mosque.png)] min-h-screen bg-fixed bg-primary/10 bg-bottom">
                <form
                    onSubmit={submit}
                    className="bg-bg bg-[url(/resources/images/bg-shape.png)] sm:w-3/5 lg:w-2/5 mx-auto p-5 sm:p-10 rounded-lg space-y-4"
                >
                    <h1 className={"text-2xl md:text-3xl mb-10"}>
                        تسجيل الدخول
                    </h1>

                    <Row
                        className="flex-col items-start !gap-2"
                        error={authError}
                    >
                        <label htmlFor="email">البريد الالكتروني:</label>
                        <Input
                            haserror={authError}
                            id="email"
                            autoFocus
                            // haserror={errors.email}
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="johndoe@mail.com"
                        />
                    </Row>

                    <Row className="flex-col items-start !gap-2">
                        <label htmlFor="password">كلمة المرور :</label>
                        <Input
                            haserror={authError}
                            id="password"
                            // haserror={errors.email}
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="كلمة المرور"
                        />
                    </Row>

                    <Row className="!justify-between text-sm text-primary/70">
                        <p>ليس لديك حساب؟</p>
                        <Link
                            href={baseURL + "/register"}
                            className="hover:text-primary/100"
                        >
                            إنشاء حساب
                        </Link>
                    </Row>

                    <Row className="mt-10">
                        <button
                            className="!w-full"
                            type="submit"
                            disabled={processing}
                        >
                            تسجيل الدخول
                        </button>
                    </Row>
                </form>
            </div>
        </main>
    );
};

export default Login;
