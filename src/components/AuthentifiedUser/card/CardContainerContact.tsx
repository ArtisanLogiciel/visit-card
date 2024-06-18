import { ReactNode } from "react";

const CardContainerContact = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col space-y-2">
      {children}
    </div>
  );
};

export default CardContainerContact;