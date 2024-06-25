import {
  CardCompagny,
  CardCompagnyFormSchema,
  CardFirebase,
} from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutableRefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./form.css";

const FormCompagny = ({
  handleNext,
  handleBack,
  cardRef,
}: {
  handleNext: () => void;
  handleBack: () => void;
  cardRef: MutableRefObject<CardFirebase>;
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<CardCompagny>({
    resolver: zodResolver(CardCompagnyFormSchema),
    defaultValues: async () =>
      new Promise((resolve) => {
        const { compagny, country, city, address, job, zipcode } =
          cardRef.current;

        return resolve({
          compagny,
          country,
          city,
          address,
          job,
          zipcode,
        });
      }),
  });

  caches;

  const onSubmit: SubmitHandler<CardCompagny> = ({
    compagny,
    address,
    country,
    job,
    zipcode,
    city,
  }: CardCompagny) => {
    cardRef.current = {
      ...cardRef.current,
      compagny,
      address: address ?? null,
      country: country ?? null,
      job: job ?? null,
      zipcode: zipcode ?? null,
      city: city ?? null,
    };

    handleNext();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="compagny">Nom de l'entreprise *</label>
        <input
          id="compagny"
          className="input"
          {...register("compagny", { required: true })}
        />
        {errors?.compagny && <p>{errors.compagny.message}</p>}

        <label>Votre poste *</label>
        <input
          id="job"
          className="input"
          placeholder="Agent immobilier, ingénieur..."
          {...register("job", { required: true })}
        />

        <label htmlFor="country">Pays</label>
        <input id="country" {...register("country", { required: true })} />
        {errors?.country && <p>{errors.country.message}</p>}

        <label htmlFor="city">Ville</label>
        <input id="city" {...register("city")} />
        {errors?.city && <p>{errors.city.message}</p>}

        <label htmlFor="address">Adresse</label>
        <input id="address" {...register("address")} />
        {errors?.address && <p>{errors.address.message}</p>}

        <label htmlFor="zipcode">Code postal</label>
        <input id="zipcode" {...register("zipcode")} type="number" />
        {errors?.zipcode && <p>{errors.zipcode.message}</p>}

        <div className="container-buttons">
          <button onClick={handleBack}>Précédent</button>
          <input type="submit" value={"Etape suivante"} />
        </div>
      </form>
    </div>
  );
};

export default FormCompagny;
