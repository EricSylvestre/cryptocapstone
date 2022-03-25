// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1VBkBiZp43KN-ZxGsQODgGglA9bLrxfs",
    authDomain: "cryptocapstone.firebaseapp.com",
    projectId: "cryptocapstone",
    storageBucket: "cryptocapstone.appspot.com",
    messagingSenderId: "965521961321",
    appId: "1:965521961321:web:b2cfd0a96f652df1614df8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)