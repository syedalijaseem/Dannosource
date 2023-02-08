import React from "react";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import SignUpFrom from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";

import "./authentication.styles.scss";

const Authentication = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    console.log(response);

    if (response) {
      const userDocRef = await createUserDocumentFromAuth;
    }
  }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpFrom />
    </div>
  );
};

export default Authentication;
