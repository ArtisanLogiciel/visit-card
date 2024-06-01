import { Route, Routes } from "react-router-dom";
// import { CardDisplay } from "./Card";
import CardDisplayByEmail from "../DisplayCardByEmail";
import PageNotFound from "../PageNotFound";
import Home from "./home/Home";
import LoginUser from "./login/LoginUser";
import SignUpUser from "./signUp/SignUpUser";

const UnAuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/sign-up" element={<SignUpUser />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/:email" element={<CardDisplayByEmail />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
