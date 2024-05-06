import { Route, Routes } from "react-router-dom";
import LoginUser from "./LoginUser";
import SignUpUser from "./SignUpUser";
import Home from "./home/Home";

const UnAuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/register" element={<SignUpUser />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
