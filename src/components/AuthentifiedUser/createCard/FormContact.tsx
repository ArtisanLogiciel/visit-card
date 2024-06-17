import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCards";
import { CardContact, CardContactFormSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@mui/material";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./form.css";

const FormContact = ({ handleBack }: { handleBack: () => void }) => {
  const navigate = useNavigate();
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardContact>({
    resolver: zodResolver(CardContactFormSchema),
    defaultValues: {
      email: card?.email,
      phoneDesktop: card?.phoneDesktop,
      phoneMobile: card?.phoneMobile,
    },
  });

  const onSubmit: SubmitHandler<CardContact> = async (data) => {
    mutation.mutate(data);
    navigate("/");
  };
  if (isLoading) return <Skeleton />;
  return (
    <div>
      <h1>Vos coordonnées</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="email">Email professionel</label>
        <input id="email" {...register("email", { required: true })} />

        {errors?.email && <p>{errors.email.message}</p>}
        <label htmlFor="phoneDesktop">Téléphone de bureau professionnel</label>
        <input id="phoneDesktop" {...register("phoneDesktop")} />
        {errors?.phoneDesktop && <p>{errors.phoneDesktop.message}</p>}
        <label htmlFor="phoneMobile">Téléphone portable professionnel</label>
        <input id="phoneMobile" {...register("phoneMobile")} />
        {errors?.phoneMobile && <p>{errors.phoneMobile.message}</p>}
        <div className="container-buttons ">
          <button onClick={handleBack}>Précédent</button>
          <button type="submit">Terminer</button>
        </div>
      </form>
    </div>
  );
};

export default FormContact;
