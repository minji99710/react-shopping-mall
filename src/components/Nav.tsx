import { Link, NavLink } from "react-router-dom";
import "../index.css";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { SearchBar } from "./SearchBar";
import SwithTheme from "./SwithTheme";
import Footer from "./Footer";

const navigation = [
    { name: "패션", href: "/fashion", current: false },
    { name: "액세서리", href: "/accessories", current: false },
    { name: "디지털", href: "/digital", current: false },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export function Nav(props: any) {
    const { cartQuantity } = useShoppingCart();

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <section className="drawer-content flex flex-col h-screen justify-between">
                {/* Navbar */}
                <div className="fixed w-full navbar bg-base-300 bg-white z-10">
                    <div className="flex items-center w-full">
                        <label htmlFor="my-drawer" className="block md:hidden">
                            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                        </label>
                        <Link
                            to="/"
                            className="flex px-2 mx-2 font-bold text-lg md:flex-none flex-1 mx-1 sm:mx-2"
                        >
                            <span className="dark:text-white">React Shop</span>
                        </Link>
                        {/* 왼쪽 메뉴 목록 */}
                        <div className="flex-none hidden md:flex md:flex-1 ml-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900"
                                            : "hover:bg-gray-100",
                                        "text-black px-3 py-2 rounded-md text-sm font-medium dark:text-white"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        {/* 오른쪽 목록- Navbar menu content here */}
                        <div className="flex items-center">
                            {/* 다크 모드 */}
                            <SwithTheme />

                            {/* 검색 영역 */}
                            <SearchBar />

                            {/* 장바구니 */}
                            <div className="flex items-center ml-2 sm:ml-3 pr-3">
                                <NavLink
                                    key={"Cart"}
                                    to={"/cart"}
                                    className="relative"
                                >
                                    <ShoppingBagIcon
                                        className="h-6 w-6 text-black stroke-1.5 dark:text-white"
                                        aria-hidden="true"
                                    />
                                    <div
                                        className="w-5 h-4 bg-red-500 rounded-full flex justify-center items-center text-white absolute top-0 right-0 
                                    translate-x-1/4 -translate-y-1/4"
                                    >
                                        {cartQuantity}
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="main mt-14">{props.children}</section>
                <Footer />
            </section>

            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 bg-base-100">
                    {/*  Sidebar content here */}
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? "bg-gray-900"
                                    : "hover:bg-gray-100",
                                "text-black px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

{
}
