import React from 'react';
import { Link } from 'react-router-dom';
// import { work } from '../../modules/Work';
import './WorkCard.css';

type WorkCardProps = {
  work: {
    pk: number; // Обязательно должно быть число
    title: string;
    description: string;
    price: number;
    imageurl: string;
  }; 
};


const WorkCard: React.FC<WorkCardProps>   = ({ work }) => {

  return (
    <div className="card" key={work.pk}>
      <img src={work.imageurl || 'src/assets/default_image.png'} className="image" />
      <div className="info">
        <p className="title">{work.title}</p>
        <p className="price">{work.price} ₽/м²</p>
      </div>
      <div className="down">
        <Link to={`/work/${work.pk}/`} className="card-button">
          Подробнее
        </Link>
        <form method="post" action={`/work/${work.pk}/add_work/`}>
          <button className="card-button" type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkCard;