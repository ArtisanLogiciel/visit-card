import React from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useDatabase from "./useDatabase";

const useAuthUser = () => {
  const [authUser, setAuthUser] = React.useState<UserCredential | null>(null);
  const [errorFirebaseUser, setErrorFirebaseUser] = React.useState("");
  const { createUserDocument } = useDatabase();

  const loginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => setAuthUser(userCredential))
      .catch((error) => setErrorFirebaseUser(error.message));
  };

  const registerUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthUser(userCredential);
        createUserDocument(userCredential.user.uid, {
          mailSignIn: userCredential.user.email,
        });
      })
      .then(() => setErrorFirebaseUser(""))
      .catch((error) => setErrorFirebaseUser(error.message));
  };

  const logoutUser = async () => {
    await signOut(auth)
      .then(() => {
        setAuthUser(null);
        setErrorFirebaseUser("");
      })
      .catch((error) => setErrorFirebaseUser(error.message));
  };

  return { authUser, loginUser, registerUser, logoutUser, errorFirebaseUser };
};

export default useAuthUser;
