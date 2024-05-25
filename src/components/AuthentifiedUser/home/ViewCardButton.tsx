import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const ViewCardButton = () => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { checkCardCreated } = useFirestore(authUser);

  const {
    data: isCardCreated,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ["isCardCreated"], queryFn: checkCardCreated });

  const displayViewCardButton = isCardCreated ? (
    <Link to={"/view-card"}>
      <button className="p-2 bg-red-600 rounded-sm">
        Afficher la carte de visite
      </button>
    </Link>
  ) : null;

  return (
    <div>
      {isError && <p>Une erreur est survenue</p>}
      {isLoading && <p>Chargement en cours ...</p>}
      {isSuccess && displayViewCardButton}
    </div>
  );
};

export default ViewCardButton;
