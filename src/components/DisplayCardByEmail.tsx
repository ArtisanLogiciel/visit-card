import { Skeleton } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import displayCard from "../hooks/useFirestore";

const DisplayCardByEmail = () => {
  const { email } = useParams();
  const queryClient = new QueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["card by email"],
    queryFn: () => (email ? displayCard(email) : Promise.resolve(null)),
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Une erreur est survenue</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        {email && email}
        {data && (
          <div>
            <h2>
              {data.firstname} {data.lastname}
            </h2>
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
};
export default DisplayCardByEmail;
