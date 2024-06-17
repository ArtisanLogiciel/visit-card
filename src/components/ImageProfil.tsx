import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import { useQuery } from "@tanstack/react-query";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useContext } from "react";

const storage = getStorage();

const ImageProfil = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const getImage = async () => {
    return await getDownloadURL(
      ref(storage, `images/card/${authUser?.uid}/profil.jpg`)
    ).then((url) => url);
  };
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["image", "card", authUser?.uid],
    queryFn: getImage,
  });
  if (isLoading) return <p>Chargement</p>;
  if (isError) return <p>error {import.meta.env.DEV ? error.message : null}</p>;

  return <img src={data} className="rounded-full size-24" />;
};

export default ImageProfil;
