import { Link } from "react-router-dom";
import FormSignUp from "./FormSignUp";
import Logo from "../../elements/Logo";


const SignUpUser = () => {
 
  return (
    <>
      <Logo/>
      <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl ">Créons votre compte</h1>
      <FormSignUp/>
      <p>Vous êtes déjà inscrit ?</p>
      <p> <Link to={"/login"} className="text-green-500 underline underline-offset-4">Se connecter</Link></p>
      </div>
      
    </>
  );
};

export default SignUpUser;
