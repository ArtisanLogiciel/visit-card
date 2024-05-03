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

  const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => setAuthUser(userCredential))
      .catch((error) => setErrorFirebaseUser(error.message));
  };

  const registerUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthUser(userCredential);
        createUserDocument(userCredential.user.uid, {
          mailSignIn: userCredential.user.email,
        });
      })
      .catch((error) => setErrorFirebaseUser(error.message));
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        setErrorFirebaseUser("");
      })
      .catch((error) => setErrorFirebaseUser(error.message));
  };

  return { authUser, loginUser, registerUser, logoutUser, errorFirebaseUser };
};

export default useAuthUser;
