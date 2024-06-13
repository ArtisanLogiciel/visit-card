import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { authUser } = React.useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const uploadImage = async (file: File) => {
    UserContext;
    const metadata = {
      contentType: "image/jpeg",
    };
    const storage = getStorage();
    const storageRef = ref(storage, `images/${authUser?.email}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
    });
  };

  const handleUpload = async () => {
    if (file) {
      const url = await uploadImage(file);
      setIsLoaded(true);
      console.log("Image uploadée avec succès:", url);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <p className="text-xl font-bold text-red-600">Image uploadé</p>
      ) : (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button
            className=" bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-400 transition-all duration-300 ease-linear my-4"
            onClick={handleUpload}
          >
            Télécharger Une Image
          </button>
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
