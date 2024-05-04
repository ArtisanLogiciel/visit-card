import { Link } from "react-router-dom";

export const CreatedCard = () => {
  return (
    <div>
      <h1 className="text-4xl">Carte de visite crée</h1>
      <Link to="/preview-card">
        <button>Voir votre carte</button>
      </Link>
    </div>
  );
};
