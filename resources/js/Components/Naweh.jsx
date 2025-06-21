import { useEffect, useRef, useState } from "react";
import { generateDays } from "../helpers";

const Naweh = ({ data }) => {
    // group relatives according to their last names
    const groupedRelatives = data.relatives.reduce((acc, relative) => {
        const { relation } = relative;
        if (!acc[relation]) {
            acc[relation] = []; // Initialize an array for each relation
        }
        acc[relation].push(relative); // Add the object to the array
        return acc;
    }, {});

    const dayNames = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الاربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];

    const funiralDay = dayNames[new Date(data.funiralDate).getDay()];

    const [menCondolencesDays, setMenCondolencesDays] = useState(
        generateDays(data.menDate, data.menNumOfDays)
    );

    const [womenCondolencesDays, setWomenCondolencesDays] = useState(
        generateDays(data.womenDate, data.womenNumOfDays)
    );

    // sync menCondolences with number of days
    useEffect(() => {
        setMenCondolencesDays(generateDays(data.menDate, data.menNumOfDays));
    }, [data.menDate, data.menNumOfDays]);

    // sync womenCondolences with number of days
    useEffect(() => {
        setWomenCondolencesDays(
            generateDays(data.womenDate, data.womenNumOfDays)
        );
    }, [data.womenDate, data.womenNumOfDays]);

    const containerRef = useRef(null);
    const [fontSize, setFontSize] = useState(10); // font size for relatives starting with 10px font size

    // observe the height of relatives div to set the fontsize
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                // formula: as the container gets taller, reduce font size.
                // here we set a minimum value of 10px.
                const newFontSize = Math.max(10, 10 - height / 40);
                setFontSize(newFontSize);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${data.template})`,
                containerType: "inline-size",
                fontSize: "clamp(8px, 3cqw, 14px)",
            }}
            className={`bg-cover bg-center object-contain text-black px-7 py-14 mx-auto w-full max-w-[440px] aspect-[210/297] flex flex-col justify-between`}
        >
            {/* relatives section */}
            <div className="min-h-1/3 md:pt-2" ref={containerRef}>
                {data.husband && data.gender === "female" && (
                    <p
                        style={{ fontSize: `${fontSize}px` }}
                        className="flex gap-2"
                    >
                        <span className="font-bold whitespace-nowrap">
                            {"زوج الفقيدة :"}
                        </span>
                        <p>{data.husband}</p>
                    </p>
                )}
                {Object.entries(groupedRelatives).map(([relation, rels]) => (
                    <div key={relation}>
                        <div
                            style={{ fontSize: `${fontSize}px` }}
                            className="flex gap-2"
                        >
                            <span className="font-bold whitespace-nowrap ">
                                {relation}{" "}
                                {data.gender === "female"
                                    ? " الفقيدة"
                                    : data.gender === "male" && " الفقيد"}
                                :{" "}
                            </span>
                            <p>
                                {rels.map((rel, index) => (
                                    <span key={index}>
                                        {rel.relSurName || ""} {rel.relName}
                                        {/* display the last name only if it doesn't match the next relative last name */}
                                        {rel?.relLastName !==
                                        rels[index + 1]?.relLastName
                                            ? " " + rel.relLastName
                                            : ""}
                                        {/* Add a separator except after the first and last object */}
                                        {index < rels.length - 1 &&
                                            rels.length > 1 &&
                                            " و "}{" "}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pb-2 flex flex-col justify-evenly gap-1">
                {/* و عموم آل كذا و كذا */}
                <h1 className="font-bold text-center text-[0.9em] my-1">
                    وعموم آل{" "}
                    {data.lastNames.map((el, index) => (
                        <span key={el}>
                            {el}
                            {index < data.lastNames.length - 1 &&
                                data.lastNames.length > 1 &&
                                " و "}{" "}
                        </span>
                    ))}
                </h1>

                <h1 className="text-center text-[0.8em]">
                    ينعون إليكم بمزيد من الرضى و التسليم وفاة
                    {data.gender == "male"
                        ? " فقيدهم المرحوم "
                        : data.gender == "female"
                        ? " فقيدتهم المرحومة "
                        : ""}
                    بإذن الله
                </h1>

                {/* name and surname */}
                <div>
                    <h1 className="text-[1em] text-center font-bold my-1">
                        {data.title || ""} {data.name} {data.fatherName || ""}{" "}
                        {data.lastName}
                    </h1>
                    {data.surName && (
                        <h2 className="text-center text-[0.75em] font-semibold">
                            ( {data.surName} )
                        </h2>
                    )}
                </div>

                {/* burial place */}
                <p className="text-center text-[0.7em]">
                    و سيشيع{" "}
                    {data.gender == "male"
                        ? "جثمانه"
                        : data.gender == "female"
                        ? "جثمانها"
                        : ""}{" "}
                    الطاهر {data.bodyPlace} و ذالك في يوم {funiralDay}{" "}
                    {data.funiralDate}
                    {"مـ "}
                    {data.dateOfDeath2
                        ? "و الموافق " + data.dateOfDeath2 + "هـ "
                        : ""}
                    إلى {data.cemetery}
                </p>

                <h3 className="text-center text-[0.7em] mx-auto border border-black rounded-xs w-fit py-1 px-4 font-bold">
                    {data.gender == "male"
                        ? "حــيــث يــوارى الــثــرى"
                        : data.gender == "female"
                        ? "حــيــث تــوارى الــثــرى"
                        : ""}
                </h3>

                {/* prayer */}
                <p className="mt-1 text-[0.75em] flex gap-2">
                    <span className="font-bold text-nowrap">
                        {data.gender == "male"
                            ? "الــصــلاة عــلــيـــه: "
                            : "الــصــلاة عــلــيـــها: "}
                    </span>
                    {data.prayer}
                </p>

                {/* condolences */}
                <p className="text-[0.75em] flex gap-2">
                    <span className="font-bold text-nowrap">
                        الـتـعزيـة للـرجـال:{" "}
                    </span>
                    في {data.menPlace} {menCondolencesDays} {data.menTime}
                </p>

                {data.womenPlace && (
                    <p className="text-[0.75em] flex gap-2">
                        <span className="font-bold text-nowrap">
                            الـتـعزيـة للـنـسـاء:{" "}
                        </span>
                        في {data.womenPlace} {womenCondolencesDays}{" "}
                        {data.womenTime}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Naweh;
