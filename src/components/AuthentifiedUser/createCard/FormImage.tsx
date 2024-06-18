import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import ImageProfil from "@/components/ImageProfil";
import useImageProfil from "@/hooks/useImageProfil";
import { CardImage, CardImageSchema } from "@/types/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const FormImage = ({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CardImage>({ resolver: zodResolver(CardImageSchema) });

  const { uploadImage, deleteImage, isRepertoryEmpty } =
    useImageProfil(authUser);
  const inputRef = useRef<HTMLInputElement>(null);
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["image", "card", authUser?.uid],
    mutationFn: uploadImage,

    onSuccess: () => {
      query.refetchQueries({ queryKey: ["image", "card", authUser?.uid] });
      query.refetchQueries({
        queryKey: ["image", "card", "isProfilEmpty", authUser?.uid],
      });
    },
  });

  const { data: isProfilImageAbsent } = useQuery({
    queryKey: ["image", "card", "isProfilEmpty", authUser?.uid],
    queryFn: isRepertoryEmpty,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["image", "card", authUser?.uid] });
      query.invalidateQueries({
        queryKey: ["image", "card", "isProfilEmpty", authUser?.uid],
      });
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
    await mutation.reset();
    clearErrors("image.filename");
    if (!e.target?.files?.[0]) return;
    else if (e.target.files[0].type !== "image/jpeg") {
      setError("image.filename", { message: "Le format est invalide" });
    } else if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      setError("image.filename", {
        message: "La taille de l'image ne doit pas dépasser 1 Mo.",
      });
    } else {
      await mutation.mutate(e.target.files[0]);
    }
  };

  const handleUploadNextPage = async () => {
    if (mutation.isSuccess || mutation.isIdle) handleNext();
  };

  const handleDelete = async () => {
    await mutation.reset();
    clearErrors("image.filename");
    await deleteMutation.mutate();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="container">
        <ImageProfil />
        {mutation.isError ? mutation.error.message : null}
        {mutation.isSuccess ? <p>Photo ajoutée</p> : null}
        <form>
          <label htmlFor="file">Photo de profil</label>
          <input
            id="file"
            {...register("image.filename")}
            type="file"
            onChange={handleFileChange}
            onClick={() => clearErrors("image.filename")}
            ref={inputRef}
          />
          <p className="p-2 m-2 font-bold border-2 border-red-500">
            Seuls les fichiers au format JPEG de moins de 1Mo sont acceptés
          </p>
          {errors.image?.filename ? (
            <p className="text-red-700">{errors.image.filename.message}</p>
          ) : null}

          {!isProfilImageAbsent ? (
            <input
              type="button"
              className="mt-3 underline underline-offset-1"
              onClick={handleDelete}
              value={"Supprimer l'image"}
            />
          ) : null}
        </form>

        {mutation.isPending ? <p>Chargement</p> : null}
        {mutation.isError ? (
          <p>
            Une erreur s'est produite{" "}
            {import.meta.env.DEV ? mutation.error.message : null}
          </p>
        ) : null}
        <div className="container-buttons">
          <button onClick={handleBack}>Précédent</button>
          <button onClick={handleSubmit(handleUploadNextPage)}>Suivant</button>
        </div>
      </div>
    </div>
  );
};
export default FormImage;
