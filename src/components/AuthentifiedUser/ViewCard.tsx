import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const ViewCard = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard } = useFirestore(authUser);
  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["card"], queryFn: getCard });

  if (!card) return;
  const {
    firstname,
    lastname,
    bgColor,
    compagny,
    email,
    textColor,
    address,
    avatarUrl,
    city,
    country,
    phoneDesktop,
    phoneMobile,
    zipcode,
  } = card;
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl">Carte de visite </h1>
      {isLoading && <p>Chargement...</p>}
      {isError && <p>Une erreur est survenue</p>}
      <p>Prénom : {firstname}</p>
      <p>Nom : {lastname}</p>
      <p>Couleur de fond : {bgColor}</p>
      <p>Compagnie : {compagny}</p>
      <p>Email : {email}</p>
      <p>Couleur du texte : {textColor}</p>
      <p>Adresse : {address}</p>
      <p>URL de l'avatar : {avatarUrl}</p>
      <p>Ville : {city}</p>
      <p>Pays : {country}</p>
      <p>Téléphone fixe : {phoneDesktop}</p>
      <p>Téléphone mobile : {phoneMobile}</p>
      <p>Code postal : {zipcode}</p>
    </div>
  );
};
