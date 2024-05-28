import { z } from "zod";

const CardSchemaFirebase = z.object({
  firstname: z.string(),
  lastname: z.string(),
  compagny: z.string(),
  address: z.string(),
  city: z.string(),
  zipcode: z.string(),
  country: z.string(),
  email: z.string().email().or(z.literal("")),
  phoneMobile: z.string(),
  phoneDesktop: z.string(),
  avatarUrl: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
});

const CardFormSchema = CardSchemaFirebase.extend({
  firstname: z.string(),
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
});

const CardGeneralSchema = CardFormSchema.pick({
  firstname: true,
  lastname: true,
  avatarUrl: true,
});

const CardCompagnyFormSchema = CardFormSchema.pick({
  compagny: true,
  city: true,
  address: true,
  country: true,
  zipcode: true,
});

const CardDesignFormSchema = CardFormSchema.pick({
  textColor: true,
  bgColor: true,
});

const CardContactFormSchema = CardFormSchema.pick({
  email: true,
  phoneDesktop: true,
  phoneMobile: true,
});

type Card = z.infer<typeof CardFormSchema>;
type CardGeneral = z.infer<typeof CardGeneralSchema>;
type CardCompagny = z.infer<typeof CardCompagnyFormSchema>;
type CardContact = z.infer<typeof CardContactFormSchema>;
type CardDesign = z.infer<typeof CardDesignFormSchema>;
type CardFirebase = z.infer<typeof CardSchemaFirebase>;

export {
  CardCompagnyFormSchema,
  CardContactFormSchema,
  CardDesignFormSchema,
  CardFormSchema,
  CardGeneralSchema,
  CardSchemaFirebase,
};
export type {
  Card,
  CardCompagny,
  CardContact,
  CardDesign,
  CardFirebase,
  CardGeneral,
};
