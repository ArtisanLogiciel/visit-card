import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
import useFirestore from "../../hooks/useFirestore";
import ButtonLogout from "../elements/ButtonLogout";

const Home = () => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { createEmptyCard, isCardCreated, checkCardCreated } =
    useFirestore(authUser);

  useEffect(() => {
    checkCardCreated();
  }, [checkCardCreated]);

  return (
    <div className="flex flex-col items-center min-h-screen align-middle animate-fade-in">
      <ButtonLogout />
      <p>Utilisateur connecté {authUser?.user.email}</p>

      {isCardCreated ? (
        <Link to={"/create-card"}>Modifier la carte de visite</Link>
      ) : (
        <Link to="/create-card" onClick={createEmptyCard}>
          Créer la carte de visite
        </Link>
      )}
    </div>
  );
};

export default Home;
