import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcFvJ5W2wjkvT8ZWU_Hq4U_IAz4MbQ9Ig",
  authDomain: "weatherreport-f46e3.firebaseapp.com",
  projectId: "weatherreport-f46e3",
  storageBucket: "weatherreport-f46e3.appspot.com",
  messagingSenderId: "1099229935992",
  appId: "1:1099229935992:web:46f094cab3bbe2676b308d"
};
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db = getFirestore(app);
export default app;