import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useState } from "react";
import Card from "./card/Card";

const CardUserById = () => {
  const { cardId } = useParams();

  const { getCardById } = useCard(null);

  const card = useQuery({
    queryKey: ["card", cardId],
    queryFn: () => getCardById(cardId),
  });

  const { authUser } = useContext<UserContextProvider | null>(UserContext);

  const { getURLImageByCardId, imageURLQueryKey } = useImageProfil(null);

  const urlImage = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: () => getURLImageByCardId(cardId),
  });

  const linkCard = `${window.location.host}${window.location.pathname}`;

  const [toast, setToast] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
  };

  const copyLink = () => {
    window.navigator.clipboard.writeText(linkCard);
    setToast(true);
  };

  const action = (
    <>
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
    </>
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full mt-2 space-y-4 text-center">
        <h1 className="text-2xl ">Carte de visite</h1>
        <Card card={card} urlImage={urlImage} />
        <p>{linkCard}</p>
        <button onClick={copyLink} className="underline">
          Copier le lien
        </button>
        <Snackbar
          open={toast}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Copié dans le presse papier"
          action={action}
        />
        {authUser ? (
          <Link to="/" className="block p-2 text-white bg-blue-500 rounded-sm">
            Accueil
          </Link>
        ) : (
          <Link
            to="/sign-up"
            className="block p-2 text-white bg-blue-500 rounded-sm"
          >
            Je m'inscris
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardUserById;
