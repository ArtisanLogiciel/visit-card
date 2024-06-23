import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import ImageProfil from "@/components/ImageProfil";
import useImageProfil from "@/hooks/useImageProfil";
import { CardGeneral as CardGeneralType } from "@/types/card";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import CardContainerGeneral from "./CardContainerGeneral";

type CardGeneralPartial = Partial<CardGeneralType>;
const CardGeneral = ({ firstname, lastname }: CardGeneralPartial) => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getImageURLSourceImage, imageURLQueryKey } = useImageProfil(authUser);

  const { data: url } = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: getImageURLSourceImage,
  });

  return (
    <div className="flex space-x-3">
      <ImageProfil size={80} url={url} />
      <CardContainerGeneral>
        <p>
          {firstname ?? ""} {lastname ?? ""}
        </p>
      </CardContainerGeneral>
    </div>
  );
};

export default CardGeneral;
