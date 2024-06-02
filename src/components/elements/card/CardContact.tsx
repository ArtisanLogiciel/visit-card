import { CardContact as CardContactType } from "@/types/card";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CardContainerTab from "./CardContainerTab";

type CardContactPartial = Partial<CardContactType>;

const CardContact = ({
  email,
  phoneDesktop,
  phoneMobile,
}: CardContactPartial) => {
  return (
    <div>
      <CardContainerTab>
        <p>
          <EmailIcon />
          {email}
        </p>
        <p>
          <PhoneIcon />
          {phoneDesktop ?? ""}
        </p>
        <p>
          <SmartphoneIcon />
          {phoneMobile ?? ""}
        </p>
      </CardContainerTab>
    </div>
  );
};

export default CardContact;
