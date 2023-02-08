import React from "react";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import SignUpFrom from "../../components/sign-up-form/sign-up-form.component.jsx";

const SignIn = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    console.log(response);

    if (response) {
      const userDocRef = await createUserDocumentFromAuth;
    }
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <SignUpFrom />
    </div>
  );
};

export default SignIn;
