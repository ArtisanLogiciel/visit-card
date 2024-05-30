import { Link } from "react-router-dom";

const FallbackComponent = ({
  error,
  resetErrorBoundary,
}: {
  error: Error | null;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <h1>Une erreur s'est produite</h1>
      {import.meta.env.DEV ? (
        <p>Détail de l'erreur : {error?.message}</p>
      ) : null}
      <br/>
      <Link to={"/"} className="uppercase">
        <button onClick={resetErrorBoundary} className="bg-red-700 rounded-sm p-2 uppercase">Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default FallbackComponent;
