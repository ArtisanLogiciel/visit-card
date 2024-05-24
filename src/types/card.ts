
import { z } from "zod";

const CardSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Doit contenir au moins 2 caractères" }),
  lastname: z
    .string()
    .min(1, { message: "Doit contenir au moins 1 catactère" }),
  compagny: z
    .string()
    .min(1, { message: "Doit contenir au moins 1 caractère" }),
  address: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email({ message: "L'email est requis" }),
  phoneMobile: z.string().optional(),
  phoneDesktop: z.string().optional(),
  avatarUrl: z.string().optional(),
  bgColor: z.string(),
  textColor: z.string(),
});

const CardGeneralSchema = CardSchema.pick({
  firstname: true,
  lastname: true,
  avatarUrl: true,
});



const CardCompagnySchema = CardSchema.pick({
  compagny: true,
  city: true,
  address: true,
  country: true,
  zipcode: true,
});



const CardDesignSchema = CardSchema.pick({
  textColor: true,
  bgColor: true,
});



const CardContactSchema = CardSchema.pick({
  email: true,
  phoneDesktop: true,
  phoneMobile: true,
});



type Card = z.infer<typeof CardSchema>;
type CardGeneral = z.infer<typeof CardGeneralSchema>;
type CardCompagny = z.infer<typeof CardCompagnySchema>;
type CardContact = z.infer<typeof CardContactSchema>;
type CardDesign = z.infer<typeof CardDesignSchema>;

export {
  CardCompagnySchema,
  CardContactSchema,
  CardDesignSchema,
  CardGeneralSchema,
  CardSchema,
 
};
export type {
  Card,
  CardCompagny,
  CardContact,
  CardDesign,
  CardGeneral,

}

