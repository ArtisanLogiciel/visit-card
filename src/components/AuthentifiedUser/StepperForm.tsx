import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import { Card } from "@/types/card";
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

  const {
    getImage,
    downloadImage,

    imageURLQueryKey,
    fileQueryKey,
  } = useImageProfil(authUser);
  const { getCard, cardQueryKey } = useCard(authUser);

  const {
    data: cardQuery,
    isSuccess: isSuccessCard,
    isLoading,
  } = useQuery({
    queryKey: cardQueryKey,
    queryFn: getCard,
  });
  const { data: imageURLQuery } = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: getImage,
  });
  const fileRef = useRef<File | null>(null);

  const cardRef = useRef<Card>({
    firstname: "",
    job: "",
    lastname: "",
    compagny: "",

    email: "",
  });

  const updateCardRef = (data: Partial<Card>) => {
    cardRef.current = { ...cardRef.current, ...data };
  };

  const { data: fileQuery, isSuccess: isFileSuccess } = useQuery({
    queryKey: fileQueryKey,
    queryFn: () => downloadImage(imageURLQuery),
  });

  useEffect(() => {
    if (cardQuery) {
      cardRef.current = { ...cardQuery };
    }
    if (fileQuery && isFileSuccess) fileRef.current = fileQuery;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardQuery, fileQuery, isSuccessCard, isFileSuccess]);

  if (isLoading) return <Skeleton />;
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
          <FormGeneral
            handleNext={handleNext}
            cardRef={cardRef}
            updateCardRef={updateCardRef}
          />
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
