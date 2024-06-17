import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import ImageProfil from "@/components/ImageProfil";
import useImageProfil from "@/hooks/useImageProfil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

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



  const { uploadImage , deleteImage} = useImageProfil(authUser);

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

 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].name.includes(".jpg")) {
      mutation.mutate(e.target.files[0]);
    } else {
      throw new Error("Invalid format");
    }
  };

  const handleUploadNextPage = async () => {
    if (mutation.isSuccess) handleNext();
  };

  return (
    <div>
      <div className="container">
        <p>Seul les fichiers au format jpg sont acceptés</p>
        <ImageProfil />
        {mutation.isError? mutation.error.message:null}
        {mutation.isSuccess?<p>Photo ajoutée</p>:null}
        <form>
          <input type="file" onChange={handleFileChange} />
          
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
          <button onClick={handleUploadNextPage}>Suivant</button>
        </div>
      </div>
    </div>
  );
};
export default FormImage;
