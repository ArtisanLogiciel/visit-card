import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center my-8 space-y-4">
      <h1 className="text-3xl font-bold text-center ">
        La carte de visite <br />
        <span className="text-red-800">des professionels</span>
      </h1>
      <p>Nouveau ?</p>
      <Link
        to="/sign-up"
        className="self-center p-2 text-white bg-blue-600 rounded-md hover:bg-blue-400 transition-all hover:shadow-2xl duration-300 ease-in-out"
      >
        <button>Créer ma carte de visite</button>
      </Link>
      <h2 className="text-center font-bold">
        Passez au numérique. Partagez vos cartes de visite ave un simple QR code
      </h2>
    </div>
  );
};

export default CallToAction;
