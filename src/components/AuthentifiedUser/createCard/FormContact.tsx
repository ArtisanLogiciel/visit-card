import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCard";
import useImageProfil from "@/hooks/useImageProfil";
import { CardContact, CardContactFormSchema, CardFirebase } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutableRefObject, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./form.css";

const FormContact = ({
  handleBack,
  cardRef,
  fileRef,
}: {
  handleBack: () => void;
  cardRef: MutableRefObject<CardFirebase>;
  fileRef: MutableRefObject<File | null>;
}) => {
  const navigate = useNavigate();

  const query = useQueryClient();
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { uploadImage, fileMutationKey, fileQueryKey, imageURLQueryKey } =
    useImageProfil(authUser);

  const { cardMutationKey, cardQueryKey, isCardCreatedQueryKey, editCard } =
    useCard(authUser);

  const imageMutation = useMutation({
    mutationKey: fileMutationKey,
    mutationFn: uploadImage,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: imageURLQueryKey });
      query.invalidateQueries({ queryKey: fileQueryKey });
      query.invalidateQueries({ queryKey: fileQueryKey });
    },
  });

  const cardMutation = useMutation({
    mutationKey: cardMutationKey,
    mutationFn: editCard,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: cardQueryKey });
      query.invalidateQueries({ queryKey: isCardCreatedQueryKey });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardContact>({
    resolver: zodResolver(CardContactFormSchema),
    defaultValues: async () =>
      new Promise((resolve) => {
        const { email, phoneDesktop, phoneMobile } = cardRef.current;
        return resolve({
          email,
          phoneDesktop,
          phoneMobile,
        });
      }),
  });

  const onSubmit: SubmitHandler<CardContact> = async ({
    email,
    phoneDesktop,
    phoneMobile,
  }) => {
    cardRef.current = {
      ...cardRef.current,
      email: email ?? null,
      phoneDesktop: phoneDesktop ?? null,
      phoneMobile: phoneMobile ?? null,
    };
    await cardMutation.mutate(cardRef.current);
    // Déjai ajouté pour avoir le temps de fetch la valeur de cardId
    setTimeout(async () => {
      await imageMutation.mutate(fileRef.current);
    }, 1000);
    navigate("/");
  };

  return (
    <div>
      <h1>Vos coordonnées</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="email">Email professionel *</label>
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
          <button type="submit">Sauvegarder</button>
        </div>
      </form>
    </div>
  );
};

export default FormContact;
