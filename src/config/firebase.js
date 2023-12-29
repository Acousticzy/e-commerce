import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: {key},
    authDomain: "dashcart-sl08.firebaseapp.com",
    projectId: "dashcart-sl08",
    storageBucket: "dashcart-sl08.appspot.com",
    messagingSenderId: "427324010762",
    appId: "1:427324010762:web:309d559cb9d5f347dc4af3"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore();
export const auth = getAuth();
