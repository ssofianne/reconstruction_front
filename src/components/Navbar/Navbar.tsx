import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <ul>
        {/* <li className='buttons-navbar'><Link to="/">Главная</Link></li> */}
        <li className='buttons-navbar'><Link to="/works">Виды работ</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;