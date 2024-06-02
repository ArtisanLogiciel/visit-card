import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import CardTabs from "../elements/card/CardTabs";

const ViewCardUserConnected = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard } = useFirestore(authUser);
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
        <div className="flex justify-center">
          <CardTabs card={card} isLoading={isLoading} isError={isError} />
        </div>
      </div>
    </div>
  );
};

export default ViewCardUserConnected;
