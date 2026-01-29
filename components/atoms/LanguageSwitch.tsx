"use client"

import { Lang } from "@/data/content"

type Props = {
  lang: Lang
  onChange: (lang: Lang) => void
}

export default function LanguageSwitch({ lang, onChange }: Props) {
  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => onChange("en")}
        className={lang === "en" ? "font-bold underline" : ""}
      >
        EN
      </button>
      <button
        onClick={() => onChange("es")}
        className={lang === "es" ? "font-bold underline" : ""}
      >
        ES
      </button>
    </div>
  )
}
