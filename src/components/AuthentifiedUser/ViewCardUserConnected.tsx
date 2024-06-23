import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import CardTabs from "./card/CardTabs";

const ViewCardUserConnected = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard } = useCard(authUser);

  const { getImageURLSourceImage, imageURLQueryKey } = useImageProfil(authUser);

  const { data: urlImage } = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: getImageURLSourceImage,
  });

  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["card"], queryFn: getCard });

  if (isLoading) return <p>Chargement</p>;
  if (!card) return <p>Pas de carte de visite</p>;

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Ma Carte de visite </h1>
        <div className="flex flex-col justify-center">
          <CardTabs
            card={card}
            isLoading={isLoading}
            isError={isError}
            urlImage={urlImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewCardUserConnected;
