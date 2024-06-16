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

  return { getAccount, updateAccount, createAccount };
};

export default useAccount;
