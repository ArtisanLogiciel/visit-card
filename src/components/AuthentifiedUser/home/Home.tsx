import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCards";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import EditCardButton from "./EditCardButton";
import ViewCardButton from "./ViewCardButton";

const Home = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard } = useCard(authUser);

  const queryClient = useQueryClient();
  useEffect(() => {
    const prefetchCard = async () => {
      await queryClient.prefetchQuery({ queryKey: ["card"], queryFn: getCard });
    };
    prefetchCard();
  }, [getCard]);

  return (
    <div className="flex flex-col items-center min-h-screen space-y-3 align-middle">
      <Link to="/display-qrcode">
        <button className="p-3 text-white transition-all duration-300 ease-linear bg-blue-600 rounded-md shadow-xl hover:bg-blue-400 m-">
          Partager votre carte de visite
        </button>
      </Link>
      <EditCardButton />
      <ViewCardButton />

      <br />
    </div>
  );
};

export default Home;
