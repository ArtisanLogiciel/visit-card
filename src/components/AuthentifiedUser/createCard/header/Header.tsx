import logo from "@/assets/logo-app.png";
import ButtonLogout from "@/components/elements/ButtonLogout";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between mx-3">
      <Link to="/">
        <img src={logo} alt="logo" className="size-16" />
      </Link>

      <ButtonLogout />
    </div>
  );
};

export default Header;
