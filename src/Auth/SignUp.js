import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../config/AuthContext';

function SignUp(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const Navigate = useNavigate();

    async function handleSignUp(e){
        e.preventDefault();
        try{
            setError("")
            setLoading(true);
            await signUp(firstName, lastName, email, password)
            Navigate('/')
        } catch(err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className="form">   
                <h1 className='head'>Sign Up for Free</h1>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSignUp}>                
                    <div className="top-row">
                        <div className="field-wrap">
                            <input placeholder='First Name*' type="text" required autoComplete="off" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                
                        <div className="field-wrap">
                            <input placeholder='Last Name*' type="text"required autoComplete="off" onChange={(e) => setLastName(e.target.value)}/>
                        </div>

                        <div className="field-wrap">
                            <input placeholder='Email Address*' type="email"required autoComplete="off"  onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        
                        <div className="field-wrap">
                            <input placeholder='Password*' type="password"required autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className='btn'>
                        <button type="submit" className="button button-block">Get Started</button>
                    </div>
                    <br />
                    <p className="footer">Already a member? <Link to="/login">Log In</Link></p>
                </form>
        </div>
    )
}

export default SignUp;