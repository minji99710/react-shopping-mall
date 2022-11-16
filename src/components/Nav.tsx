import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
    XMarkIcon,
    Bars3Icon,
    SunIcon,
    MoonIcon,
    ShoppingBagIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Home } from "../pages/Home";

const navigation = [
    { name: "패션", href: "/fashion", current: false },
    { name: "액세서리", href: "/accessories", current: false },
    { name: "디지털", href: "/digital", current: false },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export function Nav(props: any) {
    const [mode, setMode] = useState("dark");
    const [category, setCategory] = useState("Home");

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <section className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="fixed w-full navbar bg-base-300 z-10">
                    <div className="flex items-center w-full">
                        <label htmlFor="my-drawer" className="block md:hidden">
                            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                        </label>
                        <NavLink
                            to="/"
                            className="flex px-2 mx-2 font-bold md:flex-none flex-1 mx-1 sm:mx-2"
                        >
                            React Shop
                        </NavLink>
                        {/* 왼쪽 메뉴 목록 */}
                        <div className="flex-none hidden md:flex md:flex-1 ml-2">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900"
                                            : "hover:bg-gray-100",
                                        "text-black px-3 py-2 rounded-md text-sm font-medium"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                        {/* 오른쪽 목록- Navbar menu content here */}
                        <div className="flex items-center">
                            {/* 다크 모드 */}
                            <label className="swap swap-rotate mr-2 sm:mr-3">
                                <input type="checkbox" />
                                <svg
                                    className="swap-on fill-current w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                <svg
                                    className="swap-off fill-current w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>

                            {/* 검색 영역 */}
                            <div className="dropdown relative">
                                <input
                                    type="text"
                                    placeholder="검색"
                                    className="input w-full max-w-xs text-sm"
                                />
                                <ul className="absolute over-y"></ul>
                            </div>
                            {/* 장바구니 */}
                            <div className="flex items-center ml-2 sm:ml-3 pr-3">
                                <a
                                    key={"Cart"}
                                    href={"/cart"}
                                    className="relative"
                                >
                                    <ShoppingBagIcon
                                        className="h-6 w-6 text-black stroke-1.5"
                                        aria-hidden="true"
                                    />
                                    <div
                                        className="w-5 h-4 bg-red-500 rounded-full flex justify-center items-center text-white absolute top-0 right-0 
                                    translate-x-1/4 -translate-y-1/4"
                                    >
                                        2
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="mt-14">
                    {/* 여기 넣어하는데 */}
                    {props.children}
                </section>
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
