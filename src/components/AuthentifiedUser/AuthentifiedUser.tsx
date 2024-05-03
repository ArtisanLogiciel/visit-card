import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreateCard from "./CreateCard";

const AuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-card" element={<CreateCard />} />
    </Routes>
  );
};

export default AuthentifiedUser;
