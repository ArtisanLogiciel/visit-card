import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { SyntheticEvent, useContext, useState } from "react";
import CardCompagny from "./CardCompagny";
import CardContact from "./CardContact";
import CardCGeneral from "./cardCGeneral";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const CardTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = ( _event:SyntheticEvent,newValue: number) => {
    setValue(newValue);
  };

  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard } = useFirestore(authUser);
  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["card"], queryFn: getCard });
  const steps = {
    general: "Général",
    compagny: "Entreprise",
    contact: "Contact",
  };

  if (isLoading) return <p>Chargement</p>
  if (isError) return <p>Une erreur est survenue</p>
  return (
   
      <div className="sm:text-2xl">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs exemple"
        >
          <Tab label={steps.general} />
          <Tab label={steps.compagny} />
          <Tab label={steps.contact} />
        </Tabs>
        <CustomTabPanel index={0} value={value}>
          <CardCGeneral firstname={card?.firstname} lastname={card?.lastname} />
        </CustomTabPanel>
        <CustomTabPanel index={1} value={value}>
          <CardCompagny
            address={card?.address}
            city={card?.city}
            compagny={card?.compagny}
            country={card?.country}
            zipcode={card?.zipcode}
          />
        </CustomTabPanel>
        <CustomTabPanel index={2} value={value}>
          <CardContact email={card?.email} phoneDesktop={card?.phoneDesktop} phoneMobile={card?.phoneMobile}  />
        </CustomTabPanel>
     
    </div>
  );
};

export default CardTabs;
