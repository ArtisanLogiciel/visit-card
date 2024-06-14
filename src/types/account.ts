import firstLetterUpperCase from "@/utils/firstLetterUpperCase";
import { Timestamp } from "firebase/firestore";
import { z } from "zod";

const AccountSchema = z.object({
  firstname: z.string().min(1).transform(firstLetterUpperCase),

  lastname: z.string().min(1).transform(firstLetterUpperCase),

  mailSignUp: z.string().email(),
  dateSignUp: z
    .instanceof(Timestamp)
    .transform((date) => date.toDate().toLocaleDateString()),
});

type Account = z.infer<typeof AccountSchema>;

type AccountUpdate = Partial<Omit<Account, "dateSignUp" | "mailSignUp">>;

export type { Account, AccountUpdate };
export default AccountSchema;
