import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";



const SignUpUser = () => {
  const { registerUser, errorFirebaseUser } =
    React.useContext<UserContextProvider | null>(
      UserContext
    ) as UserContextProvider;

  const formRef = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = formRef.current?.email.value;
    const password = formRef.current?.password.value;
    registerUser(email, password);

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
      <h1 className="text-2xl">Créer un compte gratuit</h1>
      <form className="flex flex-col" onSubmit={handleSubmit} ref={formRef}>
        <label className="mt-3" htmlFor="email">
          Mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Votre email"
          required
        />
        <label className="mt-3" htmlFor="password">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Votre mot de passe"
          minLength={6}
        />
        <input
          className="my-3 transition-all duration-300 border-2 border-black rounded-md bg-slate-400 hover:bg-white hover:text-slate-500"
          type="submit"
          value={"S'insrire"}
        />
      </form>
      {errorFirebaseUser}
    </div>
  );
};

export default SignUpUser;
