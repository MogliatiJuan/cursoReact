import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAh27ZUQ2Ncf3ZCSFkLnA01bTFUhDg46Io",
    authDomain: "react-project1-aff22.firebaseapp.com",
    projectId: "react-project1-aff22",
    storageBucket: "react-project1-aff22.appspot.com",
    messagingSenderId: "196142550466",
    appId: "1:196142550466:web:acc765f6d14fab83c59a5b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)