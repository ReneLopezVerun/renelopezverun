import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const authPayload = await getAuthUser()
    if (!authPayload) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: authPayload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
