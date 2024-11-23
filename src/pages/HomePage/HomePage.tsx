import { Link } from 'react-router-dom';
import './HomePage.css'
import { Button } from 'react-bootstrap';
import { ROUTES } from '../../components/Routes';

const HomePage = () => {
    return (
        <div className="homepage my-custom-font">
            <h1 className="display-3 mb-4">Реконструкция исторических зданий</h1>
            <p className="lead mb-4">
                Мы бережно восстанавливаем историческое наследие, используя современные технологии и традиционные методы.  
            </p>
            <Link to={ROUTES.WORKS}>
            <Button style={{ backgroundColor: '#3E80C2' }}>Подробнее</Button>
          </Link>
        </div>
    );
};

export default HomePage;