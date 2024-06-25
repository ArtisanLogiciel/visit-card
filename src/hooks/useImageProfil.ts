import { User } from "firebase/auth";
import {
  UploadMetadata,
  deleteObject,
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import useAccount from "./useAccount";

const imagePath = "images/card";
const storage = getStorage();
const imageName = "profil.jpg";

const useImageProfil = (user: User | null) => {
  const { getCardId } = useAccount(user);

  const getImagePathStorage = async () => {
    const cardId = await getCardId();

    if (!cardId) return null;
    return `${imagePath}/${cardId}`;
  };

  const getImageURLStorage = async () => {
    if (!user) return null;
    const imagePath = await getImagePathStorage();

    if (!imagePath) return null;
    return `${imagePath}/${imageName}`;
  };

  const getImageURLSourceImage = async () => {
    if (!user) return null;
    const urlImage = await getImageURLStorage();
    if (!urlImage) return null;
    const imageRef = ref(storage, urlImage);
    return getDownloadURL(imageRef);
  };

  const getURLImageByCardId = async (cardId?: string) => {
    if (!cardId) return null;
    return await getDownloadURL(
      ref(storage, `${imagePath}/${cardId}/${imageName}`)
    );
  };

  const deleteImage = async () => {
    if (!user) return ;
    const imagePath = await getImagePathStorage();
    if (!imagePath) return ;
    return await deleteObject(ref(storage, `${imagePath}/${imageName}`));
  };

  const uploadImage = async (file: File | null) => {
    if (!user) return ;
    if (!file) return ;
    const metaData: UploadMetadata = {
      contentType: "image/jpeg",
    };

    // const imageRef = ref(storage, "images/card/toto.jpg");

    const imagePathCardId = await getImagePathStorage();
    if (!imagePathCardId) return;

    const imageRef = ref(storage, `${imagePathCardId}/${imageName}`);

    await uploadBytes(imageRef, file, metaData).catch((error) =>
      console.log(error)
    );
  };

  const isRepertoryEmpty = async () => {
    const imagePath = await getImagePathStorage();
    if (!imagePath) return true;
    const imageRef = ref(storage, imagePath);

    return Boolean(imageRef);
  };

  //Nécessite une configuration CORES pour fonctionner
  const downloadImage = async () => {
    const imagePath = await getImageURLStorage();
    if(!imagePath) return null
    const imageRef = ref(storage, imagePath);
    console.log(imageRef);
    const blob = await getBlob(imageRef);
    if (!blob) return;

    const file = new File([blob], imageName);
    if (!file) return null;
    return await file;
  };

  const imageURLQueryKey = ["urlImage"];
  const fileQueryKey = ["file"];

  const imageURLMutationKey = ["urlImage"];
  const fileMutationKey = ["file"];

  return {
    getImage: getImageURLStorage,
    deleteImage,
    uploadImage,
    isRepertoryEmpty,
    downloadImage,
    getImageURLSourceImage,
    getURLImageByCardId,
    imageURLQueryKey,
    fileQueryKey,
    imageURLMutationKey,
    fileMutationKey,
  };
};

export default useImageProfil;
