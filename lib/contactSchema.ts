import * as yup from "yup"

export const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  message: yup
    .string()
    .min(10, "Message is too short")
    .required("Message is required"),
})
