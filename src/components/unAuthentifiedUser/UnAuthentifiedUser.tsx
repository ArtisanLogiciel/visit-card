import { Route, Routes } from "react-router-dom";

import ViewCardUserByEmail from "../AuthentifiedUser/ViewCardUserByEmail";
import { DisplayQrCode } from "../elements/qrcode/DisplayQrCode";
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
      <Route path="/display-card/:email" element={<ViewCardUserByEmail />} />
      <Route path="/display-qrcode" element={<DisplayQrCode />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
