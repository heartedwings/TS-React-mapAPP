// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
interface config {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}

const firebaseConfig:config = {
    apiKey: "AIzaSyBYS2Z4QmbQgA-J5T-NDIWSkHxNsLDh7zw",
    authDomain: "ts-react-mapapp.firebaseapp.com",
    projectId: "ts-react-mapapp",
    storageBucket: "ts-react-mapapp.appspot.com",
    messagingSenderId: "1065326089557",
    appId: "1:1065326089557:web:9d1d2fb9ddfc2d7a720bdc",
    measurementId: "G-R5ZGJKDSTQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);