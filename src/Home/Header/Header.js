import './Header.css';
import StoreIcon from '@mui/icons-material/Store';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useAuth } from '../../config/AuthContext';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../config/firebase';
import { useEffect, useState } from "react";

function Header(){
    const { isLoggedIn, currentUser, uid } = useAuth();
    const [documentCount, setDocumentCount] = useState(null);

    useEffect(() => {
        async function checkDocuments() {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'Users', uid, "Cart"));
                setDocumentCount(querySnapshot.size);
            } catch (error) {
                console.error('Error checking for documents:', error);
                setDocumentCount(0);
            }
        }

        checkDocuments();
    }, [uid]);

    function CartCounter(props){
        return (<p>{ props.documentCount }</p>)
    }

    function LogState(){
        return(isLoggedIn? (<>
                            <div className="auth" id='greeting'>
                                Hello, {currentUser && currentUser.displayName}
                            </div>
                            <div className='auth'>
                                <span id="two"><Link to="/logout">Log Out</Link></span>
                            </div>
                            <Link className='cart-link' to="/cart">
                                <ShoppingCartIcon className='cart' fontSize="5px" />
                                <CartCounter documentCount = {documentCount} />
                            </Link>
                            </>):
                        (<>
                            <div className='auth'>
                                <span id="one">Welcome back?</span>
                                <span id="two"><Link to="/login">Log In</Link></span>
                            </div>
                            <div className='auth'>
                                <span id="one">New here?</span>
                                <span id="two"><Link to="/signup">Sign Up</Link></span>
                            </div>
                            <Link to="/login">
                                <ShoppingCartIcon className='cart' fontSize="5px" />
                            </Link>
                        </>))
    }

    return(
        <div className = "header">
            <Link to="/">
                <div className="logo">
                    <StoreIcon className="logo-image" fontSize="large"/>
                    <div>                        
                        <h2 className = "text">DashCart</h2>
                        <p className = "slogan">shop smartly</p>
                    </div>
                </div>
            </Link>
            <div className="search-bar">
                <input className='input' placeholder='Search DashCart.com' />
                <button className ="search"><SearchIcon fontSize="5px" /></button>
            </div>
            <div className="auths">
                <LogState />
            </div>
        </div>
    )
}
export default Header;