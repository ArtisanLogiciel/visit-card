import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useImageProfil from "@/hooks/useImageProfil";
import CardImageSchema, { CardImage } from "@/types/storage/CardImage";

import ImageProfil from "@/components/ImageProfil";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { MutableRefObject, useContext, useRef } from "react";
import { useForm } from "react-hook-form";

const FormImage = ({
  handleNext,
  handleBack,
  fileRef,
}: {
  handleNext: () => void;
  handleBack: () => void;
  fileRef: MutableRefObject<File | null>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CardImage>({ resolver: zodResolver(CardImageSchema) });

  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const { getImageURLSourceImage, imageURLQueryKey } = useImageProfil(authUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: imageSource, isSuccess } = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: getImageURLSourceImage,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
    // await mutation.reset();
    clearErrors("filename");
    if (!e.target?.files?.[0]) return;
    else if (e.target.files[0].type !== "image/jpeg") {
      setError("filename", { message: "Le format est invalide" });
    } else if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      setError("filename", {
        message: "La taille de l'image ne doit pas dépasser 1 Mo.",
      });
    } else {
      fileRef.current = e.target.files[0];
    }
  };

  const handleUploadNextPage = async () => {
    handleNext();
  };

  const handleDelete = async () => {
    clearErrors("filename");
    fileRef.current = null;
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="container">
        {imageSource && !fileRef.current ? (
          <ImageProfil url={imageSource} size={80} />
        ) : (
          <ImageProfil size={80} file={fileRef.current} />
        )}

        <form>
          <label htmlFor="file">Photo de profil</label>
          <input
            id="file"
            {...register("filename")}
            type="file"
            onChange={handleFileChange}
            onClick={() => clearErrors("filename")}
            ref={inputRef}
          />
          <p className="p-2 m-2 font-bold border-2 border-red-500">
            Seuls les fichiers au format JPEG de moins de 1Mo sont acceptés
          </p>
          {errors.filename ? (
            <p className="text-red-700">{errors.filename.message}</p>
          ) : null}

          {fileRef.current ? (
            <input
              type="button"
              className="mt-3 underline underline-offset-1"
              onClick={handleDelete}
              value={"Supprimer l'image"}
            />
          ) : null}
        </form>

        <div className="container-buttons">
          <button onClick={handleBack}>Précédent</button>
          <button onClick={handleSubmit(handleUploadNextPage)}>Suivant</button>
        </div>
      </div>
    </div>
  );
};
export default FormImage;
