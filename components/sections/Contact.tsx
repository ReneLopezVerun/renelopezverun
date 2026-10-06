"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import { contactSchema } from "@/lib/contactSchema"
import { Lang } from "@/data/content"
import { motion } from "framer-motion"

type Props = {
  lang: Lang
}

type FormData = {
  name: string
  email: string
  message: string
}

export default function Contact({ lang }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(contactSchema),
  })

const onSubmit = async (data: FormData) => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error()

    toast.success(
      lang === "en"
        ? "Message sent successfully"
        : "Mensaje enviado correctamente"
    )
    reset()
  } catch {
    toast.error(
      lang === "en"
        ? "Something went wrong"
        : "Algo salió mal"
    )
  }
}

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
    >
    <section className="py-20 max-w-xl">
      <h2 className="text-3xl font-bold mb-8">
        {lang === "en" ? "Contact" : "Contacto"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            {...register("name")}
            placeholder={lang === "en" ? "Name" : "Nombre"}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("message")}
            placeholder={
              lang === "en"
                ? "Tell me about your project"
                : "Cuéntame sobre tu proyecto"
            }
            rows={5}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 disabled:opacity-50 transition cursor-pointer"
        >
          {isSubmitting
            ? lang === "en"
              ? "Sending..."
              : "Enviando..."
            : lang === "en"
            ? "Send message"
            : "Enviar mensaje"}
        </button>
      </form>
    </section>
    </motion.div>
  )
}
