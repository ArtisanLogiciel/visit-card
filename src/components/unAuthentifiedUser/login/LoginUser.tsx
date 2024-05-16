import { Link } from "react-router-dom";
import FormLogin from "./FormLogin";
import Logo from "../../elements/Logo";

const LoginUser = () => {



  return (
    <>
      <Logo/>
      <div className="flex flex-col items-center justify-center ">
      <h1 className="font-bold text-center text-md">Bienvenue ! Connectez-vous à votre compte</h1>
      <FormLogin/>
      <br />
      <p>Vous n'avez pas de compte</p>
      <Link to={"/sign-up"} className="text-green-700 underline underline-offset-4"><p>Créer un compte</p></Link>
      </div>
    </>)
  
};

export default LoginUser;
