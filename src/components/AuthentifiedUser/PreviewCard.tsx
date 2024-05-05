import {
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";

export const PreviewCard = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const firestore = getFirestore() as Firestore;
  const cardsRef: CollectionReference<DocumentData> = collection(
    firestore,
    "cards"
  );
  const q = query(cardsRef, where("userEmail", "==", authUser?.user.email));
  const [card, setCard] = useState<Array<DocumentData>>();
  useEffect(() => {
    const fetchData = async () => {
      setCard((await getDocs(q)).docs as Array<DocumentData>);
      // Rest of the code...
    };
    fetchData();
  }, [q]);
  return (
    <>
      {card &&
        card?.map((item) => {
          return (
            <div
              style={{
                backgroundColor: item.data().bgColor,
                color: item.data().textColor,
              }}
              key={item.id}
            >
              <h1 className="text-4xl">Votre carte :</h1>
              <div className="flex flex-col gap-3 rounded-xl">
                <h2 className="my-3">
                  <p>{item.data().firstname}</p> <p></p>
                  {item.data().lastname}
                  <div>
                    {item.data().avatarUrl && (
                      <img
                        src={item.data().avatarUrl}
                        alt="avatar"
                        className="w-20 h-20 my-5 rounded-full"
                      />
                    )}
                  </div>
                </h2>
                <p className="my-3">Entreprise : {item.data().compagny}</p>
                <p className="my-3">Lieux de travail : {item.data().adress}</p>
                <p className="my-3">Ville : {item.data().city}</p>
                <p className="my-3">Code postal : {item.data().zipcode}</p>
                <p className="my-3">Pays : {item.data().country}</p>
                <p className="my-3">Email pro : {item.data().email}</p>
                <p className="my-3">
                  Numéro de téléphone : {item.data().phone}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};
