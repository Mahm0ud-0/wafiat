import { useContext, useRef } from "react";
import Naweh from "./Naweh";
import { toBlob, toCanvas, toJpeg, toPng } from "html-to-image";
import { Link, router } from "@inertiajs/react";
import StepContext from "../stepContext";

const Success = ({ data }) => {
    const nawehRef = useRef(null);

    const { changeStep } = useContext(StepContext);

    const download = () => {
        if (nawehRef.current === null) {
            return;
        }

        document.fonts.ready.then(() => {
            toBlob(nawehRef.current, {
                cacheBust: true,
                pixelRatio: 5,
            }).then((blob) => {
                const link = document.createElement("a");
                link.download = "A4-image.png";
                link.href = URL.createObjectURL(blob);
                link.click();
            });
        });
    };

    const backToHomePage = () => {
        console.log("test");
        changeStep(1);
        router.visit("/");
    };

    const newNaweh = () => {
        changeStep(1);
        router.visit("/new-naweh");
    };

    return (
        <div className="bg-bg bg-[url(/resources/images/bg-shape.png)] w-1/2 mx-auto  p-10 rounded-lg space-y-6 relative">
            <h1 className="text-3xl mb-10">تم إرسال النعوة بنجاح</h1>
            <div ref={nawehRef}>
                <Naweh data={data} width={"100%"} height={"100%"} />
            </div>
            <div className="w-full flex justify-evenly">
                <button onClick={backToHomePage} className="btn-ghost">
                    الصفحة الرئيسية
                </button>
                <button onClick={newNaweh} className="btn-ghost">
                    إنشاء نعوة
                </button>
                <button className=" btn-ghost">مشاركة</button>
                <button className="" onClick={download}>
                    تحميل
                </button>
            </div>
        </div>
    );
};

export default Success;
