import React from "react";

const Smartphone = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor: string;
}) => {
  return (
    <div
      data-testid="smartphone"
      className={`w-1/3 sm:w-1/4 md:w-1/5 aspect-[9/16] rounded-md outline outline-gray-700 outline-8 flex items-center box-border justify-center ${bgColor} `}
    >
      {children}
    </div>
  );
};

export default Smartphone;
