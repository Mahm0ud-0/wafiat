import Row from "./Row";
import Input from "./Input";
import Hr from "./Hr";
import { useEffect, useRef, useState } from "react";
import { relSchema } from "../validationSchema";
import delete_icon from "../../images/delete.svg";
import up from "../../images/arrow_up.svg";
import down from "../../images/arrow_down.svg";
import plus from "../../images/plus.svg";
import edit from "../../images/edit.svg";
import tick from "../../images/tick.svg";
import close_icon from "../../images/close.svg";

const AddRelativeForm = ({
    open,
    setOpen,
    data,
    setData,
    relations,
    setRelations,
    newRelative,
    setNewRelative,
    currentRelation,
    setCurrentRelation,
    addNew,
    setAddNew,
    error,
    setError,
}) => {
    const relNameRef = useRef(null);
    const relationRef = useRef(null);
    const [editRelationName, setEditRelationName] = useState();

    const editRelation = () => {
        if (newRelative.relation === currentRelation) {
            setEditRelationName(false);
            return;
        }

        // insure that newRelation does not exist in relations array
        if (relations.includes(newRelative.relation)) {
            setError((prev) => ({
                ...prev,
                relation: "صلة القرابة موجودة مسبقاً",
            }));
            return;
        }

        data.relatives.map((relative) => {
            if (relative.relation === currentRelation) {
                relative.relation = newRelative.relation;
            }
            return relative;
        });

        setRelations((prevRelations) =>
            prevRelations.map((relation) =>
                relation === currentRelation ? newRelative.relation : relation
            )
        );

        setCurrentRelation(newRelative.relation);
        setEditRelationName(false);
    };

    const deleteRelation = (rel) => {
        if (
            !newRelative.relation ||
            !relations.includes(newRelative.relation) ||
            editRelationName
        ) {
            return;
        }

        // check if relation is in the array and if so get its index
        const index = relations.indexOf(rel);
        relations.splice(index, 1);
        const newRelatives = data.relatives.filter((el) => el.relation !== rel);
        setData("relatives", newRelatives);
        setOpen(false);
    };

    const addRelative = () => {
        if (newRelative.relation !== currentRelation || editRelationName) {
            return;
        }
        try {
            // Validate the `newRelative` object using Yup
            relSchema.validateSync(newRelative, { abortEarly: false }); // Validates all fields

            // If validation passes, proceed with adding the relative
            if (!relations.includes(newRelative.relation)) {
                setRelations([...relations, newRelative.relation]);
            }

            setNewRelative((prev) => ({
                // Reset name & surname, but keep relation & lastName
                ...prev,
                relName: "",
                relSurName: "",
            }));

            // prevent adding more then one husband
            if (
                newRelative.relation === "زوج" &&
                data.relatives.filter((el) => el.relation === "زوج").length ===
                    1
            ) {
                setError((prev) => ({
                    ...prev,
                    relName: "يمكن إضافة زوج واحد فقط",
                }));
                return;
            }

            setData("relatives", [...data.relatives, { ...newRelative }]);
            // Clear any existing validation errors after successful validation
            setError({});
            relNameRef.current?.focus();
        } catch (error) {
            // If validation fails, format and set errors using Yup validation result
            const formattedErrors = {};
            error.inner.forEach((err) => {
                formattedErrors[err.path] = err.message;
            });
            setError(formattedErrors);
        }
    };

    const deleteRelative = (index) => {
        let newArr = data.relatives;
        newArr.splice(index, 1);
        setData("relatives", newArr);
    };

    // functions for sorting & deleting relatives
    const moveDown = (index1, index2) => {
        try {
            [data.relatives[index1], data.relatives[index2]] = [
                data.relatives[index2],
                data.relatives[index1],
            ];

            setData("relatives", data.relatives);
        } catch (error) {
            console.log(error);
        }
    };

    const moveUp = (index1, index2) => {
        try {
            [data.relatives[index1], data.relatives[index2]] = [
                data.relatives[index2],
                data.relatives[index1],
            ];

            setData("relatives", data.relatives);
        } catch (error) {
            console.log(error);
        }
    };

    // auto focus on modal when opened
    useEffect(() => {
        setTimeout(() => {
            if (open) {
                if (newRelative.relation) {
                    relNameRef.current?.focus();
                } else {
                    relationRef.current?.focus();
                }
            }
        }, 100);
    }, [open]);

    // sync editRelationName state with addNew
    useEffect(() => {
        setEditRelationName(addNew);
    }, [addNew]);

    // add new lastName to the lastNames array
    useEffect(() => {
        setData("lastNames", [
            ...new Set([
                data.lastName,
                ...data.relatives.map((rel) => rel.relLastName),
            ]),
        ]);
    }, [data.relatives, data.lastName]);

    return (
        <div
            className="md:w-11/12 mx-auto space-y-2"
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    addRelative();
                }
            }}
        >
            {/* heading & buttons */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-lg sm:text-2xl text-center">
                    إضـافـة أقـارب
                </h1>
                <div className="flex gap-4 items-center">
                    {/* delete all button */}
                    <button
                        title="حذف الكل"
                        type="button"
                        disabled={
                            newRelative.relation !== currentRelation ||
                            !newRelative.relation ||
                            editRelationName
                        }
                        className="!w-7 h-7 !p-0 justify-center items-center flex disabled:!opacity-40 disabled:!cursor-auto"
                        onClick={() => deleteRelation(newRelative.relation)}
                    >
                        <img src={delete_icon} className="!w-4 !h-4" />
                    </button>

                    {/* close button */}
                    <img
                        src={close_icon}
                        alt="close"
                        title="close"
                        className="cursor-pointer w-7 h-7"
                        onClick={() => {
                            setOpen(false);
                            setNewRelative({
                                relName: "",
                                relLastName: "",
                                relSurName: "",
                                relation: "",
                            });
                            setError({});
                            setCurrentRelation("");
                        }}
                    />
                </div>
            </div>

            {/* Relation Input Row */}

            {addNew || editRelationName ? (
                <Row className="mb-6 flex items-start">
                    {/* relation input */}
                    <Row error={error.relation}>
                        <Input
                            haserror={error.relation}
                            ref={relationRef}
                            autoFocus
                            name="relation"
                            value={newRelative.relation}
                            onChange={(e) => {
                                if (addNew) {
                                    setCurrentRelation(e.target.value);
                                }
                                setNewRelative((prev) => ({
                                    ...prev,
                                    relation: e.target.value,
                                }));
                            }}
                            placeholder="صلة القرابة (مثال: أبناء)"
                            className="placeholder:text-center text-center"
                        />
                    </Row>

                    {/* save edit button */}
                    <button
                        className={`disabled:opacity-40 hover:!opacity-40 disabled:!cursor-default !w-auto !h-10 md:!h-14 !p-2 !aspect-square`}
                        disabled={!newRelative.relation}
                        type="button"
                        onClick={() => {
                            editRelation(newRelative.relation);
                            setAddNew(false)
                        }}
                    >
                        <img src={tick} alt="" className="" />
                    </button>
                </Row>
            ) : (
                <Row className="mb-6 !block">
                    <h1 className="sm:text-2xl justify-center flex gap-6 text-center">
                        {currentRelation}
                        {data.gender === "female"
                            ? " الفقيدة"
                            : data.gender === "male" && " الفقيد"}
                        <img
                            src={edit}
                            className="cursor-pointer"
                            onClick={() => setEditRelationName(true)}
                        />
                    </h1>
                    <Hr className="!w-full sm:!w-1/2 !my-4" />
                </Row>
            )}
            {/* Name Inputs Row */}
            <Row className="flex flex-col items-stretch sm:flex-row sm:items-start justify-between">
                <div className="flex justify-between items-start gap-2">
                    <Row error={error.relSurName}>
                        <Input
                            haserror={error.relSurName}
                            disabled={
                                newRelative.relation !== currentRelation ||
                                editRelationName
                            }
                            name="relSurName"
                            value={newRelative.relSurName}
                            onChange={(e) =>
                                setNewRelative({
                                    ...newRelative,
                                    relSurName: e.target.value,
                                })
                            }
                            placeholder="اللقب"
                            className="placeholder:text-center"
                        />
                    </Row>

                    <Row error={error.relName}>
                        <Input
                            haserror={error.relName}
                            disabled={
                                newRelative.relation !== currentRelation ||
                                editRelationName
                            }
                            name="relName"
                            value={newRelative.relName}
                            onChange={(e) =>
                                setNewRelative({
                                    ...newRelative,
                                    relName: e.target.value,
                                })
                            }
                            placeholder="الاسم"
                            className="placeholder:text-center"
                            ref={relNameRef}
                            autoFocus
                        />
                    </Row>

                    <Row error={error.relLastName}>
                        <Input
                            haserror={error.relLastName}
                            disabled={
                                newRelative.relation !== currentRelation ||
                                editRelationName
                            }
                            name="relLastName"
                            value={newRelative.relLastName}
                            onChange={(e) =>
                                setNewRelative({
                                    ...newRelative,
                                    relLastName: e.target.value,
                                })
                            }
                            placeholder="الكنية"
                            className="placeholder:text-center"
                        />
                    </Row>
                </div>

                {/* Add Relative Button */}
                <button
                    disabled={
                        newRelative.relation !== currentRelation ||
                        editRelationName
                    }
                    className="!w-auto !h-10 md:!h-14 !aspect-square disabled:!opacity-40 disabled:!cursor-auto disabled:hover:!opacity-30 flex justify-center items-center"
                    type="button"
                    onClick={addRelative}
                >
                    <img src={plus} />
                </button>
            </Row>

            {/* Relative List */}
            <div className="max-h-96 overflow-auto mt-10">
                {data.relatives
                    .map((rel, originalIndex) => ({ rel, originalIndex }))
                    .filter(({ rel }) => rel.relation === currentRelation)
                    .map(({ rel, originalIndex }, index, arr) => (
                        <div
                            key={originalIndex}
                            className="border-b border-primary/30"
                        >
                            <Row className="py-3 !justify-between !items-center w-full border-t border-primary/30">
                                <p>
                                    {rel.relSurName} {rel.relName}{" "}
                                    {rel.relLastName}
                                </p>

                                {/* buttons */}
                                <div className="space-x-2 flex items-center">
                                    {/* Move Down */}
                                    <button
                                        className="!w-8 !p-1"
                                        type="button"
                                        onClick={() => {
                                            if (arr[index + 1]) {
                                                let index2;
                                                index2 =
                                                    arr[index + 1]
                                                        ?.originalIndex;
                                                moveDown(originalIndex, index2);
                                            }
                                        }}
                                    >
                                        <img
                                            src={down}
                                            alt="↓"
                                            className="w-full"
                                        />
                                    </button>

                                    {/* Move Up */}
                                    <button
                                        className="!w-8 !p-1"
                                        type="button"
                                        onClick={() => {
                                            if (arr[index - 1]) {
                                                let index2;
                                                index2 =
                                                    arr[index - 1]
                                                        ?.originalIndex;
                                                moveUp(originalIndex, index2);
                                            }
                                        }}
                                    >
                                        <img
                                            src={up}
                                            alt="↑"
                                            className="w-full"
                                        />
                                    </button>

                                    {/* Delete Relative */}
                                    <button
                                        className="!w-8 !p-1.5"
                                        type="button"
                                        onClick={() => {
                                            deleteRelative(originalIndex);
                                        }}
                                    >
                                        <img
                                            src={delete_icon}
                                            alt="del"
                                            className="w-full"
                                        />
                                    </button>
                                </div>
                            </Row>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AddRelativeForm;
