import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Error al obtener el proyecto" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { nombre, estatus, tecnologia, baseDatos, infraestructura, dominio, notas, fotos } = body

    const existing = await prisma.project.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        nombre: nombre !== undefined ? nombre : existing.nombre,
        estatus: estatus !== undefined ? estatus : existing.estatus,
        tecnologia: tecnologia !== undefined ? tecnologia : existing.tecnologia,
        baseDatos: baseDatos !== undefined ? baseDatos : existing.baseDatos,
        infraestructura: infraestructura !== undefined ? infraestructura : existing.infraestructura,
        dominio: dominio !== undefined ? dominio : existing.dominio,
        notas: notas !== undefined ? notas : existing.notas,
        fotos: fotos !== undefined ? fotos : existing.fotos,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Error al actualizar el proyecto" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params
    const existing = await prisma.project.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 })
    }

    await prisma.project.delete({ where: { id } })

    return NextResponse.json({ success: true, message: "Proyecto eliminado" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Error al eliminar el proyecto" }, { status: 500 })
  }
}
