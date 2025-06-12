import { useContext, useEffect, useRef, useState } from "react";
import Row from "./Row";
import edit from "../../images/edit.svg";
import preveiw from "../../images/preview.svg";
import plus from "../../images/plus.svg";
import close_icon from "../../images/close.svg";
import Modal from "./Modal";
import Naweh from "./Naweh";
import AddRelativeForm from "./AddRelativeForm";
import StepContext from "../stepContext";

const Form5 = ({ data, setData }) => {
    const { nextStep, prevStep } = useContext(StepContext);

    // for the add relative modal
    const [open, setOpen] = useState(false);

    // for the preview modal
    const [preview, setPreveiw] = useState(false);

    // relation to display in form3
    const [relations, setRelations] = useState(
        data.gender == "female"
            ? ["زوج", "أبناء", "إخوة", "أحفاد"]
            : ["أبناء", "إخوة", "أحفاد"]
    );

    const [newRelative, setNewRelative] = useState({
        relName: "",
        relLastName: "",
        relSurName: "",
        relation: "",
    });

    // state to hold relation input value
    const [currentRelation, setCurrentRelation] = useState(
        newRelative.relation
    );

    const [addNew, setAddNew] = useState(false);

    const [error, setError] = useState({});

    const closeRelativeForm = () => {
        setOpen(false);
        setNewRelative({
            relName: "",
            relLastName: "",
            relSurName: "",
            relation: "",
        });
        setError({});
        setCurrentRelation("");
    };

    // update relations array when gender changes
    useEffect(() => {
        setRelations(
            data.gender == "female"
                ? ["زوج", "أبناء", "إخوة", "أحفاد"]
                : ["أبناء", "إخوة", "أحفاد"]
        );
    }, [data.gender]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeRelativeForm();
                setPreveiw(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            {/* top buttons */}
            <div className="absolute top-16 sm:top-10 left-5 sm:left-10 flex justify-between gap-4">
                {/* preview button */}
                <button
                    title="معاينة"
                    type="button"
                    className="!w-10 h-10 !p-0 justify-center items-center flex !bg-primary !border-primary border"
                    onClick={() => setPreveiw(true)}
                >
                    <img src={preveiw} />
                </button>

                {/* add field button */}
                <button
                    title="إضافة"
                    onClick={() => {
                        setOpen(true);
                        setAddNew(true);
                        setCurrentRelation("");
                        setNewRelative({
                            relName: "",
                            relLastName: "",
                            relSurName: "",
                            relation: "",
                        });
                    }}
                    type="button"
                    className="!w-10 h-10 !p-0 justify-center items-center flex"
                >
                    <img src={plus} />
                </button>
            </div>

            {/* render relations fields */}
            <div className="md:w-3/4 mx-auto space-y-2">
                {relations.length ? (
                    relations.map((el) => (
                        <Row
                            className="py-4 !justify-between border-b border-primary/20"
                            key={el}
                        >
                            <h3 className="text-xl">
                                {el}
                                {data.gender === "female"
                                    ? " الفقيدة"
                                    : data.gender === "male" && " الفقيد"}
                            </h3>
                            <button
                                title="تعديل"
                                className="!p-2 !w-auto"
                                type="button"
                                onClick={() => {
                                    setNewRelative((prev) => ({
                                        ...prev,
                                        relation: el,
                                        relName: "",
                                        relSurName: "",
                                    }));
                                    setCurrentRelation(el);
                                    setOpen(true);
                                    setAddNew(false);
                                }}
                            >
                                <img src={edit} />
                            </button>
                        </Row>
                    ))
                ) : (
                    <h3 className="text-xl text-center my-32">
                        انقر على <span className="text-2xl">+</span> لإضافة
                        أقارب الفقيد !
                    </h3>
                )}
            </div>

            {/* add relative modal */}
            <Modal
                open={open}
                onClose={closeRelativeForm}
                className="w-full sm:w-[90%] h-full sm:h-auto lg:w-fit"
            >
                <AddRelativeForm
                    open={open}
                    setOpen={setOpen}
                    data={data}
                    setData={setData}
                    relations={relations}
                    setRelations={setRelations}
                    newRelative={newRelative}
                    setNewRelative={setNewRelative}
                    currentRelation={currentRelation}
                    setCurrentRelation={setCurrentRelation}
                    addNew={addNew}
                    error={error}
                    setError={setError}
                />
            </Modal>

            {/* preview modal */}
            <Modal
                open={preview}
                onClose={() => {
                    setPreveiw(false);
                }}
                onClick={() => setPreveiw(false)}
                className="w-full sm:w-[90%] h-full sm:h-auto max-w-[440px] !p-3 flex flex-col items-end gap-2"
            >
                <img
                    src={close_icon}
                    alt="close"
                    onClick={() => setPreveiw(false)}
                />
                <Naweh data={data} />
            </Modal>

            {/* buttons */}
            <Row className="!justify-end mt-16">
                <button
                    className={`btn-ghost !px-10`}
                    onClick={prevStep}
                    type="button"
                >
                    السابق
                </button>
                <button
                    className="!px-10 !bg-primary !border-primary text-bg"
                    onClick={nextStep}
                    type="button"
                >
                    التالي
                </button>
            </Row>
        </>
    );
};

export default Form5;
