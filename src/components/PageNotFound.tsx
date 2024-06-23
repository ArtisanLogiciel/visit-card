import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-white text-white">
      <div className="flex flex-col items-center gap-4 p-10 rounded-lg bg-black/45">
        <h1 className="bg-white m-4 p-4 font-extrabold rounded-lg text-2xl text-red-600 animate-flash">
          Erreur 404
        </h1>
        <h1 className="text-2xl font-bold text-white">Vous êtes perdu ?</h1>
        <Link to={"/"}>
          <button className="p-2 text-center text-white uppercase bg-blue-600 rounded-md hover:bg-red-600 transition-all duration-300 ease-linear shadow-2xl">
            Retour à l'accueil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
