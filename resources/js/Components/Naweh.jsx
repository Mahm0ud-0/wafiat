import { useEffect, useRef, useState } from "react";

const Naweh = ({ data, classname, width, height }) => {
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
    const day = dayNames[new Date(data.funiralDate).getDay()];

    const containerRef = useRef(null);
    const [fontSize, setFontSize] = useState(10); // font size for relatives starting with 12px font size

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                // formula: as the container gets taller, reduce font size.
                // here we set a minimum value of 10px.
                const newFontSize = Math.max(10, Math.abs(10 - height / 20));
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
            width={width ?? width}
            height={height ?? height}
            style={{ backgroundImage: `url(${data.template.path})` }}
            className={`bg-cover bg-center object-contain text-black px-7 py-14 mx-auto w-[440px] h-[566px] flex flex-col justify-between`}
        >
            {/* relatives section */}
            <div className="" ref={containerRef}>
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

            {/* TO DO:  */}
            {/* و عموم آل كذا و كذا */}
            <div className="pb-2">
                <h1 className="font-bold text-center">
                    وعموم آل {data.lastName}
                </h1>

                <h1 className="text-center text-2xs">
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
                    <h1 className="text-lg text-center font-bold my-2 mb-1">
                        {data.title || ""} {data.name} {data.fatherName || ""}{" "}
                        {data.lastName}
                    </h1>
                    <h2 className="text-center text-xs mb-2 font-semibold">
                        ( {data.surName} )
                    </h2>
                </div>

                {/* burial place */}
                <p className="text-center text-2xs">
                    و سيشيع جثمانه الطاهر {data.bodyPlace} و ذالك في يوم {day}{" "}
                    {data.funiralDate}
                    {"مـ "}
                    {/* {data.dateOfDeath2
        ? "و الموافق " + data.dateOfDeath2 + "هـ "
        : ""} */}
                    إلى {data.cemetery}
                </p>

                <h3 className="text-center text-2xs mx-auto border border-black rounded-xs w-fit my-2 py-2 px-6 font-bold">
                    {data.gender == "male"
                        ? "حــيــث يــوارى الــثــرى"
                        : data.gender == "female"
                        ? "حــيــث تــوارى الــثــرى"
                        : ""}
                </h3>

                {/* prayer */}
                <p className="mt-1 text-2xs flex gap-2">
                    <span className="font-bold text-nowrap">
                        الــصــلاة عــلــيـــه:{" "}
                    </span>
                    {data.prayer}
                </p>

                {/* condolences */}
                <p className="text-2xs flex gap-2">
                    <span className="font-bold text-nowrap">
                        الـتـعزيـة للـرجـال:{" "}
                    </span>
                    {data.menPlace}
                </p>

                {data.womenPlace && (
                    <p className="text-2xs flex gap-2">
                        <span className="font-bold text-nowrap">
                            الـتـعزيـة للـنـسـاء:{" "}
                        </span>
                        {data.womenPlace}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Naweh;
