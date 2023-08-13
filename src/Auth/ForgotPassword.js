import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../config/AuthContext";

function ForgotPassword(){
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    async function handleReset(e){
        e.preventDefault();
        try{
            setMessage('');
            setError("")
            setLoading(true);
            await resetPassword(email);
            setMessage("Please check your inbox for reset.")
        } catch(err){
            setError(err.message);
        }
        setLoading(false);
    }

    return(
        <div className="form">
            <h1 className="head">Forgot Password</h1>
            {error && <p className='error'>{error}</p>}
            {message && <p className='message'>{message}</p>}
            <form onSubmit={handleReset}>        
                <div className="field-wrap">
                    <input placeholder='Email Address*' type="email"required autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                </div>
            
                <div className='btn'>
                    <button className="button" type="submit">Reset Password</button>
                </div> <br />
            </form>
            <p className="footer"><Link to="/login">Log In</Link></p>
        </div>
    )
}

export default ForgotPassword;