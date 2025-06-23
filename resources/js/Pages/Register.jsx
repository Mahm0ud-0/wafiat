import React, { useState } from "react";
import Input from "../Components/Input";
import Row from "../Components/Row";
import Header from "../Components/Header";
import { Link, useForm } from "@inertiajs/react";
import { baseURL } from "../helpers";

const Register = () => {
    const { data, setData, post, errors, setError, processing } = useForm({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(baseURL + "/register", {
            onError: (errors) => console.error("Failed:", errors),
        });
    };

    return (
        <main className="pt-14 max-h-screen overflow-hidden">
            <Header />
            <div className="text-primary py-10 bg-[url(/resources/images/mosque.png)] min-h-screen bg-fixed bg-primary/10 bg-bottom">
                <form
                    onSubmit={submit}
                    className="bg-bg bg-[url(/resources/images/bg-shape.png)] sm:w-3/5 lg:w-2/5 mx-auto p-5 sm:p-10 rounded-lg space-y-4"
                >
                    <h1 className={"text-2xl md:text-3xl mb-10"}>إنشاء حساب</h1>

                    <Row className="flex-col items-start !gap-2">
                        <label htmlFor="email">البريد الالكتروني:</label>
                        <Input
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

                    <Row className="flex-col items-start !gap-2">
                        <label htmlFor="confirmPassword">
                            تأكيد كلمة المرور :
                        </label>
                        <Input
                            id="confirmPassword"
                            // haserror={errors.email}
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={(e) =>
                                setData("confirmPassword", e.target.value)
                            }
                            placeholder="تأكيد كلمة المرور"
                        />
                    </Row>

                    <Row className="!justify-between text-sm text-primary/70">
                        <p>لديك حساب بالفعل؟</p>
                        <Link
                            href={baseURL + "/login"}
                            className="hover:text-primary/100"
                        >
                            تسجيل الدخول
                        </Link>
                    </Row>

                    <Row className="mt-10">
                        <button
                            className="!w-full"
                            type="submit"
                            disabled={processing}
                        >
                            إنشاء الحساب
                        </button>
                    </Row>
                </form>
            </div>
        </main>
    );
};

export default Register;
