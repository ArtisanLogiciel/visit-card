import { z } from "zod";

const AccountSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  mailSignIn: z.string().email(),
});

type Account = z.infer<typeof AccountSchema>

type AccountUpdate = Partial<Account>


export type {AccountUpdate}
export default AccountSchema