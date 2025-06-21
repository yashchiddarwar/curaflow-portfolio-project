import {z} from "zod"

export const UserFormValidation = z.object({
    name: z.string()
        .min(2,  "Name must be at least 2 characters.")
        .max(50, "Name must be at most 15 characters."),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
})