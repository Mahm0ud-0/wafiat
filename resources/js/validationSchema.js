import * as Yup from "yup";

const step1Schema = Yup.object().shape({
    name: Yup.string()
        .min(2, "يجب أن يحتوي الاسم على 2 حرف على الأقل")
        .max(25, "يجب ألا يزيد الاسم عن 25 حرفًا")
        .required("هذا الحقل مطلوب"),

    fatherName: Yup.string()
        .min(2, "يجب أن يحتوي اسم الأب على 2 حرف على الأقل")
        .max(25, "يجب ألا يزيد اسم الأب عن 25 حرفًا")
        .required("هذا الحقل مطلوب"),

    lastName: Yup.string()
        .min(2, "يجب أن يحتوي اسم العائلة على 2 حرف على الأقل")
        .max(25, "يجب ألا يزيد اسم العائلة عن 25 حرفًا")
        .required("هذا الحقل مطلوب"),

    surName: Yup.string()
        .nullable()
        .optional()
        .notRequired()
        .min(2, "يجب أن يحتوي اللقب على 2 حرف على الأقل")
        .max(25, "يجب ألا يزيد اللقب عن 25 حرفًا"),

    title: Yup.string()
        .nullable()
        .optional()
        .notRequired()
        .min(2, "يجب أن يحتوي اللقب أو العنوان على 2 حرف على الأقل")
        .max(25, "يجب ألا يزيد اللقب أو العنوان عن 25 حرفًا"),
    dateOfDeath: Yup.date()
        .typeError("يجب أن يكون تاريخ الوفاة تاريخًا صحيحًا")
        .required("هذا الحقل مطلوب"),
    // .min(new Date(), "يجب أن يكون تاريخ الوفاة في المستقبل"), // Ensures it's not in the future

    age: Yup.number()
        .required("هذا الحقل مطلوب")
        .typeError("يجب أن يكون العمر رقمًا")
        .integer("يجب أن يكون العمر عددًا صحيحًا")
        .positive("يجب أن يكون العمر عددًا موجبًا")
        .nullable() // Allows it to be optional
        .test("optional-age", "يجب أن يكون العمر رقمًا", (value) => {
            if (!value) return true; // Skip validation if field is empty
            return (
                typeof value === "number" &&
                value > 0 &&
                Number.isInteger(value)
            ); // Apply validation if field has value
        }),
});

const step2Schema = Yup.object().shape({
    bodyPlace: Yup.string().required("هذا الحقل مطلوب"),

    cemetery: Yup.string().required("هذا الحقل مطلوب"),

    funiralDate: Yup.date()
        .typeError("يجب أن يكون تاريخ الجنازة تاريخًا صحيحًا")
        .required("هذا الحقل مطلوب"),
    // .max(new Date(), "يجب ألا يكون التاريخ في المستقبل"),

    prayer: Yup.string().required("هذا الحقل مطلوب"),
});

const step3Schema = Yup.object().shape({
    // men
    menPlace: Yup.string()
        .min(15, "يجب أن يكون مكان التعزية 15 حرفاً على الأقل")
        .required("هذا الحقل مطلوب"),
    menTime: Yup.string()
        .min(20, "يجب أن يكون مكان التعزية 20 حرفاً على الأقل")
        .required("هذا الحقل مطلوب"),
    menDate: Yup.date()
        .typeError("يجب أن يكون تاريخ الجنازة تاريخًا صحيحًا")
        .required("هذا الحقل مطلوب"),
    menNumOfDays: Yup.number()
        .required("هذا الحقل مطلوب")
        .max(4)
        .typeError("يجب أن يكون العمر رقمًا")
        .integer("يجب أن يكون العمر عددًا صحيحًا")
        .positive("يجب أن يكون العمر عددًا موجبًا"),

    // women
    womenPlace: Yup.string()
        .nullable()
        .optional()
        .notRequired()
        .min(15, "يجب أن يكون مكان التعزية 15 حرفاً على الأقل"),
    womenTime: Yup.string()
        .nullable()
        .optional()
        .notRequired()
        .min(20, "يجب أن يكون مكان التعزية 20 حرفاً على الأقل"),
    womenDate: Yup.date()
        .typeError("يجب أن يكون تاريخ الجنازة تاريخًا صحيحًا")
        .nullable()
        .optional()
        .notRequired(),
    womenNumOfDays: Yup.number()
        .nullable()
        .optional()
        .notRequired()
        .max(4)
        .typeError("يجب أن يكون رقمًا")
        .integer("يجب أن يكون العمر عددًا صحيحًا")
        .positive("يجب أن يكون العمر عددًا موجبًا"),
});

const relSchema = Yup.object().shape({
    relName: Yup.string()
        .min(2, "يجب أن يحتوي الاسم على حرفين على الأقل")
        .max(25, "يجب ألا يزيد الاسم عن 25 حرفًا")
        .required("هذا الحقل مطلوب"),

    relLastName: Yup.string()
        .min(2, "يجب أن يحتوي اسم العائلة على حرفين على الأقل")
        .max(25, "يجب ألا يزيد اسم العائلة عن 25 حرفًا")
        .required("هذا الحقل مطلوب"),

    relSurName: Yup.string()
        .notRequired() // Makes it optional
        .test(
            "optional-surName",
            "يجب أن يحتوي اللقب على حرفين على الأقل",
            (value) => {
                if (!value) return true; // Skip validation if field is empty
                return value.length >= 2 && value.length <= 10; // Apply validation if field has value between 2 & 10 chars
            }
        ),

    relation: Yup.string()
        .min(2, "يجب أن تحتوي العلاقة على حرفين على الأقل")
        .max(20, "يجب ألا تزيد العلاقة عن 10 أحرف")
        .required("هذا الحقل مطلوب"),
});

export { step1Schema, step2Schema, step3Schema, relSchema };
