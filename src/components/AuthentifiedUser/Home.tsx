import React from "react";
import { Link } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
import ButtonLogout from "../elements/ButtonLogout";

const Home = () => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  return (
    <div className="flex flex-col align-middle items-center min-h-screen">
      <ButtonLogout />
      <p>Utilisateur connecté {authUser?.user.email}</p>

      <Link to={"/create-card"}>Créer votre carte de visite</Link>
    </div>
  );
};

export default Home;
