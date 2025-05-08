import Row from "./Row";
import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import { relSchema } from "../validationSchema";
import delete_icon from "../../images/delete.svg";
import up from "../../images/arrow_up.svg";
import down from "../../images/arrow_down.svg";
import plus from "../../images/plus.svg";

const AddRelativeForm = ({
    open,
    setOpen,
    data,
    setData,
    relations,
    setRelations,
    setError,
    newRelative,
    setNewRelative,
}) => {
    const relNameRef = useRef(null);
    const relationRef = useRef(null);

    const deleteRelation = (rel) => {
        // check if relation is in the array and if so get its index
        const index = relations.indexOf(rel);
        relations.splice(index, 1);
        const newRelatives = data.relatives.filter((el) => el.relation !== rel);
        setData("relatives", newRelatives);
        // setOpen(false);
    };

    const addRelative = () => {
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
        [data.relatives[index1], data.relatives[index2]] = [
            data.relatives[index2],
            data.relatives[index1],
        ];

        setData("relatives", data.relatives);
    };

    const moveUp = (index1, index2) => {
        [data.relatives[index1], data.relatives[index2]] = [
            data.relatives[index2],
            data.relatives[index1],
        ];

        setData("relatives", data.relatives);
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
        }, 160);
    }, [open]);

    return (
        <div
            className="w-11/12 mx-auto space-y-2"
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    addRelative();
                } else if (event.key === "Escape") {
                    setOpen(false);
                }
            }}
        >
            {/* Relation Input Row */}
            <Row className="mb-6">
                <Input
                    ref={relationRef}
                    autoFocus
                    name="relation"
                    value={newRelative.relation}
                    onChange={(e) =>
                        setNewRelative((prev) => ({
                            ...prev,
                            relation: e.target.value,
                        }))
                    }
                    placeholder="صلة القرابة (مثال: أبناء)"
                    className="placeholder:text-center text-center"
                />
                <button
                    className={`disabled:opacity-50 disabled:hover:!brightness-100 disabled:!cursor-default !w-auto`}
                    disabled={!newRelative.relation || !open}
                    type="button"
                    onClick={() => deleteRelation(newRelative.relation)}
                >
                    <img src={delete_icon} alt="" />
                </button>
            </Row>

            {/* Name Inputs Row */}
            <Row className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Input
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
                    <Input
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
                    <Input
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
                </div>

                {/* Add Relative Button */}
                <button
                    className="!p-4 !w-auto"
                    disabled={!open}
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
                    .filter(({ rel }) => rel.relation === newRelative.relation)
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
                                            let index2;
                                            try {
                                                index2 =
                                                    arr[index + 1]
                                                        ?.originalIndex;
                                                moveDown(originalIndex, index2);
                                            } catch (error) {}
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
                                            let index2;
                                            try {
                                                index2 =
                                                    arr[index - 1]
                                                        ?.originalIndex;
                                                moveUp(originalIndex, index2);
                                            } catch (error) {}
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
                                        onClick={() =>
                                            deleteRelative(originalIndex)
                                        }
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
