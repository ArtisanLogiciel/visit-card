import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
type Inputs = {
  firstname?: string;
  lastname: string;
  compagny?: string;
  adress?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  email?: string;
  avatarUrl?: string;
  phone?: string;
  bgColor?: string;
  textColor?: string;
};

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
    bgColor,
    textColor,
  }) => {
    console.log(firstname, lastname, compagny, adress, email, phone, avatarUrl);
    if (firebase && firebase.authUser) {
      await setDoc(doc(cardsRef, authUser?.user.email as string), {
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
        bgColor: bgColor,
        textColor: textColor,
      });
      navigate("/created-card");
    }
  };

  return (
    <div className="animate-fade-in">
      <form className="flex flex-col" onSubmit={handleSubmit(handleCreateCard)}>
        <label>Votre prénom</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="firstname"
          type="text"
          {...register("firstname")}
        />
        {errors.firstname?.message}
        <label>Votre nom</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
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
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="company"
          type="text"
          {...register("compagny")}
        />
        {errors.compagny?.message}
        <label>Votre adresse de travail</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="adress"
          type="text"
          {...register("adress")}
        />
        {errors.adress?.message}
        <label>Votre ville</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="city"
          type="text"
          {...register("city")}
        />
        {errors.city?.message}
        <label>Votre code postal</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="zipcode"
          type="text"
          {...register("zipcode")}
        />
        {errors.zipcode?.message}
        <label>Votre pays</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="country"
          type="text"
          {...register("country")}
        />
        {errors.country?.message}
        <label>Votre email</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email?.message}
        <label>Votre numéro de téléphone</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="phone"
          type="text"
          {...register("phone")}
        />
        <p>{errors.phone?.message}</p>
        <label>Url de votre avatar</label>
        <input
          className="mb-3 text-black bg-gray-300 border-2 border-slate-700"
          id="avatar"
          type="text"
          {...register("avatarUrl")}
        />
        {errors.email?.message}
        <div className="fmex fmew-col justify-items-center">
          <input
            type="radio"
            id="bgColor"
            value={"fff"}
            {...register("bgColor")}
          />
          <p>Fond blanc</p>
          <div
            style={{ backgroundColor: "#fff" }}
            className="w-3 h-3 rounded-full"
          ></div>
          <div className="flex flex-row">
            <input
              type="radio"
              id="bgColor"
              value={"33f"}
              {...register("bgColor")}
            />
            <p>Fond bleu</p>
            <div
              style={{ backgroundColor: "#33f" }}
              className="w-3 h-3 rounded-full"
            ></div>
          </div>
        </div>
        <div className="fmex fmew-col justify-items-center">
          <input
            type="radio"
            id="textColor"
            value={"000"}
            {...register("textColor")}
          />
          <p>Texte noir</p>
          <div
            style={{ backgroundColor: "#000" }}
            className="w-3 h-3 rounded-full"
          ></div>
          <div className="flex flex-row">
            <input
              type="radio"
              id="textColor"
              value={"fff"}
              {...register("textColor")}
            />
            <p>Texte blanc</p>
            <div
              style={{ backgroundColor: "#fff" }}
              className="w-3 h-3 rounded-full"
            ></div>
          </div>
        </div>
        <input
          className="bg-green-600 text-black rounded-lg hover:bg-white transition-all duration-500"
          type="submit"
          value={"Créer la carte"}
        />
      </form>
    </div>
  );
};

export default CreateCard;
