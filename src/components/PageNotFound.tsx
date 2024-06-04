import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-white text-white">
      <div className="flex flex-col items-center gap-4 p-10 rounded-sm bg-black/45">
        <h1 className="text-2xl font-bold">Vous êtes perdu ?</h1>
        <Link to={"/"}>
          <button className="p-2 text-center text-white uppercase bg-red-600 rounded-sm">
            Retour à l'accueil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
