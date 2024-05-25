import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import LoginUser from "./login/LoginUser";
import SignUpUser from "./signUp/SignUpUser";
import { Card } from "./Card";

const UnAuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/sign-up" element={<SignUpUser />} />
      <Route path="/:emailUser" element={<Card />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
