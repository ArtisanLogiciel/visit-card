// import firebase from "firebase/app";
// import "firebase/storage";
// import { SubmitHandler, useForm } from "react-hook-form";

// type Inputs = {
//   image: FileList;
// };

// const UploadImage = () => {
//   const { register, handleSubmit } = useForm<Inputs>();
//   console.log("uploadImage");
//   const uploadImage = async (file: File) => {
//     const storageRef = firebase.storage().ref();
//     const fileRef = storageRef.child(`images/${file.name}`);
//     await fileRef.put(file);
//     return await fileRef.getDownloadURL();
//   };

//   const handleImageChange: SubmitHandler<Inputs> = async ({ image }) => {
//     const files = image[0];
//     if (files) {
//       await uploadImage(files);
//     }
//   };

//   const onSubmit: SubmitHandler<Inputs> = async (data) => {
//     handleImageChange(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("image")} id="image" type="file" />
//       <button type="submit">Télécharger une image</button>
//     </form>
//   );
// };

// export default UploadImage;
