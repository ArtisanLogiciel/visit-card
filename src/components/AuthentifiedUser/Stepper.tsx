import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import useSteps from "../../hooks/useStep";
import FormGeneral from "./createCard/FormGeneral";
import FormCompagny from "./createCard/FormCompagny";
import FormContact from "./createCard/FormContact";

const StepperTest = () => {
  const { steps, activeStep, handleNext , handleBack} = useSteps();




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
        <FormGeneral handleNext = {handleNext}/>
     
      ) : null}
      {activeStep === steps.length - (steps.length-1) ? (
        <FormCompagny handleNext={handleNext} handleBack = {handleBack}/>
      ) : null}
      {activeStep === steps.length - (steps.length-2) ? (
        <FormContact  handleBack = {handleBack} />
      ) : null}
    </div>
  );
};

export default StepperTest;
