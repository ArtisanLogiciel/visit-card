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
  const { registerUser, errorFirebaseUser } =
    React.useContext<UserContextProvider | null>(
      UserContext
    ) as UserContextProvider;

<<<<<<< HEAD
  const navigate = useNavigate();
  const signupUpser = ({ mail, password }: Inputs) => {
    registerUser(mail, password);
    navigate("/");
  };

=======
  const { loginUser, errorFirebaseUser } =

    React.useContext<UserContextProvider | null>(
      UserContext
    ) as UserContextProvider;

  const navigate = useNavigate();

  const handleLogin = async ({ mail, password }: Inputs) => {
    const authentification = await loginUser(mail, password) as undefined | {error:boolean};

    
    if ( !authentification?.error) {
      navigate("/");
    }
  };
  
  
  const TEST_USER = {email:"test50@test.fr",password:"testtest"}


>>>>>>> c4c20b919ea34a576d53fd06054ddfaeeb219631
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });
  return (
    <form
      className="flex flex-col w-5/6 space-y-1 sm:w-1/4"
<<<<<<< HEAD
      onSubmit={handleSubmit(signupUpser)}
=======

      onSubmit={handleSubmit(handleLogin)}

>>>>>>> c4c20b919ea34a576d53fd06054ddfaeeb219631
    >
      <label className="mt-3" htmlFor="email">
        Mail
      </label>
      <input
        type="email"
        className="p-2 border-2 border-gray-500/35"
<<<<<<< HEAD
=======
        defaultValue={import.meta.env.DEV?TEST_USER.email:""}
>>>>>>> c4c20b919ea34a576d53fd06054ddfaeeb219631
        placeholder="Votre email"
        {...register("mail")}
      />
      {errors.mail?.message && <p>{errors.mail.message}</p>}

      <label className="" htmlFor="password">
        Mot de passe
<<<<<<< HEAD
      </label>
      <input
        type="password"
        className="p-2 border-2 border-gray-500/35"
        required
        placeholder="Mot de passe"
        minLength={6}
        {...register("password")}
=======
        </label>
      <input
        type="password"
        className="p-2 border-2 border-gray-500/35"
        defaultValue={import.meta.env.DEV?TEST_USER.password:""}
        required
        placeholder="Mot de passe"
        minLength={6}
        {...register("password",)}
>>>>>>> c4c20b919ea34a576d53fd06054ddfaeeb219631
      />
      {errors.password?.message && <p>errors.mail.message</p>}
      <br />
      <input
        type="submit"
<<<<<<< HEAD
        className="p-4 text-xl text-white bg-blue-600 border-2 border-white rounded-md my-9 "
=======

        className="p-4 text-xl text-white bg-blue-600 border-2 border-white rounded-md my-9 hover:cursor"

>>>>>>> c4c20b919ea34a576d53fd06054ddfaeeb219631
        value={"Connexion"}
      />
      {errorFirebaseUser && <p>{errorFirebaseUser}</p>}
    </form>
  );
};

export default FormLogin;
