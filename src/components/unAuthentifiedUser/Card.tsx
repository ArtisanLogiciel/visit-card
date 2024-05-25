import firestore from "firebase-functions";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const readUserDocument = async (useremail: string, errorMessage?: string) => {
  const docRef = doc(firestore as unknown as Firestore, "cards", useremail);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const bookmarkData = docSnap.data();
    return bookmarkData;
  } else {
    throw new Error(errorMessage ?? "Impossible de lire la donnée");
  }
};
export const Card = () => {
  const { emailUser } = useParams();
  const [data, setData] = useState<object | null>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await readUserDocument(emailUser as string);
      setData(result);
    };

    fetchData();
  }, [emailUser]);
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center text-xl font-bold">
        {data ? JSON.stringify(data) : "Loading..."}
      </div>
    </>
  );
};
