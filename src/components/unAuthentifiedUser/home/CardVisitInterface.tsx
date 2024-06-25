// import Card from "@/components/AuthentifiedUser/card/Card";

import fakePerson from "@/assets/fakePerson.jfif";
import ImageProfil from "@/components/ImageProfil";
import { Card as CardType } from "@/types/card";
import { useQuery } from "@tanstack/react-query";

const fakeCard: CardType = {
  firstname: "Jean",
  lastname: "Dupond",
  compagny: "THE COMPAGNY",
  country: "France",
  email: `jean.dupond@thecompagny.fr`,
  job: "Consultant",
  phoneDesktop: "+000000",
  phoneMobile: "+111111",
  zipcode: "21000",
};

const CardVisitInterface = () => {
  const fakeUrlQuery = useQuery({
    queryKey: ["fake"],
    queryFn: () => fakePerson,
  });

  return (
    <div className="flex flex-col items-center justify-center w-5/6 sm:w-[400px] p-4 shadow-lg bg-blue-50 text-xs">
      <ImageProfil url={fakeUrlQuery} size={60} />

      <h1 className="font-bold">
        {fakeCard.firstname} {fakeCard.lastname}
      </h1>
      <p>
        {fakeCard.job} , {fakeCard.compagny}
      </p>
      <div className="mt-3"></div>
    </div>
  );
};

export default CardVisitInterface;
