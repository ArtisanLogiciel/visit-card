import CardTabs from "../elements/card/CardTabs";

export const ViewCard = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Carte de visite </h1>
        <div className="flex justify-center">
          <CardTabs />
        </div>
      </div>
    </div>
  );
};
