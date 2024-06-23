import { Link } from "react-router-dom";
import EditCardButton from "./EditCardButton";
import ViewCardButton from "./ViewCardButton";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen space-y-3 align-middle">
      <Link to="/display-qrcode">
        <button className="p-3 text-white transition-all duration-300 ease-linear bg-blue-600 rounded-md shadow-xl hover:bg-blue-400 m-">
          Partager votre carte de visite
        </button>
      </Link>
      <EditCardButton />
      <ViewCardButton />

      <br />
    </div>
  );
};

export default Home;
