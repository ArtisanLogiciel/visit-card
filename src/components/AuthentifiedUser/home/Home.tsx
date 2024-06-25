import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import PreviewCard from "@/components/PreviewCard";
import useCard from "@/hooks/useCard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import FirstCardCreation from "../FirstCardCreation";

const Home = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { isCardCreated, isCardCreatedQueryKey } = useCard(authUser);

  const { data: isCardCreatedQuery } = useQuery({
    queryKey: isCardCreatedQueryKey,
    queryFn: isCardCreated,
  });
  return (
    <div className="flex justify-center ">
      {isCardCreatedQuery ? <PreviewCard /> : <FirstCardCreation />}
    </div>
  );
};

export default Home;
