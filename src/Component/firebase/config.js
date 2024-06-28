// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkiK4IIYlvKJmz_HGkZ6YbI0thjYHmxgo",
  authDomain: "run-ride-icey.firebaseapp.com",
  projectId: "run-ride-icey",
  storageBucket: "run-ride-icey.appspot.com",
  messagingSenderId: "308168262434",
  appId: "1:308168262434:web:99ae7932b97db7036a5b7b",
  measurementId: "G-L8YX3XR3HS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
