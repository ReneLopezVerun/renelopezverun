"use effect"

import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

export default function ToggleTheme(){
    const [dark, setDark] = useState(() =>{
        const stored = localStorage.getItem("theme")
        return stored === "dark"
    })

    useEffect(()=> {
        if (dark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [dark])

    const toggle = () => {
        setDark(prev => {
            const newDark = !prev
            localStorage.setItem("theme", newDark ? "dark" : "light")
            return newDark
        })
    }

    return (
        <button
            onClick={toggle}
            className="p-2rounded-md border hover:opacity-80 transition"
            aria-label="Toggle theme"
        >
            {dark ? <FiSun/> : <FiMoon/> }
        </button>
    )
}