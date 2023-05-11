import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  // getting the document data
  getDoc,
  // setting the document data
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

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
      let accountType;
      if (userAuth.providerData && userAuth.providerData.length) {
        // Use the provider data to determine the account type
        const { providerId } = userAuth.providerData[0];
        if (providerId === "google.com") {
          accountType = "Google";
        } else if (providerId === "password") {
          accountType = "Email";
        }
      }
      await setDoc(userDocRef, {
        displayName,
        email,
        accountType,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// Add the following function to get the accountType of the currently logged-in user
export const getCurrentUserAccountType = async () => {
  const currentUser = auth.currentUser;

  console.log(currentUser);

  if (currentUser) {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);
    const { accountType } = userSnapshot.data();
    return accountType;
  } else {
    return null;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("error signing in the user", error.message);
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { storage };
