import check from "../../images/check.svg";
import shape from "../../images/shape.svg";

const KeyFeatures = () => {
    const features = [
        "مجاني",
        "لا يحتاج إلى تنزيل",
        "لا يحتاج إلى تسجيل حساب",
        "يعمل من المتصفح مباشرة",
    ];

    return (
        <section className=" py-20 space-y-20 bg-[url(/resources/images/shape.svg)] bg-no-repeat bg-center bg-contain">
            <h1 className="text-4xl text-center">تطبيق الوفيات</h1>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
                {features.map((item) => (
                    <li
                        key={item}
                        className="flex flex-col justify-start items-center gap-y-4 text-sm md:text-lg flex-1 bg-bg/70 hover:bg-bg/95 text-center rounded-lg p-4 py-6"
                    >
                        <img src={check} alt="" className="w-8 h-8" />
                        <p className="text-sm md:text-[16px]">{item}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default KeyFeatures;
