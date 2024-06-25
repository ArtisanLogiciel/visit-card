import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Snackbar } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';

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

  const navigate = useNavigate();

  const deleteCardMutation = useMutation({
    mutationKey: cardMutationKey,
    mutationFn: deleteCard,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: cardQueryKey });
      query.invalidateQueries({ queryKey: isCardCreatedQueryKey });
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleDelete = async () => {
    await deleteImageMutation.mutate();
    await deleteCardMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex items-center mx-4 space-x-2">
      <WarningIcon/>
      <p className="text-justify ">
        Appuyer sur le bouton ci-dessous effacera définitivement votre carte de
        visite et l'image de profil
      </p>
      </div>
      <button
        onClick={handleDelete}
        className="px-4 py-2 mt-4 text-white transition-all duration-300 ease-linear bg-blue-600 rounded-md hover:bg-blue-400"
      >
        Supprimer ma carte de visite
      </button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Carte de visite supprimée"
        action={action}
      />
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
