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
      });
      navigate("/created-card");
    }
  };

  return (
    <div className="animate-fade-in">
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
        <label>Votre adresse de travail</label>
        <input id="adress" type="text" {...register("adress")} />
        {errors.adress?.message}
        <label>Votre ville</label>
        <input id="city" type="text" {...register("city")} />
        {errors.city?.message}
        <label>Votre code postal</label>
        <input id="zipcode" type="text" {...register("zipcode")} />
        {errors.zipcode?.message}
        <label>Votre paysl</label>
        <input id="country" type="text" {...register("country")} />
        {errors.country?.message}
        <label>Votre email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email?.message}
        <label>Votre numéro de téléphone</label>
        <input id="phone" type="text" {...register("phone")} />
        <p>{errors.phone?.message}</p>
        <label>Url de votre avatar</label>
        <input id="avatar" type="text" {...register("avatarUrl")} />
        {errors.email?.message}
        <input type="submit" value={"Créer la carte"} />
      </form>
    </div>
  );
};

export default CreateCard;
