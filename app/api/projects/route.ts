import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"

function getProjectPriorityScore(project: {
  nombre: string
  dominio?: string | null
  notas?: string | null
  tecnologia?: string | null
}): number {
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

  // 1 (TOP): Sistemas funcionales
  // 2 (MIDDLE): Landings que tengan dominio
  // 3 (BOTTOM): Proyectos sin dominio o link

  if (!hasDomain) {
    return 3 // Hasta abajo: sin dominio o link
  }

  if (isLanding) {
    return 2 // Seguido: landing pages con dominio
  }

  return 1 // Hasta arriba: sistemas funcionales
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""

    const where: any = {}

    if (status && status !== "TODOS") {
      where.estatus = status
    }

    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: "insensitive" } },
        { tecnologia: { contains: search, mode: "insensitive" } },
        { dominio: { contains: search, mode: "insensitive" } },
        { notas: { contains: search, mode: "insensitive" } },
      ]
    }

    const rawProjects = await prisma.project.findMany({
      where,
    })

    // Sort according to user specification:
    // Top (1): Sistemas funcionales
    // Middle (2): Landings con dominio
    // Bottom (3): Proyectos sin dominio o link
    const sortedProjects = [...rawProjects].sort((a, b) => {
      const scoreA = getProjectPriorityScore(a)
      const scoreB = getProjectPriorityScore(b)

      if (scoreA !== scoreB) {
        return scoreA - scoreB // 1 first, 2 second, 3 third
      }

      // Secondary sort: Activo > Desarrollo > Inactivo, then alphabetical
      const statusOrder: Record<string, number> = { Activo: 1, Desarrollo: 2, Inactivo: 3 }
      const statusA = statusOrder[a.estatus] || 4
      const statusB = statusOrder[b.estatus] || 4

      if (statusA !== statusB) {
        return statusA - statusB
      }

      return a.nombre.localeCompare(b.nombre)
    })

    return NextResponse.json({ projects: sortedProjects, total: sortedProjects.length })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { nombre, estatus, tecnologia, baseDatos, infraestructura, dominio, notas, fotos } = body

    if (!nombre) {
      return NextResponse.json({ error: "El nombre del proyecto es obligatorio" }, { status: 400 })
    }

    const newProject = await prisma.project.create({
      data: {
        nombre,
        estatus: estatus || "Activo",
        tecnologia: tecnologia || null,
        baseDatos: baseDatos || null,
        infraestructura: infraestructura || null,
        dominio: dominio || null,
        notas: notas || null,
        fotos: fotos || [],
      },
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Error al crear el proyecto" }, { status: 500 })
  }
}
