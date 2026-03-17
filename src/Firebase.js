// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzh1ig1H0THyFGjB5CJKw98pDMd2QNZLI",
  authDomain: "study-flow-3a0ee.firebaseapp.com",
  projectId: "study-flow-3a0ee",
  storageBucket: "study-flow-3a0ee.firebasestorage.app",
  messagingSenderId: "733647871513",
  appId: "1:733647871513:web:89cea2cf74172811ead488",
  measurementId: "G-YYL52BNJM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);