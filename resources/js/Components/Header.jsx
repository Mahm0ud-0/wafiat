import { Link, usePage } from "@inertiajs/react";
import logo from "../../images/logo.png";
import { baseURL } from "../helpers";

const Header = () => {
    const { auth } = usePage().props;
    return (
        <header className="bg-bg text-primary h-20 py-2 fixed top-0 right-0 left-0 z-10">
            <div className="flex flex-row-reverse justify-between items-center h-full w-11/12 md:w-4/5 mx-auto">
                <nav className="flex space-x-4 md:space-x-10 text-xs md:text-lg">
                    {auth ? (
                        <>
                            <Link href={""}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="hover:opacity-50"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                    <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
                                    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                                </svg>
                            </Link>
                            <Link
                                href={baseURL + "/logout"}
                                method="delete"
                                className="styless-btn"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                    <path d="M15 12h-12l3 -3" />
                                    <path d="M6 15l-3 -3" />
                                </svg>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className="hover:opacity-75"
                                href={baseURL + "/login"}
                            >
                                تسجيل الدخول
                            </Link>
                            <Link
                                className="hover:opacity-75"
                                href={baseURL + "/register"}
                            >
                                إنشاء حساب
                            </Link>
                        </>
                    )}
                </nav>
                <Link className="h-3/4 flex" href={baseURL + "/"}>
                    <img src={logo} alt="نعوة" className="h-full" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
