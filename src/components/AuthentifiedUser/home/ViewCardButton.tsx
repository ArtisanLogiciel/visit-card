import { Link } from "react-router-dom";

const ViewCardButton = () => {
  return <Link to={"/card"} className="px-2 py-1 text-white bg-blue-500 rounded-sm">Voir</Link>;
};

export default ViewCardButton;
