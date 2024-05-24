import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useFirestore from "@/hooks/useFirestore";
import { CardCompagny, CardCompagnySchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./form.css";

const FormCompagny = ({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { updateCard } = useFirestore(authUser);

  const onSubmit: SubmitHandler<CardCompagny> = async (data) => {
    await updateCard(data);
    handleNext();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardCompagny>({
    resolver: zodResolver(CardCompagnySchema),
  });

  return (
    <div>
      <h1>Informations de l'entreprise</h1>
      <p>* : Saisie obligatoire</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="compagny">Nom de l'entreprise *</label>
        <input id="compagny" {...register("compagny", { required: true })} />
        {errors?.compagny && <p>{errors.compagny.message}</p>}

        <label htmlFor="country">Pays</label>
        <input id="country " {...register("country")} />
        {errors?.country && <p>{errors.country.message}</p>}

        <label htmlFor="city">Ville</label>
        <input id="city" {...register("city")} />
        {errors?.city && <p>{errors.city.message}</p>}

        <label htmlFor="address">Adresse</label>
        <input id="address" {...register("address")} />
        {errors?.address && <p>{errors.address.message}</p>}
        <label htmlFor="zipcode">zipcode</label>
        <input id="zipcode" {...register("zipcode")} />
        {errors?.zipcode && <p>{errors.zipcode.message}</p>}
        <div className="container-buttons">
          <button onClick={handleBack}>Précédent</button>
          <button type="submit">Suivant</button>
        </div>
      </form>
    </div>
  );
};

export default FormCompagny;
