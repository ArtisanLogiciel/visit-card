import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
import useFirestore from "../../hooks/useFirestore";

const Home = () => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { createEmptyCard, checkCardCreated } = useFirestore(authUser);

  const {
    data: isCardCreated,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ["isCardCreated"], queryFn: checkCardCreated });

  const displayEditCard = isCardCreated ? (
    <Link to={"/create-card"}>
      <button className="p-2 bg-red-600 rounded-sm">
        Modifier la carte de visite
      </button>
    </Link>
  ) : (
    <Link to="/create-card" onClick={createEmptyCard}>
      <button className="p-2 bg-red-600 rounded-sm">
        Créer la carte de visite
      </button>
    </Link>
  );

  return (
    <div className="flex flex-col items-center min-h-screen align-middle animate-fade-in">
      <p>Utilisateur connecté {authUser?.user.email}</p>
      {isError && <p>Une erreur est survenue</p>}
      {isLoading && <p>Chargement...</p>}
      {isSuccess && displayEditCard}
    </div>
  );
};

export default Home;
