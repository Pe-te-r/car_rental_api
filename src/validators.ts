import { z } from 'zod'


export const userRegister = z.object({
    name: z.string(),
    email: z.string().email(),
    contact_phone: z.string(),
    role:z.string().optional(),
    address: z.string().optional(),
    password: z.string()
})

export const userLogin = z.object({
    email: z.string().email(),
    password: z.string()
})