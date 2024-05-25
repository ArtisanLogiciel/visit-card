import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import { CardGeneral, CardGeneralSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFirestore from "../../../hooks/useFirestore";
import "./form.css";

const FormGeneral = ({ handleNext }: { handleNext: () => void }) => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { updateCard, getCard } = useFirestore(authUser);
  const queryClient = useQueryClient();

  const { data: card, isLoading } = useQuery({
    queryKey: ["card"],
    queryFn: getCard,
  });

  const mutation = useMutation({
    mutationKey: ["card"],
    mutationFn: updateCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardGeneral>({
    resolver: zodResolver(CardGeneralSchema),
    defaultValues: {
      firstname: card?.firstname,
      lastname: card?.lastname,
      avatarUrl: card?.avatarUrl,
    },
  });

  const onSubmit: SubmitHandler<CardGeneral> = async ({
    firstname,
    lastname,
    avatarUrl,
  }) => {
    mutation.mutate({ firstname, lastname, avatarUrl });
    handleNext();
  };
  if (isLoading) return <p>Loading...</p>;

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
