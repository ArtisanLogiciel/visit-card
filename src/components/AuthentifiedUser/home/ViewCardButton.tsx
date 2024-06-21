import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const ViewCardButton = () => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { isCardCreated:isCardCreactedFunction , isCardCreatedQueryKey} = useCard(authUser);

  const {
    data: isCardCreated,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useQuery({ queryKey: isCardCreatedQueryKey, queryFn: isCardCreactedFunction });

  const displayViewCardButton = isCardCreated ? (
    <Link to={"/display-my-card"}>
      <button className="p-2 bg-red-600 rounded-sm">
        Afficher la carte de visite
      </button>
    </Link>
  ) : null;

  return (
    <div>
      {isError && (
        <p>
          Une erreur est survenue {import.meta.env.DEV ? error.message : null}
        </p>
      )}
      {isLoading && <p>Chargement en cours ...</p>}
      {isSuccess && displayViewCardButton}
    </div>
  );
};

export default ViewCardButton;
