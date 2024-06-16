import { User } from "firebase/auth";
import { ReactNode, createContext, useMemo } from "react";
import useAuthUser from "../hooks/useAuthUser";

export type UserContextProvider = {
  authUser: User | null;
  loginUser: (email: string, password: string) => void;
  registerUser: (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => void;
  logoutUser: () => void;
  errorFirebaseUser: string | null;
};
// export type UserContextProvider = {
//   loginUser: (email: string, password: string) => void;
//   errorFirebaseUser: string | null; // Add 'errorFirebaseUser' property
//   authUser: firebase.User | null;
// };
export const UserContext = createContext<UserContextProvider | null>(null);
const UserProvider = ({ children }: { children: ReactNode }) => {
  const { authUser, loginUser, registerUser, logoutUser, errorFirebaseUser } =
    useAuthUser();

  return (
    <UserContext.Provider
      value={useMemo(
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
