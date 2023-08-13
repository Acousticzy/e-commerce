import { createContext, useContext, useEffect, useState } from "react";
import { doc, setDoc } from '@firebase/firestore';
import { auth, firestore } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState(null);

    const signUp = (firstName, lastName, email, password) =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setDoc(doc(firestore, "Users", userCredential.user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            updateProfile(userCredential.user, { displayName: firstName })
        }).catch((error) => {
            console.log(error);
        });
    }

    const logIn = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    }

    const logOut = () =>{
        setIsLoggedIn(false);
        return auth.signOut();
    };

    const resetPassword = (email) =>{
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
                                user? setIsLoggedIn(true) : setIsLoggedIn(false);
                                setCurrentUser(user);
                                user? setUid(user.uid): setUid(null);
                                setLoading(false);
                            });
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        isLoggedIn,
        uid,
        resetPassword
    }

    return(
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext)