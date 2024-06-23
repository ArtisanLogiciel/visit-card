import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useAccount from "@/hooks/useAccount";
import { useQuery } from "@tanstack/react-query";
import QRCode from "qrcode.react";
import { useContext } from "react";

export const ShareQrCode = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { getCardId, cardIdQueryKey } = useAccount(authUser);

  const { data: cardId } = useQuery({
    queryKey: cardIdQueryKey,
    queryFn: getCardId,
  });

  const linkSharable = `http://visit-card.online/display-card/${cardId}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden w-sreen">
      <h1 className="text-2xl font-extrabold text-black mb-7">
        {" "}
        Votre carte de visite à partager
      </h1>
      <QRCode value={linkSharable} renderAs="canvas" />
      <p>{linkSharable}</p>
    </div>
  );
};
