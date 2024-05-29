import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { QueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
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
  }, [ getCard]);

  return (
    <div className="flex flex-col items-center min-h-screen space-y-3 align-middle">
      <p>Utilisateur connecté {authUser?.user.email}</p>
      <EditCardButton/>

      <ViewCardButton/>
      <button onClick={()=>{throw new Error ("erreur fictif")}}>Lever une erreur</button>
      

      <br />
    </div>
  );
};

export default Home;
