import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../config/AuthContext';

function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const Navigate = useNavigate();

    async function handleLogIn(e){
        e.preventDefault();
        try{
            setError("")
            setLoading(true);
            await logIn(email, password);
            Navigate('/')
        } catch(err){
            setError(err.message);
        }
        setLoading(false);
    }

    return(
        <div className="form">   
            <h1 className="head">Welcome Back!</h1>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleLogIn}>        
                <div className="field-wrap">
                    <input placeholder='Email Address*' type="email"required autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                </div>
            
                <div className="field-wrap">
                    <input placeholder='Password*' type="password"required autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
                </div>
            
                <p className="forgot"><a href="#">Forgot Password?</a></p>
                <div className='btn'>
                    <button className="button" type="submit">Log In</button>
                </div> <br />
            </form>
            <p className="footer">Not a member? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default LogIn;