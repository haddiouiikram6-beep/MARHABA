import { z } from "zod";
export const registerSchema = z.object({
    fullName: z.string()
    .min(1,"Le nom complet est obligatoire."),
    email: z.email("Email invalide"),
    password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});
export const loginSchema = z.object({
    email: z.email("Email invalide."),
    password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});         