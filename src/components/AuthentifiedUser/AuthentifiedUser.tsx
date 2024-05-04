import { Route, Routes } from "react-router-dom";
import CreateCard from "./CreateCard";
import { CreatedCard } from "./CreatedCard";
import Home from "./Home";
import { PreviewCard } from "./PreviewCard";

const AuthentifiedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-card" element={<CreateCard />} />
      <Route path="/created-card" element={<CreatedCard />} />
      <Route path="/preview-card" element={<PreviewCard />} />
    </Routes>
  );
};

export default AuthentifiedUser;
