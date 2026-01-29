"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/sections/Hero"
import ToggleTheme from "@/components/atoms/ToggleTheme"
import LanguageSwitch from "@/components/atoms/LanguageSwitch"
import { Lang } from "@/data/content"
import Projects from "@/components/sections/Projects"
import Contact from "@/components/sections/Contact"

export default function Home() {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang
    if (stored) setLang(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const changeLang = (l: Lang) => {
    localStorage.setItem("lang", l)
    setLang(l)
  }

  return (
    <main className="px-5 md:px-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center py-6 sticky top-0 backdrop-blur bg-(--bg)/80 z-50">
        <LanguageSwitch lang={lang} onChange={changeLang} />
        <ToggleTheme />
      </header>

      <Hero lang={lang} />
      <Projects lang={lang} />
      <Contact lang={lang} />
    </main>
  )
}
