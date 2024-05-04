import { UserCredential } from "firebase/auth";
import React from "react";
import useAuthUser from "../hooks/useAuthUser";

export type UserContextProvider = {
  authUser: UserCredential | null;
  loginUser: (email: string, password: string) => void;
  registerUser: (email: string, password: string) => void;
  logoutUser: () => void;
  errorFirebaseUser: string | null;
};
// export type UserContextProvider = {
//   loginUser: (email: string, password: string) => void;
//   errorFirebaseUser: string | null; // Add 'errorFirebaseUser' property
//   authUser: firebase.User | null;
// };
export const UserContext = React.createContext<UserContextProvider | null>(
  null
);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser, loginUser, registerUser, logoutUser, errorFirebaseUser } =
    useAuthUser();

  return (
    <UserContext.Provider
      value={React.useMemo(
        () => ({
          authUser,
          loginUser,
          registerUser,
          logoutUser,
          errorFirebaseUser,
        }),
        [authUser, loginUser, registerUser, logoutUser, errorFirebaseUser]
      )}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
