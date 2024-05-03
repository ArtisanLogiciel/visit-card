import React from "react";
import { UserContext } from "../../Providers/usersProviders";
import { useNavigate } from "react-router-dom";

const ButtonLogout = () => {
  const { logoutUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return <button onClick={handleLogout}>Déconnexion</button>;
};

export default ButtonLogout;
