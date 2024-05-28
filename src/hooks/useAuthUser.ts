import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase.config";
import useDatabase from "./useDatabase";

const useAuthUser = () => {
  const [authUser, setAuthUser] = React.useState<UserCredential | null>(null);
  const [errorFirebaseUser, setErrorFirebaseUser] = React.useState("");
  const { createUserDocument } = useDatabase();

  const loginUser = async (
    email: string,
    password: string
  ): Promise<void | { error: boolean }> => {
    const authentification = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => setAuthUser(userCredential))
      .then(() => setErrorFirebaseUser(""))
      .catch((error) => {
        setErrorFirebaseUser(error.message);
        return { error: true };
      });
    return authentification;
  };

  const registerUser = async (
    email: string,
    password: string
  ): Promise<void | {
    error: boolean;
  }> => {
    const signupUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        setAuthUser(userCredential);
        createUserDocument(userCredential.user.uid, {
          mailSignIn: userCredential.user.email,
        });
      })
      .then(() => setErrorFirebaseUser(""))
      .catch((error) => {
        setErrorFirebaseUser(error.message);
        return { error: true };
      });
    return signupUser;
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
