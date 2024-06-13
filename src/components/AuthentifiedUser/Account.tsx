import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useAccount from "@/hooks/useAccount";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getAccount } = useAccount(authUser);
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["account", authUser?.uid],
    queryFn: getAccount,
  });
  if (isLoading) return <p>Chargement...</p>;
  if (isError)
    return (
      <p>{import.meta.env.DEV ? error.message : "Une erreur est survenue"}</p>
    );
  return (
    <div className="flex flex-col items-center">
      <h1>Mon compte</h1>
      <p>Prénom : {account?.firstname ?? "Non renseigné"}</p>
      <p>Nom : {account?.lastname ?? "Non renseigné"}</p>
      <p>Email d'inscription : {account?.mailSignIn ?? "Non renseigné"}</p>
      <Link to="update">
        <button className="p-2 mt-4 bg-red-500 rounded-md"> Modifier mon profil</button>
      </Link>
    </div>
  );
};

export default Account;
