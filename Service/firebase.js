// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSxcFr7Un6NEDNlB3B1bhvghBG9F5BGbg",
  authDomain: "form-submission-validate.firebaseapp.com",
  databaseURL: "https://form-submission-validate-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "form-submission-validate",
  storageBucket: "form-submission-validate.appspot.com",
  messagingSenderId: "841809078669",
  appId: "1:841809078669:web:a8dc8e931f2e3131a7b5c4"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);