import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

const DeleteCard = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { deleteImage, imageURLMutationKey, fileQueryKey, imageURLQueryKey } =
    useImageProfil(authUser);

  const { deleteCard, cardMutationKey, cardQueryKey, isCardCreatedQueryKey } =
    useCard(authUser);

  const query = useQueryClient();

  const deleteImageMutation = useMutation({
    mutationKey: imageURLMutationKey,
    mutationFn: deleteImage,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: fileQueryKey });
      query.invalidateQueries({ queryKey: imageURLQueryKey });
    },
  });

  const deleteCardMutation = useMutation({
    mutationKey: cardMutationKey,
    mutationFn: deleteCard,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: cardQueryKey });
      query.invalidateQueries({ queryKey: isCardCreatedQueryKey });
    },
  });

  const handleDelete = async () => {
    await deleteImageMutation.mutate();
    await deleteCardMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <button
        onClick={handleDelete}
        className="px-4 py-2 text-white transition-all duration-300 ease-linear bg-blue-600 rounded-md hover:bg-blue-400"
      >
        Supprimer ma carte de visite
      </button>
      <p>
        {deleteCardMutation.isSuccess && "La carte de  visite a été supprimé"}
      </p>
      <p>
        {deleteCardMutation.isError &&
          `Une erreur s'est produite
          ${deleteCardMutation.error.message}
          }`}
      </p>
    </div>
  );
};
export default DeleteCard;
