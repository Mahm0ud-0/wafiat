import React, { useMemo } from "react";

export const baseURL = "/project/public";
export const publicURL = "/project/public";

export let dummyData = {
    gender: "male",
    name: "فلان",
    fatherName: "علان",
    lastName: "الفلاني",
    title: "الحاج",
    surName: "أبو علان",
    dateOfDeath: "12-12-2012",
    dateOfDeath2: "28-1-1434",
    age: "87",
    bodyPlace: "من منزله الكائن في حي المرابط",
    cemetery: "مقبرة الخضراء",
    funiralDate: "13-12-2012",
    prayer: "في مسجد محمد الحامد بعد صلاة الظهر",
    menPlace: "في صالة مسجد السلام",
    menTime: "من الساعة 7:30 و حتى الساعة 10 مساءً",
    menDate: "13-12-2012",
    menNumOfDays: 3,
    womenPlace: "منزل الفقيد",
    womenTime: "من الساعة 12:30 و حتى الساعة 2 ظهراً",
    womenDate: "13-12-2012",
    womenNumOfDays: 2,
    info: "",
    template: publicURL + "/storage/designs/Doc1.jpg",
    relatives: [
        {
            relName: "فلان",
            relLastName: "الفلاني",
            relSurName: "المهندس",
            relation: "أبناء",
        },
        {
            relName: "علان",
            relLastName: "العلاني",
            relSurName: "الدكتور",
            relation: "أبناء عم",
        },
    ],
    lastNames: ["الفلاني", "العلاني"],
};

// function to check if any essential field has meaningful (non-empty) data.
export const hasData = (data) => {
    const essentialKeys = ["name", "fatherName", "dateOfDeath", "cemetery"];
    return essentialKeys.some((key) => {
        const value = data[key];
        return typeof value === "string" ? value.trim() !== "" : Boolean(value);
    });
};

// function to convert date to islamic (hijri) date
export const hijriDate = (date) => {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return "";
    }
    const hijriString = d.toLocaleDateString("en-u-ca-islamic", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
    });

    const [month, day, year] = hijriString
        .replace(/[^\d/]/g, "") // ensure only digits and slashes
        .split("/");

    return `${year}-${month}-${day}`; // return in YYYY-MM-DD format
};

// this function generates condolences string
export function generateDays(date, numOfDays) {
    const dayNames = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الاربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];

    const menDayIndex = new Date(date).getDay();

    // Determine prefix word
    let prefix = numOfDays == 1 ? "يوم" : numOfDays == 2 ? "يومي" : "أيام";

    // Generate the sequence of days
    const selectedDays = Array.from(
        { length: numOfDays },
        (_, i) => dayNames[(menDayIndex + i) % dayNames.length]
    ).join(" و ");

    return `${prefix} ${selectedDays}`;
}
