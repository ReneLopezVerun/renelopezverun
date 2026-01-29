"use client"

import { projects } from "@/data/projects"
import ProjectCard from "@/components/molecules/ProjectCard"
import { Lang } from "@/data/content"
import { motion } from "framer-motion"

type Props = {
  lang: Lang
}

export default function Projects({ lang }: Props) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
    >
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-10">
        {lang === "en" ? "Projects" : "Proyectos"}
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
          />
        ))}
      </div>
    </section>
    </motion.div>
  )
}
