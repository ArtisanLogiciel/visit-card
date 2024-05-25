import { Route, Routes } from "react-router-dom";
import StepperForm from "./StepperForm";
import { ViewCard } from "./ViewCard";
import Header from "./createCard/header/Header";
import Home from "./home/Home";

const AuthentifiedUser = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-card" element={<StepperForm />} />
        <Route path="/created-card" element={<ViewCard />} />
        <Route path="/view-card" element={<ViewCard />} />
      </Routes>
    </div>
  );
};

export default AuthentifiedUser;
