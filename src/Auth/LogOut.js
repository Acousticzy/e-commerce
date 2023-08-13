import './Form.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext';
import { useState } from 'react';

function LogOut(){
    const Navigate = useNavigate();
    const { logOut } = useAuth();
    const [error, setError] = useState("")

    async function handleLogOut(e){
        e.preventDefault();
        try{
            await logOut()
            Navigate('/')
        } catch{
            setError('Failed to log out')
        }
    }

    return(
        <div className='form'>
            <h1>Are you sure you want to Log Out?</h1>
                {error && <h1>{error}</h1>}
            <form onSubmit={handleLogOut}>
                <div className='btn'>
                    <button type="submit" className="button button-block">Log Out</button>
                </div>
            </form>
        </div>
    )
}

export default LogOut;