import { Link } from 'react-router-dom'; 
import './Header.css'
import Navbar from '../Navbar/Navbar';
// import Breadcrumbs from '../Breadcrumbs/BreadCrumbs';


const Header = () => {

    return (
        <div className="header">
            <div className='logo'>
                <div className="logo-wrapper">
                    <Link to={'/'}> 
                        <img src={'/reconstruction_front/logo.png'} alt="Логотип фонда" />
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