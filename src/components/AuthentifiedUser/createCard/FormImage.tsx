import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import { useMutation } from "@tanstack/react-query";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";

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

  const uploadImage = async (file: File) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storage = getStorage();
    const storageRef = ref(storage, `images/card/${authUser?.uid}/profil.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
    });
  };
  const mutation = useMutation({
    mutationKey: ["image", "card", authUser?.uid],
    mutationFn: uploadImage,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].name.includes(".jpg")) {
      mutation.mutate(e.target.files[0]);
    }
    else {
      throw new Error ("Invalid format")
    }
  };

  const handleUploadNextPage = async () => {
    if (mutation.isSuccess) handleNext();
  };

  return (
    <div>
      <div className="container">
        <p>Seul les fichiers au format jpg sont acceptés</p>
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
