"use client"

import { Lang } from "@/data/content"

type Props = {
  lang: Lang
  onChange: (lang: Lang) => void
}

export default function LanguageSwitch({ lang, onChange }: Props) {
  return (
    <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold backdrop-blur-md">
      <button
        onClick={() => onChange("en")}
        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
          lang === "en"
            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onChange("es")}
        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
          lang === "es"
            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        ES
      </button>
    </div>
  )
}
