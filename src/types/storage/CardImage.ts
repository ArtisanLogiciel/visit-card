import { z } from "zod";

const CardImageSchema = z.object({
  filename: z
    .instanceof(File)
    .refine(
      (file?) => {
        if (file) return file.type === "image/jpeg";
      },
      {
        message: "Le fichier doit être au format JPEG",
      }
    )
    .optional(),
});

type CardImage = z.infer<typeof CardImageSchema>;

export default CardImageSchema;
export type { CardImage };
