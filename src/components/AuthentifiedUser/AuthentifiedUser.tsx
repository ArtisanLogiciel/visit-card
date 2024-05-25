import { Route, Routes } from "react-router-dom";
import { CreatedCard } from "./CreatedCard";
import Home from "./Home";
import { PreviewCard } from "./PreviewCard";
import StepperForm from "./StepperForm";
import Header from "./createCard/header/Header";

const AuthentifiedUser = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-card" element={<StepperForm />} />
        <Route path="/created-card" element={<CreatedCard />} />
        <Route path="/preview-card" element={<PreviewCard />} />
      </Routes>
    </div>
  );
};

export default AuthentifiedUser;
