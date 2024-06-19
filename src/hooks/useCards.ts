import {
  Card,
  CardCompagny,
  CardContact,
  CardDesign,
  CardGeneral,
  CardSchemaFirebase,
} from "@/types/card";
import { User } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase/firebase.config";

const useCard = (user: User | null) => {
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
    job:""
   
   
  };

  const COLLECTION_CARDS_FIRESTORE = "cards";

  const createEmptyCard = async () => {
    if (!user?.email) return;
    await setDoc(
      doc(database, COLLECTION_CARDS_FIRESTORE, user?.uid),
      initialCard
    );
  };

  const checkCardCreated = async () => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user?.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const updateCard = async (
    data: CardCompagny | CardDesign | CardGeneral | CardContact
  ) => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user.uid);
    await setDoc(docRef, data, { merge: true });
  };

  const getCard = async () => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = CardSchemaFirebase.parse(docSnap.data());
      console.log(user?.uid);
      return data;
    } else {
      throw new Error("la carte n'existe pas");
    }
  };
  const getCardById = async (id: string) => {
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = CardSchemaFirebase.parse(docSnap.data());
      return data;
    } else {
      throw new Error("la carte n'existe pas");
    }
  };
  const deleteCard = async () => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, user?.uid);
    await deleteDoc(docRef);
  };

  return {
    createEmptyCard,
    getCardById,
    checkCardCreated,
    updateCard,
    getCard,
    deleteCard,
  };
};

export default useCard;
