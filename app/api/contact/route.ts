import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key de Resend no configurada" },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const { name, email, message } = await req.json()

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "contact@example.com",
      subject: `New contact from ${name}`,
      replyTo: email,
      html: `
        <h3>New message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Email not sent" },
      { status: 500 }
    )
  }
}
