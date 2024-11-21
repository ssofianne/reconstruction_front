import { Link } from 'react-router-dom'; 
import './Header.css'
import Navbar from '../Navbar/Navbar';
// import Breadcrumbs from '../Breadcrumbs/BreadCrumbs';


const Header = () => {

    return (
        <div className="header">
            <div className='logo'>
                <div className="logo-wrapper">
                    <Link to={'/works'}> 
                        <img src={'http://127.0.0.1:9000/fond-media/logo.png'} alt="Логотип фонда" />
                    </Link>
                </div>
                <div className="text-wrapper">
                    <p>Сохранение<br/>культурного наследия</p>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Header