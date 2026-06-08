// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_vxOnCP-z_50fiU8SZEAll1JsIO28H60",
  authDomain: "plan-it-d7a19.firebaseapp.com",
  projectId: "plan-it-d7a19",
  storageBucket: "plan-it-d7a19.firebasestorage.app",
  messagingSenderId: "242011387359",
  appId: "1:242011387359:web:0518599391c619697f006a",
  measurementId: "G-6YD56QM5MN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);