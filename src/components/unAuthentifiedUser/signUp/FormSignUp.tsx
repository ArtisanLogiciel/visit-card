import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  UserContext,
  UserContextProvider,
} from "../../../Providers/usersProviders";

import { useNavigate } from "react-router-dom";
import { z } from "zod";

const InputsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

type Inputs = z.infer<typeof InputsSchema>;

const FormSignUp = () => {
  const { registerUser, errorFirebaseUser } =
    React.useContext<UserContextProvider | null>(
      UserContext
    ) as UserContextProvider;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });

  const navigate = useNavigate();

  const signUpUser = async({ email, password }: Inputs) => {
   const signupUser= await registerUser(email, password) as undefined | {error:boolean};
   if (!signupUser?.error) {
    navigate("/");
   } 
  };
  return (
    <form
      className="flex flex-col w-5/6 space-y-1"
      onSubmit={handleSubmit(signUpUser)}
    >
      <label className="mt-3" htmlFor="email">
        Mail
      </label>
      <input
        type="email"
        id="email"
        placeholder="Votre email"
        {...register("email")}
        className="p-2 border-2 border-gray-500/35"
      />
      {errors.email?.message && <p>{errors.email.message}</p>}
      <label className="mt-3" htmlFor="password">
        Mot de passe
      </label>
      <input
        type="password"
        id="password"
        placeholder="Votre mot de passe"
        className="p-2 border-2 border-gray-500/35"
        {...register("password")}
      />
      {errors.password?.message && <p>{errors.password.message}</p>}
      <br />
      <input
        className="p-4 my-3 text-2xl text-white transition-all duration-300 ease-in-out bg-blue-600 border-2 rounded-md border-white/65 hover:text-slate-500 hover:bg-blue-300"
        type="submit"
        value={"Je m'inscris"}
      />
      {errorFirebaseUser && <p>{errorFirebaseUser}</p>}
    </form>
  );
};

export default FormSignUp;
