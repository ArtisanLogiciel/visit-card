import { ReactNode } from "react";

const CardContainerGeneral = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center">
      {children}
    </div>
  );
};

export default CardContainerGeneral;