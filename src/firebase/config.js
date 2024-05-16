// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv3XgYBvavzgKURlgb4rv7s3Yfii0DsCQ",
  authDomain: "twitter-clone-47b63.firebaseapp.com",
  projectId: "twitter-clone-47b63",
  storageBucket: "twitter-clone-47b63.appspot.com",
  messagingSenderId: "488617873729",
  appId: "1:488617873729:web:70fafa6afb363e45e991c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//FİREBASE AUTH REFERANSINI ALMA
export const auth = getAuth(app);

//google sağlaycısını kurma
export const provider = new GoogleAuthProvider();

//veri tabanını referansını alma
export const db = getFirestore(app);

//dosya yükleme alanın referansını alma
export const storage = getStorage(app);
