import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import useDatabase from "../../hooks/useDatabase";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
// import { getDatabase } from "firebase/database";

// import { auth } from "../../firebase/firebase.config";

type Inputs = {
  firstname?: string;
  lastname: string;
  compagny?: string;
  email?: string;
  avatarUrl?: string;
  adress?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  phone?: string;
};

// function writeCardData(
//   useremail: string,
//   firstname: string,
//   lastname: string,
//   email: string,
//   avatarUrl: string,
//   compagny: string,
//   adress: string,
//   phone: string
// ) {
//   const db = getDatabase();
//   set(ref(db, "cards/" + useremail), {
//     firstname: firstname,
//     lastname: lastname,
//     compagny: compagny,
//     adress: adress,
//     phone: phone,
//     email: email,
//     profile_picture: avatarUrl,
//   });
// }
const CreateCard = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const firebase = React.useContext(UserContext) as
    | UserContextProvider
    | undefined
    | null;
  const firestore = getFirestore() as Firestore;
  const cardsRef: CollectionReference<DocumentData> = collection(
    firestore,
    "cards"
  );
  // const { createUserDocument } = useDatabase();
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const navigate = useNavigate();
  const handleCreateCard: SubmitHandler<Inputs> = async ({
    firstname,
    lastname,
    compagny,
    adress,
    city,
    zipcode,
    country,
    email,
    phone,
    avatarUrl,
  }) => {
    console.log(
      firstname,
      lastname,
      compagny,
      adress,
      city,
      email,
      phone,
      avatarUrl
    );
    if (firebase && firebase.authUser) {
      // createUserDocument(`cards/${authUser?.user.email}`, {
      //   firstname,
      //   lastname,
      //   compagny,
      //   adress,
      //   email,
      //   phone,
      //   avatarUrl,
      // });
      await setDoc(doc(cardsRef, authUser?.user.email as string), {
        userEmail: authUser?.user.email,
        firstname: firstname,
        lastname: lastname,
        compagny: compagny,
        adress: adress,
        city: city,
        zipcode: zipcode,
        country: country,
        email: email,
        phone: phone,
        avatarUrl: avatarUrl,
      });
      navigate("/created-card");
      // writeCardData(
      //   authUser?.user.email as string,
      //   firstname,
      //   lastname,
      //   compagny,
      //   adress,
      //   email,
      //   phone,
      //   avatarUrl
      // );
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(handleCreateCard)}>
        <label>Votre prénom</label>
        <input id="firstname" type="text" {...register("firstname")} />
        {errors.firstname?.message}
        <label>Votre nom</label>
        <input
          id="lastname"
          type="text"
          {...register("lastname", {
            required: true,
            pattern: /^[A-Za-z]+$/i,
            minLength: 2,
          })}
        />
        <p>{errors.lastname?.message}</p>
        <label>Nom de votre entreprise</label>
        <input id="company" type="text" {...register("compagny")} />
        {errors.compagny?.message}
        <label>Votre email</label>
        <input id="email" type="email" {...register("email")} />
        <label>Votre adresse de travail</label>
        <input id="adress" type="text" {...register("adress")} />
        <label>Votre numéro de téléphone</label>
        <input id="phone" type="text" {...register("phone")} />
        <label>Url de votre avatar</label>
        <input id="phone" type="text" {...register("avatarUrl")} />
        {errors.email?.message}
        <input type="submit" value={"Créer la carte"} />
      </form>
    </div>
  );
};

export default CreateCard;
// function createUserDocument(
//   arg0: string,
//   arg1: {
//     firstname: string | undefined;
//     lastname: string;
//     compagny: string | undefined;
//     adress: string | undefined;
//     email: string | undefined;
//     phone: string | undefined;
//     avatarUrl: string | undefined;
//   }
// ) {
//   throw new Error("Function not implemented.");
// }
