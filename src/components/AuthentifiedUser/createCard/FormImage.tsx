import CardImageSchema, { CardImage } from "@/types/storage/CardImage";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { MutableRefObject, useRef } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);
  console.log("firef",fileRef.current);

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
        {/* <ImageProfil fileRef={} /> */}

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
