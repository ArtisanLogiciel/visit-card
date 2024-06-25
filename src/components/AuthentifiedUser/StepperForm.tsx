import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import { CardFirebase } from "@/types/card";
import Skeleton from "@mui/material/Skeleton";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef } from "react";
import useSteps from "../../hooks/useStep";
import FormCompagny from "./createCard/FormCompagny";
import FormContact from "./createCard/FormContact";
import FormGeneral from "./createCard/FormGeneral";
import FormImage from "./createCard/FormImage";

const StepperForm = () => {
  const { steps, activeStep, handleNext, handleBack } = useSteps();

  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard, cardQueryKey } = useCard(authUser);

  const {
    data: cardQuery,
    isLoading,
  } = useQuery({
    queryKey: cardQueryKey,
    queryFn: getCard,
  });

  const fileRef = useRef<File | null>(null);
  const cardRef = useRef<CardFirebase>({
    firstname: "",
    job: "",
    lastname: "",
    compagny: "",
    email: "",
    address: null,
    city: null,
    country: null,
    zipcode: null,
    phoneDesktop: null,
    phoneMobile: null,
  } as CardFirebase);

  useEffect(() => {
    if (cardQuery) {
      cardRef.current = { ...cardQuery };
    }
  }, [cardQuery]);
  

  if (isLoading) return <div className="flex justify-center"><Skeleton variant="rectangular" width={"80%"} height={"200px"} /></div>;
  return (
    <div className="flex flex-col mt-4">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length - steps.length ? (
        <>
          <FormGeneral handleNext={handleNext} cardRef={cardRef} />
        </>
      ) : null}
      {activeStep === steps.length - (steps.length - 1) ? (
        <FormImage
          handleNext={handleNext}
          handleBack={handleBack}
          fileRef={fileRef}
        />
      ) : null}
      {activeStep === steps.length - (steps.length - 2) ? (
        <FormCompagny
          handleNext={handleNext}
          handleBack={handleBack}
          cardRef={cardRef}
        />
      ) : null}
      {activeStep === steps.length - (steps.length - 3) ? (
        <FormContact
          handleBack={handleBack}
          cardRef={cardRef}
          fileRef={fileRef}
        />
      ) : null}
    </div>
  );
};

export default StepperForm;
