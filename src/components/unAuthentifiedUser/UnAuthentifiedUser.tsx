import { Route, Routes } from "react-router-dom";

import PageNotFound from "../PageNotFound";
import Home from "./home/Home";
import LoginUser from "./login/LoginUser";
import SignUpUser from "./signUp/SignUpUser";
import DisplayCardByEmail from "../DisplayCardByEmail";

const UnAuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/sign-up" element={<SignUpUser />} />
      <Route path="/display-card/:email" element={<DisplayCardByEmail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
