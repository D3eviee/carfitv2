import z, { boolean, string } from 'zod'

export const businessOnboardingSchema = z.object({
    email: z.string().email(({ message: "Wrong email format" }),).min(5).max(40),
    password: z.string().min(8, ({ message: "Password is too short" }),),
    businessCategory: z.string(({ message: "Category for business was not provided" }),).nonempty(),
    businnesName: z.string(({ message: "Business name was not provided" }),).min(5).max(40),
    businnesOwner: z.string(({ message: "Owner for business was not provided" }),).min(5).max(40),
    businessPhone: z.string().length(9, ({ message: "Invalid phone number format" }),),
    policyAcceptance: boolean(({ message: "Policy and privacy rules not accepted" }),).refine((data)=>data),
    businessTown: string({ message: "Town for business was not provided" }),
    businessZipcode: string({ message: "Zipcode for business was not provided" }),
    businessDistrict: string({ message: "District for business was not provided" }),
    businessStreet: string({ message: "Street for business was not provided" }),
})

export type businessOnboardingSchema = z.infer<typeof businessOnboardingSchema>