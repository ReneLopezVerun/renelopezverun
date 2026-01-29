"use client"

import { motion } from "framer-motion"
import { content, Lang } from "@/data/content"

type Props = {
  lang: Lang
}

export default function Hero({ lang }: Props) {
  const t = content[lang].hero

  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
>
    <section className="min-h-[80vh] flex flex-col justify-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl md:text-5xl font-bold"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-lg max-w-xl opacity-80"
      >
        {t.subtitle}
      </motion.p>
    </section>
    </motion.div>
  )
}
