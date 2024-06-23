import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";

const DeleteCardButton = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { isCardCreated, isCardCreatedQueryKey } = useCard(authUser);

  const { data } = useQuery({
    queryKey: isCardCreatedQueryKey,
    queryFn: isCardCreated,
  });
  return data ? (
    <Link to={"delete-card"} className="underline">
      Supprimer la carte de visite
    </Link>
  ) : null;
};

export default DeleteCardButton;
