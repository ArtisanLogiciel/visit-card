import AccountForm from "@/__tests__/authentifiedUser/AccountForm";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";

import Account from "./Account";
import DeleteCard from "./DeleteCard";
import StepperForm from "./StepperForm";

import ViewCardUserConnected from "./ViewCardUserConnected";
import Header from "./createCard/header/Header";
import Home from "./home/Home";
import { DisplayQrCode } from "./qrcode/DisplayQrCode";

const AuthentifiedUser = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create-card" element={<StepperForm />} />
        <Route path="/display-my-card" element={<ViewCardUserConnected />} />
        <Route path="/display-card/:cardId" element={<p>temporaire</p>} />
        <Route path="/display-qrcode" element={<DisplayQrCode />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/update" element={<AccountForm />} />
        <Route path="/delete-card" element={<DeleteCard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AuthentifiedUser;
