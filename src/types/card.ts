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

const digitRegex = /\d/;

const CardFormSchema = CardSchemaFirebase.extend({
  firstname: z.string().refine((value) => !digitRegex.test(value), {
    message: "Le prénom ne doit pas contenir de chiffres",
  }),
  lastname: z
    .string()
    .min(1, { message: "Le prénom doit contenir au moins 1 catactère" })
    .refine((value) => !digitRegex.test(value), {
      message: "Le nom de doit pas contenir de chiffres",
    }),
  compagny: z.string().min(1, {
    message: "Le nom de l'entreprise doit contenir au moins 1 caractère",
  }),
  address: z
    .string()
    .optional()
    .transform((value) => {
      if (value) return value.toLowerCase();
    }),
  city: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value) return !digitRegex.test(value);
      },
      { message: "La ville ne doit pas contenir de chiffres" }
    ),
  zipcode: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value) return digitRegex.test(value);
      },
      { message: "Le zipcode doit contenir uniquement des chiffres" }
    )
    .transform((value) => {
      if (value) return value.toLowerCase();
    }),
  country: z
    .string()
    .optional()
    .refine((value) => {
      if (value) return !digitRegex.test(value);
    }),
  email: z.string().email({ message: "L'email est requis" }),
  phoneMobile: z.string().optional(),
  phoneDesktop: z.string().optional(),
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
