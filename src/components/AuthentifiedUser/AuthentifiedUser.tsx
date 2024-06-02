import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import StepperForm from "./StepperForm";
import ViewCardUserByEmail from "./ViewCardUserByEmail";
import ViewCardUserConnected from "./ViewCardUserConnected";
import Header from "./createCard/header/Header";
import Home from "./home/Home";

const AuthentifiedUser = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-card" element={<StepperForm />} />
        <Route path="/display-my-card" element={<ViewCardUserConnected />} />
        <Route path="/display-card/:email" element={<ViewCardUserByEmail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AuthentifiedUser;
