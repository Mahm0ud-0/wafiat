import { Link } from "@inertiajs/react";
import naweh from "../../images/naweh.png";
import icon1 from "../../images/icon1.svg";
import icon2 from "../../images/icon2.svg";
import icon3 from "../../images/icon3.svg";
import icon4 from "../../images/icon4.svg";
import { baseURL } from "../helpers";

const Details = () => {
    const features = [
        {
            icon: icon1,
            title: "الحد من استخدام الورق",
            text: "بدلاً من طباعة النعوات الورقية، يمكنك إنشاء و مشاركة النعوات الكترونياً بكل سهولة.",
        },
        {
            icon: icon2,
            title: "احترام القرآن الكريم",
            text: "تجنب رمي النعوات التي تحويآيات قرآنية، و ذلك بتحويلها إلى صيغة رقمية محترمة و آمنة.",
        },
        {
            icon: icon3,
            title: "سهولة الوصول و المشاركة",
            text: "مشاركة النعوة مع أقاربك و أصدقائك في أي مكان عبر وسائل التواصل الاجتماعي من خلال متصفحك.",
        },
        {
            icon: icon4,
            title: "تصاميم متنوعة و ملائمة",
            text: "اختر من بين تشكيلة من التصاميم التي تلائم الذوق الإسلامي.",
        },
    ];

    return (
        <section className="text-center bg-bg bg-[url(/resources/images/mosque.png)] !w-full bg-bottom bg-cover py-10">
            <div className="w-4/5 mx-auto space-y-10">
                {/* title */}
                <div className="space-y-4">
                    <h1 className="text-4xl">مع تطبيق الوفيات</h1>
                    <p className="text-lg">
                        نقدم حلاً مبتكراً و بيئياً لمشاركة التعازي:
                    </p>
                </div>
                <div className="flex items-center">
                    {/* cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 space-y-4 flex-1">
                        {features.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center space-y-4 p-4 px-4 bg-bg/40 border-primary/20 hover:bg-bg/80 hover:border-bg border aspect-square rounded-lg h-[300px] w-full"
                            >
                                <div className="w-1/2 flex justify-center pb-4 border-b-2 border-secondary">
                                    <img
                                        src={item.icon}
                                        alt="icon"
                                        className="w-24 aspect-auto"
                                    />
                                </div>
                                <h3 className="text-xl font-bold my-3">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-center mt-6">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 hidden lg:block">
                        <img
                            src={naweh}
                            alt=""
                            className="h-full object-cover"
                        />
                    </div>
                </div>

                {/* button */}
                <Link
                    className="inline-block btn"
                    href={baseURL + "/new-naweh"}
                >
                    كتابة نعوة
                </Link>
            </div>
        </section>
    );
};

export default Details;
