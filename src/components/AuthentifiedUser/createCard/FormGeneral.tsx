import { Card, CardGeneral, CardGeneralSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutableRefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import "./form.css";

const FormGeneral = ({
  handleNext,
  cardRef,
  updateCardRef,
}: {
  handleNext: () => void;
  cardRef: MutableRefObject<Card>;
  updateCardRef: (data: Partial<Card>) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardGeneral>({
    resolver: zodResolver(CardGeneralSchema),
    // defaultValues: {
    //   firstname: cardRef.current.firstname,
    //   lastname: cardRef.current.lastname,
    // },
    defaultValues: async () => await
      new Promise((resolve) =>
        resolve({
          firstname: cardRef.current.firstname,
          lastname: cardRef.current.lastname,
        })
      ),
  });

  const onSubmit: SubmitHandler<CardGeneral> = (data) => {
    updateCardRef(data);
    handleNext();
  };

  console.log(cardRef.current.firstname);

  return (
    <div className="container">
      <h1>Informations générales</h1>
      <p className="">* : Saisie obligatoire</p>
      <p>{cardRef.current.firstname ?? "Iconnu"}</p>

      <div className="mx-auto text-center"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="firstname">Prénom *</label>
        <input id="firstname" {...register("firstname", { required: true })} />
        {errors.firstname?.message && <p>{errors.firstname.message}</p>}
        <label id="lastname" htmlFor="lastname">
          Nom *
        </label>
        <input {...register("lastname", { required: true })} />
        {errors.lastname?.message && <p>{errors.lastname.message}</p>}
        <button type="submit">Etape suivante</button>
      </form>
    </div>
  );
};

export default FormGeneral;
