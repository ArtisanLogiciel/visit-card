import useCard from "@/hooks/useCards";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import CardTabs from "../elements/card/CardTabs";

const ViewCardUserByEmail = () => {
  const { email } = useParams<{ email: string }>();
  const emailQuery = email ?? "";

  const { getCardByEmail } = useCard(null);
  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`card/${emailQuery}`],
    queryFn: () => getCardByEmail(emailQuery),
  });
  if (isLoading) return <Skeleton />;
  if (!card) return <p>Pas de carte de visite</p>;
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Carte de visite </h1>
        <div className="flex justify-center">
          <CardTabs card={card} isLoading={isLoading} isError={isError} />
        </div>
        <Link to="/" className="bg-red-700 p-2 rounded-sm">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default ViewCardUserByEmail;
