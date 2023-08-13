import './Product.css';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from '../config/StateProvider';
import { useAuth } from '../config/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc } from '@firebase/firestore';
import { firestore } from '../config/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { reload } from './../Home/Header/Header';

function Product(props){
    const [state, dispatch] = useStateValue();
    const { uid } = useAuth();
    const Navigate = useNavigate();
    
    const handleAddToCart = () => {
        if (uid != null){
            setDoc(doc(collection(firestore, 'Users', uid, "Cart"), props.ID), {
                ID : props.ID,
                title : props.title,
                price : props.price,
                src : props.src
            })
        } else{
            Navigate("/login");
        }
    };

    const handleRemoveFromCart = () =>{
        deleteDoc(doc(collection(firestore, 'Users', uid, 'Cart'), props.ID))
        window.location.reload();
    };

    return(
        <div className="product" key = {props.ID}>
            <div className="details">
                <h2 className="title">{props.title}</h2>
                <p className="price"><span className="sign">$</span><span className="text">{props.price}</span></p>
                <p className="rating">{[...Array(5)].map((e, i) => ( 
                    <StarIcon className='icon' key={i} /> 
                    ) 
                )} <span className='nrating'>(11)</span></p>
            </div>
            <div className="visual">
                <img className="image" src={props.src} alt={props.title} /> <br></br><br></br>                              
                {props.cart? <DeleteIcon fontSize='smaller' className='del-icon' onClick={handleRemoveFromCart}></DeleteIcon>: 
                <button className="button" onClick={handleAddToCart}>Add to Cart</button>}
            </div>
        </div>
    )
}

export default Product;