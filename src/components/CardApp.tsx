import React from "react";
import { UserContext, UserContextProvider } from "../Providers/usersProviders";
import AuthentifiedUser from "./AuthentifiedUser/AuthentifiedUser";
import UnAuthentifiedUser from "./unAuthentifiedUser/UnAuthentifiedUser";

const CardApp = () => {
  const { authUser } = React.useContext(UserContext) as UserContextProvider;
  return (
    <div className="flex justify-center mt-2">
      {authUser ? <AuthentifiedUser /> : <UnAuthentifiedUser />}
    </div>
  );
};

export default CardApp;
