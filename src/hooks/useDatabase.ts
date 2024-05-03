import { FirebaseError } from "firebase/app";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../firebase/firebase.config";

export default function useDatabase() {
  const fireStoreUpdateDocument = async (
    collectionName: string | null,
    documentId: string,
    data: object
  ) => {
    try {
      const documentRef = doc(database, collectionName ?? "", documentId);
      await updateDoc(documentRef, data);
      return { data: true };
    } catch (error) {
      return {
        error: {
          code: FirebaseError.error ?? "error",
          message: FirebaseError.message ?? "errorMessage",
        },
      };
    }
  };

  const createUserDocument = async (
    documentId: string | null,
    data: object
  ) => {
    const updateData = await fireStoreUpdateDocument(
      "users",
      documentId ?? "",
      data
    );
    if (!updateData.error) return;

    const userRef = doc(database, "users", documentId ?? "");
    setDoc(userRef, data, { merge: true });
  };

  return { createUserDocument };
}
