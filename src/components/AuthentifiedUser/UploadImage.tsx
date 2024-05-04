// import React, { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { UserContext } from '../..Providers/userProvider'; // Assurez-vous d'importer UserContext correctement
// import firebase from 'firebase/app';
// import 'firebase/storage';

// type Inputs = {
//   image: File;
// };
// const UploadImage = () => {
//   const { register, handleSubmit } = useForm();

//   const uploadImage = async (file: File) => {
//     const storageRef = firebase.storage().ref();
//     const fileRef = storageRef.child(`images/${file.name}`);
//     await fileRef.put(file);
//     return await fileRef.getDownloadURL();

//   };

//   const handleImageChange: SubmitHandler<Inputs> = async ({image}) => {
//     const files = image;
//     if (files) {
//       await uploadImage(files); // Optionnel: enregistre le fichier dans react-hook-form
//     }
//   };

//   const onSubmit = async (data: Inputs) => {
//     handleImageChange(data.image);
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Autres champs de formulaire */}
//       <input {...register('image')} id='image' type="file"/>
//       <button type="submit">Créer la carte</button>
//     </form>
//   );
// };

// export default UploadImage;
