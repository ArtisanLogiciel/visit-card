import { Route, Routes } from "react-router-dom";
import CreateCard from "./CreateCard";
import { CreatedCard } from "./CreatedCard";
import Home from "./Home";

const AuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-card" element={<CreateCard />} />
      <Route path="/created-card" element={<CreatedCard />} />
    </Routes>
  );
};

export default AuthentifiedUser;
