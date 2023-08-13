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
    const [totalCost, setTotalCost] = useState(0);
    const [totalQty, setTotalQty] = useState(0);

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

    useEffect(() => {
        async function calculatePrice() {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'Users', uid, "Cart"));
                let tc = 0;
                querySnapshot.forEach((doc) => {
                    const product = doc.data();
                    const productPrice = product.price || 0; // Assuming "price" property exists
                    tc += productPrice;
                });
                setTotalQty(querySnapshot.size);
                setTotalCost(tc);
            } catch (error) {
                console.error('Error checking for documents:', error);
                setTotalCost(0);
            }
        }

        calculatePrice();
    }, [hasDocuments]);
    
    async function handleEmptyCart(){
        const querySnapshot = await getDocs(collection(firestore, 'Users', uid, "Cart"));

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            Navigate("/");
        });
    };

    function handleCheckout(){}

    return(
        <div>  
            <div className="heading">
                <h1>{currentUser.displayName}'s Cart</h1>
            </div>
            {hasDocuments?<div className="empty-btn"><button className="button"onClick={handleEmptyCart}>Empty Cart</button></div>:<></>}
            <div className="pricing">
                <p className="heading">Cart Summary</p>
                <hr />
                <p className="qty"><span className="text">{totalQty}</span> <span>item(s)</span></p>
                <p className="price"><span className="sign">Total $</span><span className="text">
                    {totalCost}</span></p>
                <button className="button"onClick={handleCheckout}>CheckOut</button>
            </div>
            <ShowProducts home = {false} uid = {uid} />
        </div>
    )
}

export default Cart;