import AccountForm from "@/__tests__/authentifiedUser/AccountForm";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";

import Account from "./Account";
import DeleteCard from "./DeleteCard";
import StepperForm from "./StepperForm";

import CardUserById from "./CardUserById";
import CardUserConnected from "./CardUserConnected";
import Header from "./createCard/header/Header";
import Home from "./home/Home";
import { ShareQrCode } from "./qrcode/ShareQrCode";

const AuthentifiedUser = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create-card" element={<StepperForm />} />
        <Route path="/edit-card" element={<StepperForm />} />
        <Route path="/card" element={<CardUserConnected />} />
        <Route path="/card/:cardId" element={<CardUserById />} />
        <Route path="/share-card" element={<ShareQrCode />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/update" element={<AccountForm />} />
        <Route path="/delete-card" element={<DeleteCard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AuthentifiedUser;
