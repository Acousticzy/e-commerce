import { useEffect, useState } from "react";
import { firestore } from "../config/firebase";
import { collection, getDocs } from '@firebase/firestore';
import Product from "./Product.js";

function ShowProducts(props){
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(false);
    useEffect(() => {
        const getProducts = async() => {
            try {
                if (props.home){ 
                    const productsSnapshot = await getDocs(collection(firestore, 'Products'));
                    const productsArray = productsSnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            ID: doc.id,
                            ...data
                        };
                    });
                    setProducts(productsArray);
                } else{
                    setCart(true);
                    const productsSnapshot = await getDocs(collection(firestore, 'Users', props.uid, "Cart"));
                    const productsArray = productsSnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            ID: doc.id,
                            ...data
                        };
                    });
                    setProducts(productsArray);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, []);

    return (
        <div className='products'>
            {products.length > 0 && (
                products.map((product) => (
                    <Product cart = {cart} ID = {product.ID} title = {product.title} src = {product.src} price = {product.price} />
                ))
            ) }
        </div>
    )
}

export default ShowProducts;