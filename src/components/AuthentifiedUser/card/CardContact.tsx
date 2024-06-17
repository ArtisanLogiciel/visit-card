import { CardContact as CardContactType } from "@/types/card";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CardContainerContact from "./CardContainerContact";

type CardContactPartial = Partial<CardContactType>;

const CardContact = ({
  email,
  phoneDesktop,
  phoneMobile,
}: CardContactPartial) => {
  return (
    <div>
      <CardContainerContact>
        <div className="flex justify-start">
          <EmailIcon />
          <span>{email}</span>
        </div>
        <div className="flex justify-start">
          <PhoneIcon />
          <span>{phoneDesktop ?? ""}</span>
        </div>
        <div className="flex justify-start">
          <SmartphoneIcon />
          <span>{phoneMobile ?? ""}</span>
        </div>
      </CardContainerContact>
    </div>
  );
};

export default CardContact;
