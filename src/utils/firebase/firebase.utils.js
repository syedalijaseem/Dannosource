import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  // getting the document data
  getDoc,
  // setting the document data
  setDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCncALkkEvdYLycZzbJDPY470ffMDUheA8",
  authDomain: "dannsource-db.firebaseapp.com",
  projectId: "dannsource-db",
  storageBucket: "dannsource-db.appspot.com",
  messagingSenderId: "923200238985",
  appId: "1:923200238985:web:1b05263d6c562d94e5dd58",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(firebaseConfig);

googleProvider.setCustomParameters({
  prompt: "select_account",
});

/*
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};
*/

// might need different providers but don't need multiple auths
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// receives user authentication object and stores it inside firestore
// creates user instance in firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
