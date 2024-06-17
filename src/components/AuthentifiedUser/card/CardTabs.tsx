import { Card } from "@/types/card";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import CardCompagny from "./CardCompagny";
import CardContact from "./CardContact";
import CardGeneral from "./cardGeneral";

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

const CardTabs = ({
  card,
  isLoading,
  isError,
}: {
  card: Card;
  isLoading: boolean;
  isError: boolean;
}) => {
  const [value, setValue] = useState(0);

  const handleChangeTabs = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const steps = {
    general: "Général",
    compagny: "Entreprise",
    contact: "Contact",
  };

  if (isLoading) return <p>Chargement</p>;
  if (isError) return <p>Une erreur est survenue</p>;
  return (
    <div className="sm:text-2xl">
      <Tabs
        value={value}
        onChange={handleChangeTabs}
        aria-label="basic tabs exemple"
      >
        <Tab label={steps.general} />
        <Tab label={steps.compagny} />
        <Tab label={steps.contact} />
      </Tabs>
      <CustomTabPanel index={0} value={value}>
        <CardGeneral firstname={card?.firstname} lastname={card?.lastname} />
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
        <CardContact
          email={card?.email}
          phoneDesktop={card?.phoneDesktop}
          phoneMobile={card?.phoneMobile}
        />
      </CustomTabPanel>
    </div>
  );
};

export default CardTabs;
