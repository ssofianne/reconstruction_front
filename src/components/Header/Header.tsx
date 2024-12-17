import { Link } from 'react-router-dom'; 
import './Header.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/AuthSlice';
import { ROUTES } from '../Routes';
import { api } from '../../api';

interface User {
    username: string | null; 
}

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {setIsMobileMenuOpen(!isMobileMenuOpen);};
    const user: User = useSelector((state: RootState) => state.auth.user); // Доступ к пользователю из Redux
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await api.logout.logoutCreate(); // Вызов метода API
    
            if (response) {
                dispatch(logout()); // Удаление пользователя из Redux
            } else {
                console.error('Ошибка выхода: пустой ответ от сервера');
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
        // dispatch(logout()); 
    };

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
            <div className="navbar">
                <div className="burger-menu" onClick={toggleMobileMenu}>
                    <div className={`burger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    {user?.username ? (
                        <>
                            <li className='username'>
                                <Link  to={ROUTES.USER_PROFILE}>{user.username}</Link>
                            </li>
                            <li><Link onClick={handleLogout} to={''}>Выйти</Link></li>
                            <li><Link to={ROUTES.RECONSTRUCTIONS}>Реконструкции</Link></li>
                        </>
                    ) : (
                        <>
                            <li>
                            <Link to="/login">Войти</Link>
                            </li>
                            <li>
                            <Link to="/register">Регистрация</Link>
                            </li>
                        </>
                    )}
                    <li><Link to="/works">Виды работ</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header