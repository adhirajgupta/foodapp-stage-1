// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC18dMxEF7JYVMjtX7vfZhVzNJv4nbo9r4",
  authDomain: "food-app-47f24.firebaseapp.com",
  projectId: "food-app-47f24",
  storageBucket: "food-app-47f24.appspot.com",
  messagingSenderId: "1073581696116",
  appId: "1:1073581696116:web:cc9a547fd0fd1300e85d21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app