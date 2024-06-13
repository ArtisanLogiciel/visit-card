import { database } from "@/firebase/firebase.config";
import AccountSchema, { AccountUpdate } from "@/types/account";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";




const useAccount = ( user: User | null ) => {
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

  const updateAccount = async (
    data: {firstname:string}
  ) => {
    if (!user?.email) return;
    const docRef = doc(database, COLLECTION_ACCOUNT_FIRESTORE, user.uid);
    await setDoc(docRef, data, { merge: true });
  };

  return { getAccount , updateAccount};
};

export default useAccount
