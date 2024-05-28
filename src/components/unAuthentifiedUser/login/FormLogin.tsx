import React from "react";
import {
  UserContext,
  UserContextProvider,
} from "../../../Providers/usersProviders";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const InputsSchema = z.object({
  mail: z.string().email(),
  password: z.string().min(6),
});

type Inputs = z.infer<typeof InputsSchema>;

const FormLogin = () => {
  const { loginUser, errorFirebaseUser } =
    React.useContext<UserContextProvider | null>(
      UserContext
    ) as UserContextProvider;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });
  const onSubmit = async ({ mail, password }: Inputs) => {
    await loginUser(mail, password);
    if (!errorFirebaseUser && isSubmitSuccessful) navigate("/");
  };

  return (
    <form
      className="flex flex-col w-5/6 space-y-1 sm:w-1/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="mt-3" htmlFor="email">
        Mail
      </label>
      <input
        type="email"
        className="p-2 border-2 border-gray-500/35"
        placeholder="Votre email"
        {...register("mail")}
      />
      {errors.mail?.message && <p>{errors.mail.message}</p>}

      <label className="" htmlFor="password">
        Mot de passe
      </label>
      <input
        type="password"
        className="p-2 border-2 border-gray-500/35"
        required
        placeholder="Mot de passe"
        minLength={6}
        {...register("password")}
      />
      {errors.password?.message && <p>errors.mail.message</p>}
      <br />
      <input
        type="submit"
        className="p-4 text-xl text-white bg-blue-600 border-2 border-white rounded-md my-9 "
        value={"Connexion"}
      />
      {errorFirebaseUser && <p>{errorFirebaseUser}</p>}
    </form>
  );
};

export default FormLogin;
