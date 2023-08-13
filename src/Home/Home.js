import Header from './Header/Header';
import ShowProducts from '../Product/ShowProducts';
import { collection } from 'firebase/firestore';
import { firestore } from '../config/firebase';

function Home() {
    return (
        <div>
            <Header /><br /><br />
            <ShowProducts home = {true} />
        </div>
    );
}

export default Home;
