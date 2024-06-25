import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useAccount from "@/hooks/useAccount";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useQuery } from "@tanstack/react-query";
import QRCode from "qrcode.react";
import { useContext, useState } from "react";

export const ShareQrCode = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { getCardId, cardIdQueryKey } = useAccount(authUser);

  const { data: cardId } = useQuery({
    queryKey: cardIdQueryKey,
    queryFn: getCardId,
  });

  const [toast, setToast] = useState(false);
  const linkSharable = `${window.location.host}/card/${cardId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(linkSharable);
    setToast(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
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
    <div className="flex flex-col items-center h-screen mt-4 space-y-3 overflow-hidden w-sreen">
      <h1 className="text-2xl font-extrabold text-black mb-7">
        Partage de votre carte
      </h1>
      <QRCode value={linkSharable} renderAs="canvas" />
      <p className="mt-2 text-center underline">{linkSharable}</p>
      <button onClick={copyLink} className="p-2 mt-4 bg-slate-400">
        Copier dans le presse-papier
      </button>
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Copié dans le presse papier"
        action={action}
      />
    </div>
  );
};
