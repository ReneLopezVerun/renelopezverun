import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seeding...")

  // Create default admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@renelopez.com"
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456"
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log(`👤 Admin user created/updated: ${admin.email}`)

  // Load imported projects
  const jsonPath = path.join(__dirname, "../data/projects_imported.json")
  if (!fs.existsSync(jsonPath)) {
    console.error("❌ projects_imported.json not found!")
    return
  }

  const projectsData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
  console.log(`📦 Found ${projectsData.length} projects to seed.`)

  let insertedCount = 0
  let updatedCount = 0

  for (const p of projectsData) {
    const existing = await prisma.project.findFirst({
      where: { nombre: p.nombre },
    })

    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data: {
          estatus: p.estatus,
          tecnologia: p.tecnologia,
          baseDatos: p.baseDatos,
          infraestructura: p.infraestructura,
          dominio: p.dominio,
          notas: p.notas,
        },
      })
      updatedCount++
    } else {
      await prisma.project.create({
        data: {
          nombre: p.nombre,
          estatus: p.estatus,
          tecnologia: p.tecnologia,
          baseDatos: p.baseDatos,
          infraestructura: p.infraestructura,
          dominio: p.dominio,
          notas: p.notas,
          fotos: p.fotos || [],
        },
      })
      insertedCount++
    }
  }

  console.log(`✅ Seeding complete! Created: ${insertedCount}, Updated: ${updatedCount}`)
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
