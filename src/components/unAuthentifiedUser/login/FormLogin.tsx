import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  UserContext,
  UserContextProvider,
} from "../../../Providers/usersProviders";

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
  const signupUpser = ({ mail, password }: Inputs) => {
    loginUser(mail, password);
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });
  return (
    <form
      className="flex flex-col w-5/6 space-y-1 sm:w-1/4"
      onSubmit={handleSubmit(signupUpser)}
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
