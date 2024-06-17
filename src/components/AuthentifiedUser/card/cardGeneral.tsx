import ImageProfil from "@/components/ImageProfil";
import { CardGeneral as CardGeneralType } from "@/types/card";
import CardContainerGeneral from "./CardContainerGeneral";

type CardGeneralPartial = Partial<CardGeneralType>;
const CardGeneral = ({ firstname, lastname }: CardGeneralPartial) => {
  return (
    <div className="flex space-x-3">
      <ImageProfil />
      <CardContainerGeneral>
        <p>
          {firstname ?? ""} {lastname ?? ""}
        </p>
      </CardContainerGeneral>
    </div>
  );
};

export default CardGeneral;
