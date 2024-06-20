import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardTabs from "./card/CardTabs";

const ViewCardUserConnected = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard, deleteCard } = useCard(authUser);
  const { deleteImage } = useImageProfil(authUser);
  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["card"], queryFn: getCard });
  const navigate = useNavigate();
  if (isLoading) return <p>Chargement</p>;
  if (!card) return <p>Pas de carte de visite</p>;
  const handleDeleteCard = () => {
    deleteCard();
    deleteImage();
    navigate("/delete-card");
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Ma Carte de visite </h1>
        <div className="flex flex-col justify-center">
          <CardTabs card={card} isLoading={isLoading} isError={isError} />
          <button
            className="p-2 text-white transition-all duration-150 ease-out bg-blue-700 rounded-lg hover:bg-blue-500"
            onClick={handleDeleteCard}
          >
            Supprimer la carte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCardUserConnected;
