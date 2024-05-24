import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import { CardGeneral, CardGeneralSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFirestore from "../../../hooks/useFirestore";
import "./form.css";

const FormGeneral = ({ handleNext }: { handleNext: () => void }) => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { updateCard } = useFirestore(authUser);

  useEffect(() => {
    const fetchCard = async () => {};

    fetchCard();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardGeneral>({
    resolver: zodResolver(CardGeneralSchema),
  });

  const onSubmit: SubmitHandler<CardGeneral> = async ({
    firstname,
    lastname,
  }) => {
    await updateCard({ firstname, lastname });
    handleNext();
  };

  return (
    <div className="container">
      <h1 className="">Informations générales</h1>
      <p>* : Saisie obligatoire</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstname">Prénom *</label>
        <input id="firstname" {...register("firstname", { required: true })} />
        {errors.firstname?.message && <p>{errors.firstname.message}</p>}
        <label id="lastname" htmlFor="lastname">
          Nom *
        </label>
        <input
          {...register("lastname", { required: true })}
          className="input"
        />
        {errors.lastname?.message && <p>{errors.lastname.message}</p>}
        <button type="submit">Etape suivante</button>
      </form>
    </div>
  );
};

export default FormGeneral;
