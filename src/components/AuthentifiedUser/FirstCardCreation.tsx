import { APP_NAME } from "@/constants/appName";
import { Link } from "react-router-dom";

const FirstCardCreation = () => {
  return (
    <div className="w-5/6 space-y-4 sm:w-3/4 md:w-1/2 ">
      <h1 className="font-bold text-blue-500">
        Avec {APP_NAME} , Créeons votre carte de visite numérique
      </h1>
      <p>
        {APP_NAME} vous permet de{" "}
        <span className="font-bold">créer, mettre à jour et partager </span>
        votre carte de visite.
      </p>
      <p>Vos contacts ont accès à votre carte de visite à jour.</p>
      <div></div>
      <Link to={"/create-card"} className="inline-block p-2 bg-blue-500 rounded-md ">
        Commencer
      </Link>
    </div>
  );
};

export default FirstCardCreation;
