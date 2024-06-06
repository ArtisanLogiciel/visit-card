import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export const DisplayQrCode = () => {
  const [user, setUser] = useState<User | null | string>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) {
        setUser(currentUser?.email);
      }
      setUser(null);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-sreen h-screen overflow-hidden">
      <h1 className="text-2xl mb-7 text-black font-extrabold">
        {" "}
        Votre Qrcode à partager
      </h1>
      <QRCode
        value={`http://visit-card.online/display-card/${user}`}
        renderAs="canvas"
      />
    </div>
  );
};
