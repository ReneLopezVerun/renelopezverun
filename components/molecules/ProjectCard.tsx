"use client"

import { motion } from "framer-motion"
import clsx from "clsx"
import { Lang } from "@/data/content"

type Props = {
  project: any
  lang: Lang
}

export default function ProjectCard({ project, lang }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="border rounded-lg p-6 flex flex-col gap-4 transition"
    >
      <h3 className="text-xl font-semibold">{project.title}</h3>

      <p className="opacity-80">
        {project.description[lang]}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech: string) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 border rounded-md opacity-70"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-2">
        <a
          href={project.demo}
          target="_blank"
          className={clsx(
            "text-sm underline",
            project.demo === "#" && "opacity-40 pointer-events-none"
          )}
        >
          Demo
        </a>
        <a
          href={project.repo}
          target="_blank"
          className="text-sm underline"
        >
          Code
        </a>
      </div>
    </motion.div>
  )
}
