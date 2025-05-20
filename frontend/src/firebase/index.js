import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi4jByvCD61RhvlbnEdkcoX61v_1fLq68",
  authDomain: "employee-db-1605.firebaseapp.com",
  projectId: "employee-db-1605",
  storageBucket: "employee-db-1605.firebasestorage.app",
  messagingSenderId: "784736424769",
  appId: "1:784736424769:web:be3236037a59c279d347c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
