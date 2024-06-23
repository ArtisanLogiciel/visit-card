import { database } from "@/firebase/firebase.config";
import AccountSchema, { Account, AccountUpdate } from "@/types/account";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const useAccount = (user: User | null) => {
  const COLLECTION_ACCOUNT_FIRESTORE = "users";

  const getAccount = async () => {
    if (!user) return;
    const docRef = doc(database, COLLECTION_ACCOUNT_FIRESTORE, user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = AccountSchema.parse(docSnap.data());

      return data;
    } else {
      throw new Error("la carte n'existe pas");
    }
  };

  const createAccount = async (data: Account) => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_ACCOUNT_FIRESTORE, user.uid);
    await setDoc(
      docRef,
      {
        ...data,
        firstname: data.firstname.toLowerCase(),
        lastname: data.lastname.toLowerCase(),
      },
      { merge: true }
    );
  };

  const getCardId = async () => {
    if (!user) return;
    const data = await getAccount();
    if (!data) throw new Error("La carte n'existe pas");
    else {
      return data.cardId;
    }
  };

  const createCardId = async(cardId:string)=>{
    if (!user ) return
    const docRef = doc(database, COLLECTION_ACCOUNT_FIRESTORE, user.uid);
    const cartIdPresent = await getCardId()
    if (cartIdPresent) return
    else{
      await setDoc(docRef,{cardId},{merge:true})
    }
  }

  const updateAccount = async ({ firstname, lastname }: AccountUpdate) => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_ACCOUNT_FIRESTORE, user.uid);
    await setDoc(
      docRef,
      {
        firstname: firstname?.toLowerCase(),
        lastname: lastname?.toLowerCase(),
      },
      { merge: true }
    );
  };

  const cardIdQueryKey = ["cardId"]

  return { getAccount, updateAccount, createAccount, getCardId , createCardId , cardIdQueryKey};
};

export default useAccount;
