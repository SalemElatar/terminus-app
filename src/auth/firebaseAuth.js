import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChrPHWRwd06aZ64ZIHeMncwqXUhNx0LDw",
  authDomain: "terminus-auth.firebaseapp.com",
  projectId: "terminus-auth",
  storageBucket: "terminus-auth.appspot.com",
  messagingSenderId: "14448346802",
  appId: "1:14448346802:web:1f3fa8b17a573d6cd0ebab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authProvider = new GoogleAuthProvider();

const auth = getAuth();

export const googleAuth = async () => {
  let user = null;
  await signInWithPopup(auth, authProvider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });
  return user;
};
