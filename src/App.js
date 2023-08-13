import './App.css';
import Home from './Home/Home.js';
import Cart from './Cart/Cart';
import SignUp from './Auth/SignUp';
import LogIn from './Auth/LogIn';
import LogOut from './Auth/LogOut';
import { AddProducts } from './Product/AddProducts';
import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/add' element={<AddProducts/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<LogIn/>} />
          <Route exact path='/logout' element={<LogOut/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
