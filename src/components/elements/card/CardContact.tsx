import { CardContact as CardContactType } from "@/types/card";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CardContainer from "./CardContainer";

type CardContactPartial = Partial<CardContactType>;

const CardContact = ({
  email,
  phoneDesktop,
  phoneMobile,
}: CardContactPartial) => {
  return (
    <div>
      <CardContainer>
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
      </CardContainer>
    </div>
  );
};

export default CardContact;
