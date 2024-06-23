import { useState } from "react";

const useSteps = () => {
  const steps = ["General", "Ma photo", "Entreprise", "Contact"];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return { steps, activeStep, handleNext, handleBack };
};

export default useSteps;
