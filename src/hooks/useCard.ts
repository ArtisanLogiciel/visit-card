import { Card, CardSchemaFirebase } from "@/types/card";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ShortUniqueId from "short-unique-id";
import { database } from "../firebase/firebase.config";
import useAccount from "./useAccount";

const useCard = (user: User | null) => {
  const COLLECTION_CARDS_FIRESTORE = "cards";
  const COLLECTION_USERS_FIRESTORE = "users";

  const { getCardId, createCardId } = useAccount(user);

  const editCard = async (data: Card) => {
    if (!user?.email) return;
    const isCardIdCreated = await isCardCreated();
    
    if (isCardIdCreated) {
      const cardId = await getCardId() as string
      const docRef = doc(database, COLLECTION_USERS_FIRESTORE, cardId);
      await setDoc(docRef, data, { merge: true });
    } else {
      const CARD_ID_LENGTH = 10;
      const cardId = new ShortUniqueId({ length: CARD_ID_LENGTH });
      const randomCardId = cardId.rnd();
      await createCardId(randomCardId);
      await setDoc(
        doc(database, COLLECTION_CARDS_FIRESTORE, randomCardId),
        data,
        { merge: true }
      );
    }
  };

  const isCardCreated = async () => {
    if (!user) return;
    const cardId = await getCardId();
    return Boolean(cardId);
  };



  const getCard = async () => {
    if (!user) return;
    const cardId = await getCardId();
    if (!cardId) return;
    const docRef = doc(database, COLLECTION_USERS_FIRESTORE, cardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = CardSchemaFirebase.parse(docSnap.data());

      return data;
    } else {
      throw new Error("la carte n'existe pas");
    }
  };
  const getCardByEmail = async (email: string) => {
    const docRef = doc(database, COLLECTION_CARDS_FIRESTORE, email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = CardSchemaFirebase.parse(docSnap.data());
      return data;
    } else {
      throw new Error("la carte n'existe pas");
    }
  };

  const cardQueryKey = ["card", user?.uid];
  const cardMutationKey = ["card", user?.uid];
  const isCardCreatedQueryKey = ["isCardCreated", user?.uid];

  return {
    editCard,
    getCardByEmail,
    isCardCreated,

    getCard,
    cardMutationKey,
    cardQueryKey,
    isCardCreatedQueryKey,
  };
};

export default useCard;
