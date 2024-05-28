import { Link } from "react-router-dom";

import Logo from "../elements/Logo";

const Banner = () => {
  return (
    <header className="flex items-center justify-between mt-2 mb-8 ">
      <Logo />
      <Link to="/login">
        <button className="p-2 mr-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 transition-all hover:shadow-2xl duration-300 ease-in-out">
          Se connecter
        </button>
      </Link>
    </header>
  );
};

export default Banner;
