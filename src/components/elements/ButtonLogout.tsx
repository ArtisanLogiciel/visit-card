import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";

const ButtonLogout = () => {
  const { logoutUser } = React.useContext(UserContext) as UserContextProvider;
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return <button onClick={handleLogout}>Déconnexion</button>;
};

export default ButtonLogout;
