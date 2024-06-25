import { Route, Routes } from "react-router-dom";
import CardUserById from "../AuthentifiedUser/CardUserById";

import { ShareQrCode } from "../AuthentifiedUser/qrcode/ShareQrCode";

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
      <Route path="/card/:cardId" element={<CardUserById />} />
      <Route path="/display-qrcode" element={<ShareQrCode />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
