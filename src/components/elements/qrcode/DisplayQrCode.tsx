import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import QRCode from "qrcode.react";
import { useContext } from "react";

export const DisplayQrCode = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden w-sreen">
      <h1 className="text-2xl font-extrabold text-black mb-7">
        {" "}
        Votre carte de visite à partager
      </h1>
      <QRCode
        value={`http://visit-card.online/display-card/${authUser?.email}`}
        renderAs="canvas"
      />
    </div>
  );
};
