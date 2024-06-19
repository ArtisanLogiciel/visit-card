import { User } from "firebase/auth";
import {
  UploadMetadata,
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
    const metaData: UploadMetadata = {
      contentType: "image/jpeg",
    };

    return await uploadBytes(profilRef, file, metaData);
  };

  const isRepertoryEmpty = async () => {
    const listRef = ref(storage, `images/card/${user?.uid}`);
    const listResult = await listAll(listRef);
    return listResult.items.length === 0;
  };

  const downloadImage = async (imageQuery: string | undefined) => {
    if (!imageQuery) return;
    const image = imageQuery;
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);
    return await new File([blob], filename);
  };

  const imageURLQueryKey = ["urlImage", user?.uid];
  const fileQueryKey = ["file", user?.uid];

  const imageURLMutationKey = ["urlImage", user?.uid];
  const fileMutationKey = ["file", user?.uid];

  return {
    getImage,
    deleteImage,
    uploadImage,
    isRepertoryEmpty,
    downloadImage,
    imageURLQueryKey,
    fileQueryKey,
    imageURLMutationKey,
    fileMutationKey,
  };
};

export default useImageProfil;
