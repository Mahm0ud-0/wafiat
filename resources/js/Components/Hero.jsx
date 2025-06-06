import { baseURL } from "../helpers";
import { Link } from "@inertiajs/react";

const Hero = () => {
    return (
        <section className=" text-primary py-20 bg-bg bg-cover md:bg-bottom bg-[url(/resources/images/mosque.png),url(/resources/images/bg-shape.png)] !w-full">
            <div className="flex justify-between">
                <div className="flex flex-col space-y-10 justify-center items-center flex-1">
                    <h1 className="text-5xl md:text-8xl text-center">
                        <p className="text-lg mb-2">أهلاً بكم في تطبيق</p>
                        الـــوفـــيـــات
                    </h1>
                    <p className="md:text-lg">
                        نساعدك في كتابة النعوة و نشرها في دقائق
                    </p>
                    <div className="flex lg:w-1/4 space-x-4 justify-between ">
                        <Link className="btn-ghost flex-1">إنشاء حساب</Link>
                        <Link
                            className="btn flex-1"
                            href={baseURL + "/new-naweh"}
                        >
                            كتابة نعوة
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

// النعوة الالكترونية الإسلامية
// نساعدك في كتابة النعوة ونشرها في دقائق
