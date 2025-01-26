// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBVyrE6aZTqcwFiX5rKnO6uJig_5A01nD0",
//   authDomain: "react-firebase-crud-a729f.firebaseapp.com",
//   projectId: "react-firebase-crud-a729f",
//   storageBucket: "react-firebase-crud-a729f.firebasestorage.app",
//   messagingSenderId: "783153641975",
//   appId: "1:783153641975:web:01912d29c2462c97c596f2",
//   measurementId: "G-D4RPXTX358"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth=getAuth(app)


//********* Production mode*************** */


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoQ7xGnzys8ehenWxkD-a5aOCoCVX98LM",
  authDomain: "fir-expense-a5150.firebaseapp.com",
  projectId: "fir-expense-a5150",
  storageBucket: "fir-expense-a5150.firebasestorage.app",
  messagingSenderId: "200064816986",
  appId: "1:200064816986:web:b6e95ef7afd968fa5bc563",
  measurementId: "G-XJQCP6BY75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)