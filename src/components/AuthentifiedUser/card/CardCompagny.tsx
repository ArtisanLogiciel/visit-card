import { CardCompagny as CardCompagnyType } from "@/types/card";
import BusinessIcon from "@mui/icons-material/Business";

import CardContainerTab from "./CardContainerTab";

type CardCompagyPartial = Partial<CardCompagnyType>;

const CardCompagny = ({
  compagny,
  address,
  city,
  country,
  zipcode,
}: CardCompagyPartial) => {
  return (
    <CardContainerTab>
      <p>
        <BusinessIcon />
        {compagny}
      </p>
      {address || city || country || zipcode ? (
        <div className="">
          {city && <p>Ville : {city}</p>}
          {country && <p>Pays : {country}</p>}
          {zipcode && <p>Code postal : {zipcode}</p>}
        </div>
      ) : null}
      <p></p>
      {address && <p>Adresse : {address}</p>}
    </CardContainerTab>
  );
};

export default CardCompagny;
