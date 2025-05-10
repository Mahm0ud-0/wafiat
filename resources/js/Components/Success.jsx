import { useContext, useRef } from "react";
import Naweh from "./Naweh";
import { toBlob, toCanvas } from "html-to-image";
import { Link, router } from "@inertiajs/react";
import StepContext from "../stepContext";

const Success = ({ data, reset, setSuccessful }) => {
    const nawehRef = useRef(null);

    const { changeStep } = useContext(StepContext);

    const download = () => {
        const element = document.getElementById("capture-area");
        if (!element) return;

        document.fonts.ready.then(() => {
            toCanvas(nawehRef.current, { cacheBust: true, pixelRatio: 8 }).then(
                (canvas) => {
                    const link = document.createElement("a");
                    link.download = "A4-image.png";
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                }
            );
        });
    };

    const share = () => {
        if (!nawehRef.current) {
            return;
        }

        if (navigator.canShare) {
            document.fonts.ready.then(() => {
                toBlob(nawehRef.current, {
                    cacheBust: true,
                    pixelRatio: 8,
                }).then((blob) => {
                    const file = new File([blob], "naweh.png", {
                        type: "image/png",
                    });

                    if (navigator.canShare({ files: [file] })) {
                        navigator
                            .share({
                                files: [file],
                                title: "تم إرسال النعوة بنجاح",
                                text: "شاهد هذه النعوة!",
                            })
                            .then(() =>
                                console.log("Image shared successfully")
                            )
                            .catch((error) =>
                                console.log("Error sharing:", error)
                            );
                    } else {
                        alert("المشاركة غير مدعومة على هذا الجهاز.");
                    }
                });
            });
        } else {
            alert("Web Share API لا يدعم مشاركة الملفات على هذا المتصفح.");
        }
    };

    const backToHomePage = () => {
        changeStep(1);
        router.visit("/");
        reset();
    };

    const newNaweh = () => {
        setSuccessful(false);
        changeStep(1);
        reset();
        // router.visit("/new-naweh");
    };

    return (
        <div className="bg-bg bg-[url(/resources/images/bg-shape.png)] w-1/2 mx-auto flex flex-col items-center p-10 rounded-lg space-y-6 relative">
            <h1 className="text-3xl mb-10">تم إرسال النعوة بنجاح</h1>
            <div
                id="capture-area"
                style={{
                    display: "inline-block",
                    width: "440px",
                    height: "566px",
                    background: "white",
                }}
            >
                <div ref={nawehRef} className="w-full h-full">
                    <Naweh data={data} />
                </div>
            </div>

            <div className="w-full flex justify-evenly">
                <button onClick={backToHomePage} className="btn-ghost">
                    الصفحة الرئيسية
                </button>
                <button onClick={newNaweh} className="btn-ghost">
                    إنشاء نعوة
                </button>
                <button className=" btn-ghost" onClick={share}>
                    مشاركة
                </button>
                <button className="" onClick={download}>
                    تحميل
                </button>
            </div>
        </div>
    );
};

export default Success;
