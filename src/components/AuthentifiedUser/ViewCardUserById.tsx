import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import CardTabs from "./card/CardTabs";

import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";

const ViewCardUserById = () => {
  const { cardId } = useParams();
  
  const { getCardById } = useCard(null);

  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["card", cardId],
    queryFn: () => getCardById(cardId),
  });

  const { getURLImageByCardId, imageURLQueryKey } = useImageProfil(null);

  const { data: urlImage } = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: () => getURLImageByCardId(cardId),
  });

  if (isLoading) return <Skeleton />;
  if (!card) return <p>Pas de carte de visite</p>;
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Carte de visite</h1>
        <div className="flex justify-center">
          <CardTabs
            card={card}
            isLoading={isLoading}
            isError={isError}
            urlImage={urlImage}
          />
        </div>
        <Link to="/" className="p-2 bg-red-700 rounded-sm">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default ViewCardUserById;
