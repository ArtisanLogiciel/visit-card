import firstLetterUpperCase from "@/utils/firstLetterUpperCase";
import { z } from "zod";

const CardSchemaFirebase = z.object({
  firstname: z.string().transform(firstLetterUpperCase),
  lastname: z.string().transform(firstLetterUpperCase),
  compagny: z.string().transform((value) => value.toUpperCase()),
  job: z.string().transform(firstLetterUpperCase),
  address: z.string().nullable(),
  city: z
    .string()
    .nullable()
    .transform((value) => {
      if (!value) return null;
      return firstLetterUpperCase(value);
    }),
  zipcode: z.string().nullable(),
  country: z
    .string()
    .nullable()
    .transform((value) => {
      if (!value) return null;
      return firstLetterUpperCase(value);
    }),
  email: z.string().email(),
  phoneMobile: z.string().nullable(),
  phoneDesktop: z.string().nullable(),
});

const digitRegex = /\d/;

const CardFormSchema = CardSchemaFirebase.extend({
  firstname: z
    .string()
    .min(1, { message: "Le prénom doit contenir au moins 1 caract_re" })
    .transform((value) => value.toLowerCase())
    .refine((value) => !digitRegex.test(value), {
      message: "Le prénom ne doit pas contenir de chiffres",
    }),

  lastname: z
    .string()
    .min(1, { message: "Le prénom doit contenir au moins 1 catactère" })
    .transform((value) => value.toLowerCase())
    .refine((value) => !digitRegex.test(value), {
      message: "Le nom de doit pas contenir de chiffres",
    }),
  compagny: z
    .string()
    .min(1, {
      message: "Le nom de l'entreprise doit contenir au moins 1 caractère",
    })
    .transform((value) => value.toLowerCase()),
  job: z
    .string()
    .min(1, {
      message: "Le nom de l'entreprise doit contenir au moins 1 caractère",
    })
    .transform((value) => {
      return value.toLowerCase();
    }),
  address: z
    .string()
    .nullable()
    .transform((value) => {
      if (!value) return null;
      if (value) return value.toLowerCase();
    }),
  city: z
    .string()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
        if (value) return !digitRegex.test(value);
      },
      { message: "La ville ne doit pas contenir de chiffres" }
    )
    .transform((value) => {
      if (!value) return null;
      if (value) return value.toLowerCase();
    }),
  zipcode: z.string().nullable(),
  country: z
    .string()
    .nullable()
    .refine((value) => {
      if (!value) return true;
      if (value) return !digitRegex.test(value);
    })
    .transform((value) => {
      if (!value) return null;
      return value.toLowerCase();
    }),

  email: z
    .string()
    .email({ message: "L'email est requis" })
    .transform((value) => {
      return value.toLowerCase();
    }),
  phoneMobile: z.string().nullable(),
  phoneDesktop: z.string().nullable(),
});

const CardGeneralSchema = CardFormSchema.pick({
  firstname: true,
  lastname: true,
});

const CardCompagnyFormSchema = CardFormSchema.pick({
  compagny: true,
  job: true,
  city: true,
  address: true,
  country: true,
  zipcode: true,
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

type CardFirebase = z.infer<typeof CardSchemaFirebase>;

export {
  CardCompagnyFormSchema,
  CardContactFormSchema,
  CardFormSchema,
  CardGeneralSchema,
  CardSchemaFirebase,
};
export type { Card, CardCompagny, CardContact, CardFirebase, CardGeneral };
