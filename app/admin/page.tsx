"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiDatabase,
  FiGlobe,
  FiServer,
  FiCpu,
  FiImage,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiX,
  FiExternalLink,
  FiCode,
  FiSave,
} from "react-icons/fi"

interface ProjectPhoto {
  url: string
  key: string
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
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("TODOS")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [jsonViewMode, setJsonViewMode] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    nombre: "",
    estatus: "Activo",
    tecnologia: "",
    baseDatos: "",
    infraestructura: "",
    dominio: "",
    notas: "",
    fotos: [] as ProjectPhoto[],
  })
  const [rawJsonText, setRawJsonText] = useState("[]")

  // S3 Photo state for form
  const [newPhotoUrl, setNewPhotoUrl] = useState("")
  const [newPhotoKey, setNewPhotoKey] = useState("")
  const [newPhotoCaption, setNewPhotoCaption] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchProjects()
    }
  }, [user, search, statusFilter])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me")
      if (!res.ok) {
        router.push("/login")
        return
      }
      const data = await res.json()
      if (data.authenticated) {
        setUser(data.user)
      } else {
        router.push("/login")
      }
    } catch {
      router.push("/login")
    } finally {
      setLoadingAuth(false)
    }
  }

  const fetchProjects = async () => {
    setLoadingProjects(true)
    try {
      const queryParams = new URLSearchParams()
      if (search) queryParams.set("search", search)
      if (statusFilter !== "TODOS") queryParams.set("status", statusFilter)

      const res = await fetch(`/api/projects?${queryParams.toString()}`)
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (err) {
      console.error("Error fetching projects:", err)
    } finally {
      setLoadingProjects(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  const openCreateModal = () => {
    setEditingProject(null)
    setFormData({
      nombre: "",
      estatus: "Activo",
      tecnologia: "",
      baseDatos: "",
      infraestructura: "",
      dominio: "",
      notas: "",
      fotos: [],
    })
    setRawJsonText("[]")
    setJsonViewMode(false)
    setIsModalOpen(true)
  }

  const openEditModal = (p: Project) => {
    setEditingProject(p)
    const currentFotos = Array.isArray(p.fotos) ? p.fotos : []
    setFormData({
      nombre: p.nombre,
      estatus: p.estatus || "Activo",
      tecnologia: p.tecnologia || "",
      baseDatos: p.baseDatos || "",
      infraestructura: p.infraestructura || "",
      dominio: p.dominio || "",
      notas: p.notas || "",
      fotos: currentFotos,
    })
    setRawJsonText(JSON.stringify(currentFotos, null, 2))
    setJsonViewMode(false)
    setIsModalOpen(true)
  }

  const handleAddPhotoItem = () => {
    if (!newPhotoKey && !newPhotoUrl) return
    const photoItem: ProjectPhoto = {
      url: newPhotoUrl || `https://my-bucket.s3.us-west-2.amazonaws.com/projects/${newPhotoKey || 'photo-' + Date.now() + '.jpg'}`,
      key: newPhotoKey || `projects/photo-${Date.now()}.jpg`,
      caption: newPhotoCaption || "Fotografía de proyecto",
      uploadedAt: new Date().toISOString(),
    }
    const updatedFotos = [...formData.fotos, photoItem]
    setFormData({ ...formData, fotos: updatedFotos })
    setRawJsonText(JSON.stringify(updatedFotos, null, 2))

    setNewPhotoUrl("")
    setNewPhotoKey("")
    setNewPhotoCaption("")
  }

  const handleRemovePhotoItem = (index: number) => {
    const updated = formData.fotos.filter((_, i) => i !== index)
    setFormData({ ...formData, fotos: updated })
    setRawJsonText(JSON.stringify(updated, null, 2))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let finalFotos = formData.fotos
      if (jsonViewMode) {
        try {
          finalFotos = JSON.parse(rawJsonText)
        } catch {
          alert("El formato JSON de las fotos no es válido")
          setSaving(false)
          return
        }
      }

      const payload = {
        ...formData,
        fotos: finalFotos,
      }

      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects"
      const method = editingProject ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || "Error al guardar")
      }

      setIsModalOpen(false)
      fetchProjects()
    } catch (err: any) {
      alert(err.message || "Ocurrió un error al guardar el proyecto")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/projects/${deleteId}`, { method: "DELETE" })
      if (res.ok) {
        setDeleteId(null)
        fetchProjects()
      } else {
        alert("Error al eliminar el proyecto")
      }
    } catch {
      alert("Error al eliminar el proyecto")
    }
  }

  // Count stats
  const totalCount = projects.length
  const activeCount = projects.filter((p) => p.estatus === "Activo").length
  const devCount = projects.filter((p) => p.estatus === "Desarrollo").length
  const inactiveCount = projects.filter((p) => p.estatus === "Inactivo").length

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <p className="text-sm">Verificando credenciales de acceso...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-bold text-white text-lg">
              P
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-lg leading-none">
                Gestión de Proyectos
              </h1>
              <span className="text-[11px] text-slate-400">
                Prisma Database & AWS S3 JSON Ready
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
            >
              <FiLogOut className="w-3.5 h-3.5 text-slate-400" /> Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Total Proyectos</span>
              <FiDatabase className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{totalCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Registrados en la base de datos</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Proyectos Activos</span>
              <FiCheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{activeCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">En producción activa</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>En Desarrollo</span>
              <FiClock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400">{devCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">En fase de construcción</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Inactivos / Archivo</span>
              <FiAlertCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-400">{inactiveCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Legacy o descontinuados</div>
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-xl">
            {/* Search Input */}
            <div className="relative w-full">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nombre, tecnología, dominio o notas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input px-3 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer bg-slate-900 border-slate-800 text-slate-300"
            >
              <option value="TODOS">Todos los estatus</option>
              <option value="Activo">Activos</option>
              <option value="Desarrollo">En Desarrollo</option>
              <option value="Inactivo">Inactivos</option>
            </select>
          </div>

          <button
            onClick={openCreateModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <FiPlus className="w-4 h-4" /> Registrar Proyecto
          </button>
        </div>

        {/* Projects List */}
        {loadingProjects ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-3" />
            <p className="text-sm">Cargando proyectos desde PostgreSQL Prisma...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
            <FiDatabase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-200">No se encontraron proyectos</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
              Intenta cambiar los términos de búsqueda o registra un nuevo proyecto en el sistema.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => {
              const photoCount = Array.isArray(project.fotos) ? project.fotos.length : 0
              return (
                <div
                  key={project.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Title and Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition line-clamp-2">
                        {project.nombre}
                      </h3>
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold shrink-0 ${
                          project.estatus === "Activo"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : project.estatus === "Desarrollo"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {project.estatus}
                      </span>
                    </div>

                    {/* Tech details */}
                    <div className="space-y-2 text-xs text-slate-300 mb-4">
                      {project.tecnologia && (
                        <div className="flex items-center gap-2">
                          <FiCpu className="text-indigo-400 shrink-0" />
                          <span className="text-slate-400">Tech:</span>
                          <span className="font-medium text-slate-200">{project.tecnologia}</span>
                        </div>
                      )}

                      {project.baseDatos && (
                        <div className="flex items-center gap-2">
                          <FiDatabase className="text-purple-400 shrink-0" />
                          <span className="text-slate-400">BD:</span>
                          <span className="text-slate-200">{project.baseDatos}</span>
                        </div>
                      )}

                      {project.infraestructura && (
                        <div className="flex items-center gap-2">
                          <FiServer className="text-cyan-400 shrink-0" />
                          <span className="text-slate-400">Infra:</span>
                          <span className="text-slate-200">{project.infraestructura}</span>
                        </div>
                      )}

                      {project.dominio && (
                        <div className="flex items-center gap-2">
                          <FiGlobe className="text-blue-400 shrink-0" />
                          <span className="text-slate-400">Dominio:</span>
                          <a
                            href={
                              project.dominio.startsWith("http")
                                ? project.dominio
                                : `https://${project.dominio}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:underline flex items-center gap-1 truncate"
                          >
                            {project.dominio} <FiExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {project.notas && (
                      <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 mb-4 line-clamp-3">
                        {project.notas}
                      </p>
                    )}
                  </div>

                  {/* Footer: Photos indicator & Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                      <FiImage className="text-indigo-400 w-3.5 h-3.5" />
                      <span>S3 JSON:</span>
                      <span className="text-indigo-300 font-bold">{photoCount} fotos</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white transition cursor-pointer"
                        title="Editar Proyecto"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition cursor-pointer"
                        title="Eliminar Proyecto"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                {editingProject ? (
                  <>
                    <FiEdit2 className="text-indigo-400" /> Editar Proyecto
                  </>
                ) : (
                  <>
                    <FiPlus className="text-indigo-400" /> Registrar Nuevo Proyecto
                  </>
                )}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nombre del Proyecto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                    placeholder="Ej. App Contabilidad Web"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estatus
                  </label>
                  <select
                    value={formData.estatus}
                    onChange={(e) => setFormData({ ...formData, estatus: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm bg-slate-900 border-slate-800 text-slate-200"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tecnología
                  </label>
                  <input
                    type="text"
                    value={formData.tecnologia}
                    onChange={(e) => setFormData({ ...formData, tecnologia: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                    placeholder="Ej. Next.js, React"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Base de Datos
                  </label>
                  <input
                    type="text"
                    value={formData.baseDatos}
                    onChange={(e) => setFormData({ ...formData, baseDatos: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                    placeholder="Ej. RDS, Supabase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Infraestructura
                  </label>
                  <input
                    type="text"
                    value={formData.infraestructura}
                    onChange={(e) => setFormData({ ...formData, infraestructura: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                    placeholder="Ej. Amplify + S3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dominio / URL
                </label>
                <input
                  type="text"
                  value={formData.dominio}
                  onChange={(e) => setFormData({ ...formData, dominio: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  placeholder="Ej. www.midominio.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notas / Descripción / ToDo
                </label>
                <textarea
                  rows={3}
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  placeholder="Detalles del proyecto, características..."
                />
              </div>

              {/* SECCIÓN ESPECIAL CAMPO FOTOS JSON S3 */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiImage className="text-indigo-400 w-5 h-5" />
                    <span className="text-xs font-bold text-indigo-200">
                      Campo JSON Fotos (AWS S3)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setJsonViewMode(!jsonViewMode)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition flex items-center gap-1 cursor-pointer"
                  >
                    <FiCode /> {jsonViewMode ? "Ver interfaz simple" : "Editar JSON crudo"}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400">
                  ☁️ Este campo almacena la metadata de fotos en formato JSON para conexión directa con AWS S3 en el futuro.
                </p>

                {jsonViewMode ? (
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      JSON crudo (Prisma field: <code className="text-indigo-300">fotos Json?</code>):
                    </label>
                    <textarea
                      rows={6}
                      value={rawJsonText}
                      onChange={(e) => setRawJsonText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.fotos.length === 0 ? (
                      <div className="text-xs text-slate-500 italic p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-center">
                        Sin fotos registradas en el JSON S3 actualmente.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {formData.fotos.map((photo, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                          >
                            <div className="truncate pr-2">
                              <div className="font-semibold text-slate-200 truncate">
                                {photo.caption || photo.key || `Foto ${idx + 1}`}
                              </div>
                              <div className="font-mono text-[10px] text-indigo-400 truncate">
                                S3 Key: {photo.key}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePhotoItem(idx)}
                              className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inputs to add photo metadata */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                      <div className="font-medium text-slate-300 text-[11px]">
                        + Registrar Metadato S3
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="S3 Key (ej. projects/foto-1.jpg)"
                          value={newPhotoKey}
                          onChange={(e) => setNewPhotoKey(e.target.value)}
                          className="glass-input px-2.5 py-1.5 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Título / Descripción (ej. Captura)"
                          value={newPhotoCaption}
                          onChange={(e) => setNewPhotoCaption(e.target.value)}
                          className="glass-input px-2.5 py-1.5 rounded-lg text-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddPhotoItem}
                        className="w-full py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs transition cursor-pointer flex items-center justify-center gap-1 font-medium"
                      >
                        <FiPlus /> Agregar al JSON S3
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSave /> Guardar Proyecto
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-panel p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
              <FiTrash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">¿Eliminar Proyecto?</h3>
              <p className="text-slate-400 text-xs mt-1">
                Esta acción borrará el registro de la base de datos de manera permanente.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-800 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
