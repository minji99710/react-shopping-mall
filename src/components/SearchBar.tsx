import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../App";
import { ProductProps } from "./Products";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export function SearchBar() {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(false);
    const [isFocusd, setIsFocused] = useState(false);
    const { apiResponse } = useContext(DataContext);
    const searchInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="dropdown ml-3 dropdown-start">
                <button
                    className="z-5 h-6 w-6 mx-2 text-black flex stroke-1.5 relative sm:hidden sm:w-auto dark:text-white"
                    aria-hidden="true"
                    onClick={() => {
                        const searchClass = searchInput.current?.classList;
                        searchClass?.remove("opacity-0");
                        searchClass?.toggle("hidden");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>

                <input
                    type="text"
                    placeholder="검색"
                    className="z-1 input input-ghost bg-gray-300 fixed right-0.5 top-16 px-2 rounded min-w-full text-sm focus:outline-0 
                    opacity-0 sm:opacity-100 sm:!block sm:static sm:max-w-xs dark:bg-gray-600"
                    onChange={(e) => setQuery(e.target.value)}
                    ref={searchInput}
                />

                {query.length > 0 ? (
                    <ul className="absolute top-20 -right-14 w-screen sm:top-12 sm:left-1 sm:w-52 sm:menu sm:dropdown-content p-2 shadow bg-base-100 mt-4">
                        {apiResponse
                            .filter((item) =>
                                item.title.toLowerCase().includes(query)
                            )
                            .map((item) => (
                                <li key={item.id} className="my-2">
                                    <a href={`/${item.id}`}>{item.title}</a>
                                </li>
                            ))}
                    </ul>
                ) : null}
            </div>
        </>
    );
}
