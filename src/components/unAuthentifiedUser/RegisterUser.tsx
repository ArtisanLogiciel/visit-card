import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";

const RegisterUser = () => {
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl">Inscription</h1>
      <form className="flex flex-col" onSubmit={handleSubmit} ref={formRef}>
        <label className="mt-3" htmlFor="email">
          Mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter you email"
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
          placeholder="enter your password"
          minLength={6}
        />
        <input
          className=" bg-slate-400 border-2 border-black hover:bg-white transition-all duration-300 hover:text-slate-500 rounded-md my-3"
          type="submit"
          value={"S'insrire"}
        />
      </form>
      {errorFirebaseUser}
    </div>
  );
};

export default RegisterUser;
