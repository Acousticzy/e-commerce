import "./Cart.css"
import ShowProducts from "../Product/ShowProducts";
import { useStateValue } from "../config/StateProvider";
import { collection, getDocs, deleteDoc } from '@firebase/firestore';
import { firestore } from '../config/firebase';
import { useAuth } from "../config/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Cart(){
    const [state, dispatch] = useStateValue()
    const { currentUser, uid } = useAuth();
    const Navigate = useNavigate();    
    const [hasDocuments, setHasDocuments] = useState(null);

    useEffect(() => {
        async function checkDocuments() {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'Users', uid, "Cart"));
                setHasDocuments(!querySnapshot.empty);
            } catch (error) {
                console.error('Error checking for documents:', error);
                setHasDocuments(false);
            }
        }

        checkDocuments();
    }, []);
    
    async function handleEmptyCart(){
        const querySnapshot = await getDocs(collection(firestore, 'Users', uid, "Cart"));

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            Navigate("/");
        });
    };
    return(
        <div>  
            <div className="heading">
                <h1>{currentUser.displayName}'s Cart</h1>
            </div>
            {hasDocuments?<div className="empty-btn"><button className="button"onClick={handleEmptyCart}>Empty Cart</button></div>:<></>}
            <ShowProducts home = {false} uid = {uid} />
        </div>
    )
}

export default Cart;