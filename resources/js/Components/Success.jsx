import { useContext, useRef } from "react";
import Naweh from "./Naweh";
import { toBlob, toCanvas } from "html-to-image";
import { Link, router } from "@inertiajs/react";
import StepContext from "../stepContext";
import { baseURL } from "../helpers";

const Success = ({ data, reset, setSuccessful }) => {
    const nawehRef = useRef(null);

    const { changeStep } = useContext(StepContext);

    const download = () => {
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
        router.visit(baseURL + "/").then(() => {
            reset();
        });
    };

    const newNaweh = () => {
        setSuccessful(false);
        changeStep(1);
        reset();
    };

    return (
        <div className="bg-bg bg-[url(/resources/images/bg-shape.png)] sm:w-4/5 xl:w-1/2 mx-auto flex flex-col p-5 md:p-10 rounded-lg space-y-6 relative">
            <h1 className="text-lg sm:text-3xl mb-10">تم إرسال النعوة بنجاح</h1>
                <div ref={nawehRef} className="w-full h-full">
                    <Naweh data={data} />
                </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
                <button onClick={backToHomePage} className="btn-ghost">
                    الرئيسية
                </button>
                <button onClick={newNaweh} className="btn-ghost text-sm">
                    إنشاء نعوة
                </button>
                <button
                    onClick={share}
                    className="!bg-primary text-bg !border-primary"
                >
                    مشاركة
                </button>
                <button onClick={download}>تحميل</button>
            </div>
        </div>
    );
};

export default Success;
