// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgo8rMyOVwgrU4vjeU7gPQ-Fps_vAoL08",
    authDomain: "riskend-d25f8.firebaseapp.com",
    projectId: "riskend-d25f8",
    storageBucket: "riskend-d25f8.appspot.com",
    messagingSenderId: "654169383617",
    appId: "1:654169383617:web:707a9afddd6f7460146a40",
    measurementId: "G-KJDGVE81CX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
