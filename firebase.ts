
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBssjoxB3-Nt-ZlARi1NPEBW4ygWCNwGLA",
    authDomain: "ecommerce-b9140.firebaseapp.com",
    projectId: "ecommerce-b9140",
    storageBucket: "ecommerce-b9140.firebasestorage.app",
    messagingSenderId: "945329986783",
    appId: "1:945329986783:web:bee68e16758897c56e1d6a",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
