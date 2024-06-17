import { User } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const useImageProfil = (user: User | null) => {
  const pathImage = `images/card/${user?.uid}/profil.jpg`;
  const storage = getStorage();
  const profilRef = ref(storage, pathImage);

  const getImage = async () => {
    if (!user) return;
    return await getDownloadURL(profilRef);
  };

  const deleteImage = async () => {
    return await deleteObject(profilRef);
  };

  const uploadImage = async (file: File) => {
    if (!file.name.includes(".jpg")) throw new Error("Format invalide")
       return await uploadBytes(profilRef, file);
  };

  const isRepertoryEmpty = async () => {
    const listRef = ref(storage, `images/card/${user?.uid}`);
    const listResult = await listAll(listRef);
    return listResult.items.length === 0;
  };

  return { getImage, deleteImage, uploadImage, isRepertoryEmpty };
};

export default useImageProfil;
