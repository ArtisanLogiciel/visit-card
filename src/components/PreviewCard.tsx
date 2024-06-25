import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import DeleteCardButton from "./AuthentifiedUser/home/DeleteCardButton";
import EditCardButton from "./AuthentifiedUser/home/EditCardButton";
import ShareCardButton from "./AuthentifiedUser/home/ShareCardButton";
import ViewCardButton from "./AuthentifiedUser/home/ViewCardButton";
import ImageProfil from "./ImageProfil";

const PreviewCard = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { getCard, cardQueryKey } = useCard(authUser);
  const { getImageURLSourceImage, imageURLQueryKey } = useImageProfil(authUser);

  const card = useQuery({ queryKey: cardQueryKey, queryFn: getCard });
  const url = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: getImageURLSourceImage,
  });

  if (url.isLoading) return <Skeleton />;
  if (card.isLoading) return <Skeleton />;
  return (
    <div className="flex flex-col items-center w-full space-y-3">
      <h1 className="text-lg font-bold">Ma carte</h1>
      <div className="relative flex flex-col w-5/6 px-3 py-6 sm:w-1/2 md:w-[300px] bg-blue-50 shadow-lg">
        <div className="absolute top-[-10px] right-3 space-x-1">
          <EditCardButton />
          <DeleteCardButton />
        </div>

        <div className="flex justify-around">
          <ImageProfil size={80} url={url.data} />
          <div>
            <h1>
              {card?.data?.firstname} {card.data?.lastname}
            </h1>
            <h2>
              {card?.data?.job},{" "}
              <span className="font-bold">{card.data?.compagny}</span>
            </h2>
          </div>
        </div>

        <div className="flex justify-around mt-4">
          <ViewCardButton />
          <ShareCardButton />
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
