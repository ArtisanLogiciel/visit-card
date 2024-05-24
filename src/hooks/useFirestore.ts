import {
  Card,
  CardCompagny,
  CardContact,
  CardDesign,
  CardGeneral,
  CardSchema,
} from "@/types/card";
import { UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { database } from "./../firebase/firebase.config";

const useFirestore = (user: UserCredential | null) => {
  const initialCard: Card = {
    firstname: "",
    lastname: "",
    compagny: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    email: "",
    phoneDesktop: "",
    phoneMobile: "",
    avatarUrl: "",
    bgColor: "",
    textColor: "",
  };
  const [isCardCreated, setIsCardCreated] = useState(false);

  const COLLECTION_CARDS_FIRESTORE = "cards";

  const createEmptyCard = async () => {
    console.log(user?.user.email);
    if (!user?.user.email) return;
    await setDoc(
      doc(database, COLLECTION_CARDS_FIRESTORE, user?.user.email),
      initialCard
    );
  };

  const checkCardCreated = async () => {
    if (!user?.user.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user?.user.email);
    const docSnap = await getDoc(docRef);
    return setIsCardCreated(docSnap.exists());
  };

  const updateCard = async (
    data: CardCompagny | CardDesign | CardGeneral | CardContact
  ) => {
    if (!user?.user.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user.user.email);
    await setDoc(docRef, data, { merge: true });
  };

  const getCard = async (): Promise<Card | undefined> => {
    if (!user?.user.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user?.user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = CardSchema.parse(docSnap.data());
      console.log("getCard", data);
      return data;
    } else {
      throw new Error("la carte n'existe pas");
    }
  };



  return {
    createEmptyCard,
    isCardCreated,
    checkCardCreated,
    updateCard,
    getCard,
  
  };
};

export default useFirestore;
