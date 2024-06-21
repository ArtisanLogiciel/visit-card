import { Route, Routes } from "react-router-dom";
import { DisplayQrCode } from "../AuthentifiedUser/qrcode/DisplayQrCode";
import ViewCardUserById from "../AuthentifiedUser/ViewCardUserById";
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
      <Route path="/display-card/:id" element={<ViewCardUserById />} />
      <Route path="/display-qrcode" element={<DisplayQrCode />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
