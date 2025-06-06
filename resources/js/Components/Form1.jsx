import React, { useContext } from "react";
import Row from "./Row";
import Input from "./Input";
import StepContext from "../stepContext";
import { router } from "@inertiajs/react";
import { baseURL } from "../helpers";

const Form1 = ({ data, setData, errors }) => {
    const { step, nextStep } = useContext(StepContext);

    const hijriDate = (date) => {
        const d = new Date(date);
        return d
            .toLocaleDateString("en-u-ca-islamic", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "-")
            .replace(/\s*AH\s*/, "");
    };

    return (
        <div
            className="space-y-2 sm:space-y-6"
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    nextStep();
                }
            }}
        >
            {/* gender */}
            <Row>
                <p className="w-3/4 mx-auto py-2 text-lg flex-1">
                    {data.gender === "female" && "الفقيدة:"}
                    {data.gender === "male" && "الفقيد:"}
                </p>
                <div className="flex justify-end w-full sm:flex-1">
                    <label htmlFor="male" className="w-1/3 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            onChange={(e) => setData("gender", e.target.value)}
                            checked={data.gender === "male"}
                            className="hidden"
                        />
                        <div
                            className={`px-2 py-2 bg-primary/5 rounded-r-lg text-center font-bold ${
                                data.gender === "male"
                                    ? "bg-primary/100 text-bg"
                                    : "hover:bg-primary/10 text-primary/50"
                            }`}
                        >
                            ذكـر
                        </div>
                    </label>
                    <label htmlFor="female" className="w-1/3 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            onChange={(e) => setData("gender", e.target.value)}
                            checked={data.gender === "female"}
                            className="hidden"
                        />
                        <div
                            className={`px-2 py-2 bg-primary/5 rounded-l-lg text-center font-bold ${
                                data.gender === "female"
                                    ? "bg-primary/100 text-bg"
                                    : "hover:bg-primary/10 text-primary/50"
                            }`}
                        >
                            أنـثـى
                        </div>
                    </label>
                </div>
            </Row>

            <Row className="justify-between items-start flex-col sm:flex-row">
                {/* first name */}
                <Row error={errors.name}>
                    <Input
                        autoFocus
                        haserror={errors.name}
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder={
                            data.gender === "female"
                                ? "اسم الفقيدة *"
                                : data.gender === "male" && "اسم الفقيد *"
                        }
                    />
                </Row>

                {/* father name */}
                <Row error={errors.fatherName}>
                    <Input
                        haserror={errors.fatherName}
                        type="text"
                        name="fatherName"
                        value={data.fatherName}
                        onChange={(e) => setData("fatherName", e.target.value)}
                        placeholder="اسم الأب *"
                    />
                </Row>
                {/* last name */}
                <Row error={errors.lastName}>
                    <Input
                        haserror={errors.lastName}
                        type="text"
                        name="lastName"
                        value={data.lastName}
                        onChange={(e) => setData("lastName", e.target.value)}
                        placeholder="الكنية *"
                    />
                </Row>
            </Row>

            <Row className="justify-between items-start flex-col sm:flex-row">
                <Row
                    error={errors.title}
                    className="w-full"
                    example={
                        data.gender === "female"
                            ? "مثال: الحاجة ، الدكتورة ..."
                            : data.gender === "male" &&
                              "مثال: الحاج ، الدكتور ..."
                    }
                >
                    <Input
                        haserror={errors.title}
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) =>
                            setData(
                                "title",
                                e.target.value ? e.target.value : null
                            )
                        }
                        placeholder={
                            data.gender === "female"
                                ? " صفة الفقيدة"
                                : data.gender === "male" && " صفة الفقيد"
                        }
                    />
                </Row>

                <Row
                    className="w-full"
                    error={errors.surName}
                    example={
                        data.gender === "female"
                            ? "مثال: أم فلان"
                            : data.gender === "male" && "مثال: أبو فلان"
                    }
                >
                    <Input
                        haserror={errors.surName}
                        type="text"
                        name="surName"
                        value={data.surName}
                        onChange={(e) => setData("surName", e.target.value)}
                        placeholder={
                            data.gender === "female"
                                ? "لقب الفقيدة"
                                : data.gender === "male" && "لقب الفقيد"
                        }
                    />
                </Row>
            </Row>

            <Row error={errors.dateOfDeath}>
                <Input
                    haserror={errors.dateOfDeath}
                    type="text"
                    name="dateOfDeath"
                    value={data.dateOfDeath}
                    onChange={(e) => {
                        setData("dateOfDeath", e.target.value);
                        setData("dateOfDeath2", hijriDate(e.target.value));
                    }}
                    placeholder="تاريخ الوفاة *"
                    onFocus={(e) => {
                        e.target.type = "date";
                        e.currentTarget.showPicker();
                    }}
                    onClick={(e) => {
                        if (e.target.type !== "date") e.target.type = "date";
                        e.currentTarget.showPicker();
                    }}
                    onBlur={(e) => {
                        e.target.type = "text";
                        e.target.value = data.dateOfDeath;
                    }}
                />
            </Row>

            <Row>
                <Input
                    disabled
                    type="text"
                    name="dateOfDeath2"
                    value={data.dateOfDeath2}
                    onChange={(e) => setData("dateOfDeath2", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    placeholder="تاريخ الوفاة الموافق هجري"
                />
            </Row>

            <Row error={errors.age}>
                <Input
                    haserror={errors.age}
                    type="number"
                    name="age"
                    value={data.age}
                    onChange={(e) => setData("age", e.target.value)}
                    placeholder="العمر"
                />
            </Row>

            {/* buttons */}
            <Row className="!justify-between mt-16">
                <button
                    className={`btn-ghost`}
                    onClick={() => router.visit(baseURL + "/")}
                    type="button"
                >
                    الرئيسية
                </button>

                <button
                    className=" !bg-primary !border-primary text-bg"
                    onClick={() => nextStep()}
                    type="button"
                >
                    التالي
                </button>
            </Row>
        </div>
    );
};

export default Form1;
