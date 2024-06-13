import { useQuery } from "@tanstack/react-query";

import {getUserOne} from "../../utils/toDelete"
const TestUseQuery = ({userId}:{userId:number}) => {



  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery({queryKey:["userTest",userId], queryFn:getUserOne});
  if (isLoading) return <p>chargement</p>;
  if (isError) return <p>erreur</p>;
  return <p>{user?.firstName??"Bonjour"}</p>
};

export default TestUseQuery
