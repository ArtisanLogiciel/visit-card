import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 text-3xl font-bold">
        Cartes de visites Authentification
      </h1>
      <Link to="/login">
        <button>S'authentifier</button>
      </Link>

      <Link to="/register">
        <button>S'inscrire</button>
      </Link>
    </div>
  );
};

export default Home;
