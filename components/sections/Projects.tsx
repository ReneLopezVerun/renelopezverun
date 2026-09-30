"use client"

import { useEffect, useState } from "react"
import { Lang } from "@/data/content"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FiExternalLink,
  FiSettings,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiDatabase,
  FiServer,
  FiImage,
  FiX,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiMaximize2,
} from "react-icons/fi"

type Props = {
  lang: Lang
}

interface ProjectPhoto {
  url?: string
  key?: string
  caption?: string
  uploadedAt?: string
}

interface Project {
  id: string
  nombre: string
  estatus: string
  tecnologia: string | null
  baseDatos: string | null
  infraestructura: string | null
  dominio: string | null
  notas: string | null
  fotos: ProjectPhoto[] | any
  createdAt?: string
  updatedAt?: string
}

function getProjectCategory(project: Project): "SYSTEM" | "LANDING" | "NO_DOMAIN" {
  const hasDomain = Boolean(
    project.dominio &&
      project.dominio.trim() !== "" &&
      project.dominio.trim() !== "—" &&
      project.dominio.trim() !== "-"
  )

  const isLanding = Boolean(
    (project.notas && project.notas.toLowerCase().includes("landing page")) ||
      (project.nombre && project.nombre.toLowerCase().includes("landing"))
  )

  if (!hasDomain) return "NO_DOMAIN"
  if (isLanding) return "LANDING"
  return "SYSTEM"
}

export default function Projects({ lang }: Props) {
  const [dbProjects, setDbProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("TODOS")

  // Selected project for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          setDbProjects(data.projects)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects =
    filter === "TODOS"
      ? dbProjects
      : dbProjects.filter((p) => p.estatus === filter)

  const systems = filteredProjects.filter((p) => getProjectCategory(p) === "SYSTEM")
  const landings = filteredProjects.filter((p) => getProjectCategory(p) === "LANDING")
  const noDomains = filteredProjects.filter((p) => getProjectCategory(p) === "NO_DOMAIN")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <section className="py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {lang === "en" ? "Projects Portfolio" : "Portafolio de Proyectos"}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {lang === "en"
                ? `${dbProjects.length} projects registered in Prisma DB`
                : `${dbProjects.length} proyectos registrados en la Base de Datos Prisma`}
            </p>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600/20 dark:hover:bg-indigo-600/30 text-white dark:text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <FiSettings className="w-4 h-4" />
            {lang === "en" ? "Manage CRUD" : "Gestión / Admin CRUD"}
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-10 text-xs">
          {["TODOS", "Activo", "Desarrollo", "Inactivo"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl border font-medium transition cursor-pointer ${
                filter === st
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
              }`}
            >
              {st === "TODOS" ? (lang === "en" ? "All Status" : "Todos los Estatus") : st}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            {lang === "en" ? "Loading projects..." : "Cargando proyectos desde la base de datos..."}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 text-sm">
            {lang === "en" ? "No projects found" : "No se encontraron proyectos"}
          </div>
        ) : (
          <div className="space-y-14">
            {/* 1. SISTEMAS FUNCIONALES (HASTA ARRIBA) */}
            {systems.length > 0 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-indigo-500/30 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      Sistemas Funcionales & Plataformas
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                        {systems.length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Plataformas web, dashboards, servicios backend y aplicaciones móviles activas.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systems.map((project) => (
                    <ProjectCardItem
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. LANDINGS CON DOMINIO (SEGUIDO) */}
            {landings.length > 0 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-cyan-500/30 pb-3">
                  <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                    <FiGlobe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      Landing Pages con Dominio
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                        {landings.length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Sitios web institucionales y landing pages en producción con dominio custom.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {landings.map((project) => (
                    <ProjectCardItem
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. PROYECTOS SIN DOMINIO / LINK (HASTA ABAJO) */}
            {noDomains.length > 0 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-300 dark:border-slate-700/50 pb-3">
                  <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                    <FiLayers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      Proyectos e Infraestructura sin Dominio Directo
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {noDomains.length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Servidores backend internos, apps de meseros/cocina, APIs e infraestructura en pausa o interna.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noDomains.map((project) => (
                    <ProjectCardItem
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* FULL PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 my-8 shadow-2xl space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        selectedProject.estatus === "Activo"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30"
                          : selectedProject.estatus === "Desarrollo"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      {selectedProject.estatus}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      ID: {selectedProject.id.slice(0, 8)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {selectedProject.nombre}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Cerrar"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Full Notes / Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Descripción & Detalle Completo
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedProject.notas || "Sin descripción ni notas registradas."}
                </div>
              </div>

              {/* Tech Spec Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                    <FiCpu className="text-indigo-600 dark:text-indigo-400" /> Tecnología
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {selectedProject.tecnologia || "No especificada"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                    <FiDatabase className="text-purple-600 dark:text-purple-400" /> Base de Datos
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {selectedProject.baseDatos || "Sin BD requerida"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                    <FiServer className="text-cyan-600 dark:text-cyan-400" /> Infraestructura
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {selectedProject.infraestructura || "No especificada"}
                  </div>
                </div>
              </div>

              {/* Domain & S3 Photos Section */}
              <div className="space-y-4 pt-2">
                {selectedProject.dominio &&
                selectedProject.dominio !== "—" &&
                selectedProject.dominio !== "-" ? (
                  <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <FiGlobe /> Dominio en producción:
                      </div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 truncate">
                        {selectedProject.dominio}
                      </div>
                    </div>
                    <a
                      href={
                        selectedProject.dominio.startsWith("http")
                          ? selectedProject.dominio
                          : `https://${selectedProject.dominio}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition cursor-pointer"
                    >
                      Visitar Sitio Web <FiExternalLink />
                    </a>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 text-xs italic text-center">
                    Este proyecto es interno o backend sin dominio público asignado.
                  </div>
                )}

                {/* Photos JSON (S3) details */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                    <FiImage className="text-indigo-600 dark:text-indigo-400" />
                    Fotos en AWS S3 (Campo JSON Prisma):
                  </div>
                  {Array.isArray(selectedProject.fotos) && selectedProject.fotos.length > 0 ? (
                    <div className="space-y-2 mt-2">
                      {selectedProject.fotos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {photo.caption || `Foto ${idx + 1}`}
                            </div>
                            <div className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                              Key: {photo.key}
                            </div>
                          </div>
                          {photo.url && (
                            <a
                              href={photo.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
                            >
                              Ver Foto
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                      Sin archivos de foto registrados actualmente en la estructura JSON S3.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
                >
                  Cerrar Ventana
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ProjectCardItem({ project, onClick }: { project: Project; onClick: () => void }) {
  const photoCount = Array.isArray(project.fotos) ? project.fotos.length : 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="project-card rounded-2xl p-6 flex flex-col justify-between gap-4 cursor-pointer group relative overflow-hidden"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h4 className="text-base font-extrabold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">
            {project.nombre}
          </h4>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 uppercase tracking-wide ${
              project.estatus === "Activo"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                : project.estatus === "Desarrollo"
                ? "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30"
                : "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border border-slate-300 dark:border-slate-500/30"
            }`}
          >
            {project.estatus}
          </span>
        </div>

        {project.notas && (
          <p className="text-xs text-slate-700 dark:text-slate-300 font-normal opacity-90 line-clamp-3 mb-4 leading-relaxed">
            {project.notas}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 text-[11px] font-mono font-medium">
          {project.tecnologia && (
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
              {project.tecnologia}
            </span>
          )}
          {project.baseDatos && (
            <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
              <FiDatabase className="inline w-3 h-3 mr-1" />
              {project.baseDatos}
            </span>
          )}
          {project.infraestructura && (
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20">
              <FiServer className="inline w-3 h-3 mr-1" />
              {project.infraestructura}
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
        {project.dominio && project.dominio !== "—" && project.dominio !== "-" ? (
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 truncate max-w-[200px]">
            <FiGlobe className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{project.dominio}</span>
          </span>
        ) : (
          <span className="text-[11px] text-slate-500 dark:text-slate-500 italic">Sin dominio público</span>
        )}

        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
          <span>Ver detalle</span>
          <FiMaximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  )
}
