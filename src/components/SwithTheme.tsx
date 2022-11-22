import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

function SwithTheme() {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        const body = document.body;
        body.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <button onClick={toggleTheme}>
            {theme === "light" ? (
                <MoonIcon className="w-6 h-6" />
            ) : (
                <SunIcon className="w-6 h-6 dark:text-white" />
            )}
        </button>
    );
}

export default SwithTheme;
