import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import CardTabs from "./card/CardTabs";

import useCard from "@/hooks/useCards";
import { getStorage, list, ref } from "firebase/storage";
import { useState } from "react";

const ViewCardUserByEmail = () => {
  const { id } = useParams<{ id: string }>();
  const [showImage, setShowImage] = useState<object | null | string>(null);
  const idQuery = id ?? "";

  async function displayImage() {
    // Create a reference under which you want to list
    const storage = getStorage();
    const listRef = ref(storage, `files/${idQuery}/`);

    // Fetch the first page of 100.
    const image = await list(listRef, { maxResults: 1 });
    return image;
  }
  displayImage()
    .then((image) => {
      setShowImage(image);
    })
    .catch((error) => {
      console.error("Erreur lors de l'affichage de l'image:", error);
    });
  const { getCardById } = useCard(null);
  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`card/${idQuery}`],
    queryFn: () => getCardById(idQuery),
  });
  if (isLoading) return <Skeleton />;
  if (!card) return <p>Pas de carte de visite</p>;
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Carte de visite</h1>
        <div className="flex justify-center">
          {showImage && <img src={showImage as string} alt="User Image" />}
          <CardTabs card={card} isLoading={isLoading} isError={isError} />
        </div>
        <Link to="/" className="p-2 bg-red-700 rounded-sm">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default ViewCardUserByEmail;
