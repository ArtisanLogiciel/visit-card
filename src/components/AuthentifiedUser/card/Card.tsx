import ImageProfil from "@/components/ImageProfil";
import { Card as CardType } from "@/types/card";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import Skeleton from "@mui/material/Skeleton";
import { UseQueryResult } from "@tanstack/react-query";
import CardLine from "./CardLine";
import CardLineAddress from "./CardLineAddress";

const Card = ({
  card,
  urlImage,
}: {
  card: UseQueryResult<CardType | null, Error>;
  urlImage: UseQueryResult<string | null, Error>;
}) => {
  if (card.isLoading)
    return <Skeleton variant="rectangular" width={"200px"} height={120} />;
  return (
    <div className="flex flex-col items-center justify-center w-5/6 sm:w-[400px] p-4 shadow-lg bg-blue-50">
      <ImageProfil url={urlImage} size={60} />

      <h1 className="font-bold">
        {card?.data?.firstname} {card.data?.lastname}
      </h1>
      <p>
        {card.data?.job} , {card.data?.compagny}
      </p>
      <div className="mt-3">
        <CardLine avatar={<PhoneIcon />} info={card.data?.phoneDesktop} />
        <CardLine avatar={<SmartphoneIcon />} info={card.data?.phoneMobile} />
        <CardLine avatar={<EmailIcon />} info={card.data?.email} />
        <CardLineAddress
          avatar={<LocationOnIcon />}
          address={card?.data?.address}
          city={card?.data?.city}
        />
      </div>
    </div>
  );
};

export default Card;
