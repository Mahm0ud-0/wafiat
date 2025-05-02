import { Link } from "@inertiajs/react";
import logo from "../../images/logo.png";

const Header = () => {
    return (
        <header className="bg-bg text-primary h-20 py-2 fixed top-0 right-0 left-0">
            <div className="flex flex-row-reverse justify-between items-center h-full w-4/5 mx-auto">
                <nav className="flex space-x-10">
                    <Link className="hover:opacity-75">تسجيل الدخول</Link>
                    <Link className="hover:opacity-75">إنشاء حساب</Link>
                </nav>
                <div className="h-full flex">
                    <img src={logo} alt="نعوة" className="h-full" />
                </div>
            </div>
        </header>
    );
};

export default Header;
