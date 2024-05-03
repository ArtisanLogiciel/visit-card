import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";

const UnAuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/register" element={<RegisterUser />} />
    </Routes>
  );
};

export default UnAuthentifiedUser;
