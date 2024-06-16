import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditCardButton = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { createEmptyCard, checkCardCreated } = useCard(authUser);
  const navigate = useNavigate();

  const {
    data: isCardCreated,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useQuery({ queryKey: ["isCardCreated"], queryFn: checkCardCreated });

  const mutation = useMutation({
    mutationKey: ["isCardCreated"],
    mutationFn: createEmptyCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isCardCreated"] });
    },
  });

  const queryClient = useQueryClient();

  const handleEditCard = async () => {
    if (isCardCreated) {
      navigate("/create-card");
    } else {
      mutation.mutate();

      navigate("/create-card");
    }
  };

  const displayEditCardButton = (
    <Link to={"/create-card"} onClick={handleEditCard}>
      <button className="p-2 bg-red-600 rounded-sm">
        {isCardCreated
          ? "Modifier la carte de visite"
          : "Créer la carte de visite"}
      </button>
    </Link>
  );

  return (
    <div>
      {isError && (
        <p>
          Une erreur est survenue {import.meta.env.DEV ? error.message : null}
        </p>
      )}
      {isLoading && <p>Chargement...</p>}
      {isSuccess && displayEditCardButton}
    </div>
  );
};

export default EditCardButton;
