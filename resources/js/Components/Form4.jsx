import { useContext, useRef, useState } from "react";
import Row from "./Row";
import edit from "../../images/edit.svg";
import preveiw from "../../images/preview.svg";
import plus from "../../images/plus.svg";
import Modal from "./Modal";
import Naweh from "./Naweh";
import AddRelativeForm from "./AddRelativeForm";
import StepContext from "../stepContext";

const Form4 = ({ data, setData, setError }) => {
    const { step, nextStep, prevStep } = useContext(StepContext);

    // for the add relative modal
    const [open, setOpen] = useState(false);

    // for the preview modal
    const [preview, setPreveiw] = useState(false);

    // relation to display in form3
    const [relations, setRelations] = useState(["أبناء", "إخوة", "أحفاد"]);

    const [newRelative, setNewRelative] = useState({
        relName: "",
        relLastName: "",
        relSurName: "",
        relation: "",
    });

    return (
        step === 4 && (
            <>
                {/* top buttons */}
                <div className="absolute top-10 left-10 flex justify-between gap-4">
                    {/* preview button */}
                    <button
                        title="معاينة"
                        type="button"
                        className="w-10 h-10 !p-0 justify-center items-center flex !bg-primary !border-primary border"
                        onClick={() => setPreveiw(true)}
                    >
                        <img src={preveiw} />
                    </button>

                    {/* add field button */}
                    <button
                        title="إضافة"
                        onClick={() => {
                            setOpen(true);
                        }}
                        type="button"
                        className="w-10 h-10 !p-0 justify-center items-center flex"
                    >
                        <img src={plus} />
                    </button>
                </div>

                {/* render relations fields */}
                <div className="w-3/4 mx-auto space-y-2">
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
                                    className="!p-2"
                                    type="button"
                                    onClick={() => {
                                        setNewRelative((prev) => ({
                                            ...prev,
                                            relation: el,
                                            relName: "",
                                            relSurName: "",
                                        }));
                                        setOpen(true);
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
                    onClose={() => {
                        setOpen(false);
                        setNewRelative({
                            relName: "",
                            relLastName: "",
                            relSurName: "",
                            relation: "",
                        });
                    }}
                >
                    <AddRelativeForm
                        open={open}
                        setOpen={setOpen}
                        data={data}
                        setData={setData}
                        setError={setError}
                        relations={relations}
                        setRelations={setRelations}
                        newRelative={newRelative}
                        setNewRelative={setNewRelative}
                    ></AddRelativeForm>
                </Modal>

                {/* preview modal */}
                <Modal
                    width={"auto"}
                    open={preview}
                    onClose={() => {
                        setPreveiw(false);
                    }}
                >
                    <Naweh data={data} template={data.template} />
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
                        onClick={() => nextStep()}
                        type="button"
                    >
                        التالي
                    </button>
                </Row>
            </>
        )
    );
};

export default Form4;
