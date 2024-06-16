import logo from "@/assets/logo-app.png";
import { Link } from "react-router-dom";
import AccountButton from "../../AccountButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between mx-3">
      <Link to="/">
        <img src={logo} alt="logo" className="size-16" />
      </Link>

      <AccountButton />
    </div>
  );
};

export default Header;
