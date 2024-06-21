import { Link } from "react-router-dom";

const DeletedCard = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-xl text-red-600 font-bold">
        Votre carte a été supprimée avec succès
      </h1>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-400 transition-all duration-300 ease-linear text-white px-4 py-2 rounded-md"
      >
        Accéder à mon compte
      </Link>
    </div>
  );
};
export default DeletedCard;
