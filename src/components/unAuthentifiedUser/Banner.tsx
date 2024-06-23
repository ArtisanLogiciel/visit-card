import { Link } from "react-router-dom";

import Logo from "../elements/Logo";

const Banner = () => {
  return (
    <header
      className="flex items-center justify-between mt-2 mb-8"
      data-testid="banner"
    >
      <Logo />
      <Link to="/login">
        <button className="p-2 mr-2 text-white transition-all duration-300 ease-in-out bg-blue-400 rounded-md hover:bg-blue-600 hover:shadow-2xl">
          Se connecter
        </button>
      </Link>
    </header>
  );
};

export default Banner;
