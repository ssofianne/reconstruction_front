// import Header from '../../components/Header/Header';
import './ForbiddenPage.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <>
            {/* <Header /> */}
            <div className="not-found-container">
                <h1 className="not-found-title">403</h1>
                <p className="not-found-message">
                    Ой! Доступ запрещен.
                </p>
                <Link to="/" className="not-found-link">Вернуться на главную</Link>
            </div>
        </>
    );
};

export default NotFoundPage;