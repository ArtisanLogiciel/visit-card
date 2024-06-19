import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCards";
import { Card, CardCompagny, CardCompagnyFormSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutableRefObject, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./form.css";

const FormCompagny = ({
  handleNext,
  handleBack,
  cardRef
}: {
  handleNext: () => void;
  handleBack: () => void;
  cardRef:MutableRefObject<Card>
}) => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { updateCard } = useCard(authUser);

  const { getCard } = useCard(authUser);

  const query = useQueryClient();
  const { data: card, isLoading } = useQuery({
    queryKey: ["card"],
    queryFn: getCard,
  });

  const mutation = useMutation({
    mutationKey: ["card"],
    mutationFn: updateCard,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["card"] });
    },
  });

  const onSubmit: SubmitHandler<CardCompagny> =  (data) => {
    cardRef.current={...cardRef.current,...data}
    handleNext();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardCompagny>({
    resolver: zodResolver(CardCompagnyFormSchema),
    defaultValues: {
      compagny: card?.compagny,
      country: card?.country,
      city: card?.city,
      address: card?.address,
      zipcode: card?.zipcode,
      job:card?.job
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Informations de l'entreprise</h1>
      <p>* : Saisie obligatoire</p>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="compagny">Nom de l'entreprise *</label>
        <input
          id="compagny"
          className="input"
          {...register("compagny", { required: true })}
        />
        {errors?.compagny && <p>{errors.compagny.message}</p>}
        <label>Votre poste</label>
        <input id="job" className="input" {...register("job",{required:true})}/>
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
