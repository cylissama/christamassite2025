import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBATnDaADgBzMuiCSea8zQSChdlK9l6P34",
  authDomain: "christmas-party-c7712.firebaseapp.com",
  projectId: "christmas-party-c7712",
  storageBucket: "christmas-party-c7712.firebasestorage.app",
  messagingSenderId: "825815532687",
  appId: "1:825815532687:web:2934cd6dc44b94cbec1cfa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);