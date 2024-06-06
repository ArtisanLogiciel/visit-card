import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { QueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import EditCardButton from "./EditCardButton";
import ViewCardButton from "./ViewCardButton";

const Home = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard } = useFirestore(authUser);

  useEffect(() => {
    const queryClient = new QueryClient();
    const prefetchCard = async () => {
      await queryClient.prefetchQuery({ queryKey: ["card"], queryFn: getCard });
    };
    prefetchCard();
  }, [getCard]);

  return (
    <div className="flex flex-col items-center min-h-screen space-y-3 align-middle">
      <p>Utilisateur connecté {authUser?.email}</p>
      <Link to="/display-qrcode">
        <button className="bg-blue-600 text-white rounded-md shadow-xl hover:bg-blue-400 transition-all duration-300 ease-linear m- p-3">
          Voir le Qrcode qui affichera votre carte
        </button>
      </Link>
      <EditCardButton />
      <ViewCardButton />

      <br />
    </div>
  );
};

export default Home;
