import { SubmitHandler, useForm } from "react-hook-form";

import React from "react";
import useDatabase from "../../hooks/useDatabase";
import {
  UserContext,
  UserContextProvider,
} from "../../Providers/usersProviders";
// import { auth } from "../../firebase/firebase.config";

type Inputs = { lastname: string; compagny: string };
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

  const { createUserDocument } = useDatabase();

  const handleCreateCard: SubmitHandler<Inputs> = ({ lastname, compagny }) => {
    console.log(lastname, compagny);
    if (firebase && firebase.authUser) {
      createUserDocument(firebase.authUser.user.uid, { lastname, compagny });
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(handleCreateCard)}>
        <label>Votre nom</label>
        <input
          type="text"
          {...register("lastname", {
            required: true,
            pattern: /^[A-Za-z]+$/i,
            minLength: 2,
          })}
        />
        <p>{errors.lastname?.message}</p>
        <label>Nom de votre entreprise</label>
        <input type="text" {...register("compagny")} />
        {errors.compagny?.message}
        <input type="submit" value={"Créer la carte"} />
      </form>
    </div>
  );
};

export default CreateCard;
