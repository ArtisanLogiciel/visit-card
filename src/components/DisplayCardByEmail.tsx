import useFirestore from "@/hooks/useFirestore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const DisplayCardByEmail = () => {
  const { email } = useParams();

  const emailQuery = email ?? "";

  const { displayCardByEmail } = useFirestore(null);

  const handleQueryCard = async () => {
    return await displayCardByEmail(emailQuery);
  };

  const {
    data: card,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: [`card/${emailQuery}`], queryFn: handleQueryCard });

  if (isLoading) {
    return <p>chargement</p>;
  }

  if (isError) {
    return (
      <p>
        Une erreur est survenue {import.meta.env.DEV ? error.message : null}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {card?.firstname ?? "Bonjour"}

      {card && (
        <div>
          <h2>
            {card.firstname} {card.lastname}
          </h2>
        </div>
      )}
    </div>
  );
};
export default DisplayCardByEmail;
