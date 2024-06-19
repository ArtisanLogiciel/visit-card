import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useCard from "@/hooks/useCards";
import useImageProfil from "@/hooks/useImageProfil";
import { Card, CardContact, CardContactFormSchema } from "@/types/card";
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
  cardRef: MutableRefObject<Card>;
  fileRef: MutableRefObject<File | null>;
}) => {
  const navigate = useNavigate();
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { uploadImage , fileMutationKey,fileQueryKey,imageURLQueryKey } = useImageProfil(authUser);

  const query = useQueryClient();
  
  const imageMutation = useMutation({
    mutationKey: fileMutationKey,
    mutationFn: uploadImage,
    onSuccess:()=>{
      query.invalidateQueries({queryKey:imageURLQueryKey})
      query.invalidateQueries({queryKey:fileQueryKey})
    }
  });
  const { updateCard , cardMutationKey, cardQueryKey} = useCard(authUser);

  const dataMutation = useMutation({
    mutationKey: cardMutationKey,
    mutationFn: updateCard,
    onSuccess: () => {
      query.invalidateQueries({queryKey:cardQueryKey})
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardContact>({
    resolver: zodResolver(CardContactFormSchema),
    defaultValues: {
      email: cardRef.current.email,
      phoneDesktop: cardRef.current.phoneDesktop,
      phoneMobile: cardRef.current.phoneMobile,
    },
  });

  const onSubmit: SubmitHandler<CardContact> = async (data) => {
    cardRef.current={...cardRef.current,...data}
    if (fileRef.current) await imageMutation.mutate(fileRef.current);
    await dataMutation.mutate(cardRef.current)
    navigate("/")
  }
    
 


  
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
          <button type="submit">Sauvegarder</button>
        </div>
      </form>
    </div>
  );
};

export default FormContact;
