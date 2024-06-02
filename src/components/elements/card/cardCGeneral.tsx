import { CardGeneral as CardGeneralType } from "@/types/card";
import CardContainerTab from "./CardContainerTab";

type CardGeneralPartial = Partial<CardGeneralType>;
const CardCGeneral = ({ firstname, lastname }: CardGeneralPartial) => {
  return (
    <CardContainerTab>
      <p>
        {firstname ?? ""} {lastname ?? ""}
      </p>
    </CardContainerTab>
  );
};

export default CardCGeneral;
