import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
import useFirestore from "../../hooks/useFirestore";

const Home = () => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { createEmptyCard, checkCardCreated, getCard } = useFirestore(authUser);
  const navigate = useNavigate();

  const {
    data: isCardCreated,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ["isCardCreated"], queryFn: checkCardCreated });

  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchCard = async () => {
      await queryClient.prefetchQuery({ queryKey: ["card"], queryFn: getCard });
    };
    prefetchCard();
  }, [queryClient, getCard]);
  const handleEditCard = async () => {
    if (isCardCreated) {
      navigate("/create-card");
    } else {
      await createEmptyCard();
      navigate("/create-card");
    }
  };

  const displayEditCardButton = (
    <Link to={"/create-card"} onClick={handleEditCard}>
      <button className="p-2 bg-red-600 rounded-sm">
        Modifier la carte de visite
      </button>
    </Link>
  );

  return (
    <div className="flex flex-col items-center min-h-screen align-middle animate-fade-in">
      <p>Utilisateur connecté {authUser?.user.email}</p>
      {isError && <p>Une erreur est survenue</p>}
      {isLoading && <p>Chargement...</p>}
      {isSuccess && displayEditCardButton}
    </div>
  );
};

export default Home;
