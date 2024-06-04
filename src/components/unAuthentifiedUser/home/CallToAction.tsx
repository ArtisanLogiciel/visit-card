import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center my-8 space-y-4" data-testid="call-to-action">
      <h1 className="text-3xl font-bold text-center ">
        La carte de visite <br />
        <span className="text-red-800">des professionels</span>
      </h1>
      <p>Nouveau ?</p>
      <Link
        to="/sign-up"
        className="self-center p-2 text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-md hover:bg-blue-400 hover:shadow-2xl"
      >
        <button>Créer ma carte de visite</button>
      </Link>
      <h2 className="font-bold text-center">
        Passez au numérique. Partagez vos cartes de visite ave un simple QR code
      </h2>
    </div>
  );
};

export default CallToAction;
