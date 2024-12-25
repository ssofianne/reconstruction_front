import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logoutUser } from '../../redux/AuthSlice';
import { ROUTES } from '../Routes';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const { isAuthenticated, username, is_staff } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const resultAction = await dispatch(logoutUser());
            if (logoutUser.fulfilled.match(resultAction)) {
                navigate(ROUTES.HOME);
            } else {
                console.error('Ошибка выхода:', resultAction.payload || resultAction.error.message);
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <div className="header">
            <div className="logo">
                <div className="logo-wrapper">
                    <Link to={'/'}>
                        <img src={'/reconstruction_front/logo.png'} alt="Логотип фонда" />
                    </Link>
                </div>
                <div className="text-wrapper">
                    <p>Сохранение<br />культурного наследия</p>
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
                    {isAuthenticated ? (
                        <>
                            <li className="username">
                                <Link to={ROUTES.USER_PROFILE}>{username}</Link>
                            </li>
                            <li><Link onClick={handleLogout} to="#">Выйти</Link></li>
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
                    {is_staff && (
                        <li>
                            <Link to="/works-table">Таблица работ</Link>
                        </li>
                    )}
                    <li><Link to="/works">Виды работ</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
