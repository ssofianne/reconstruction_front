import React from 'react';
import { Link } from 'react-router-dom';
import { Work } from '../../modules/Work';

type WorkCardProps = {
    work: Work; 
};


const WorkCard: React.FC<WorkCardProps>   = ({ work }) => {
  return (
    <div className="card" key={work.id}>
      <img src={work.imageurl || '../../assets/default_image.png'} className="image" />
      <div className="info">
        <p className="title">{work.title}</p>
        <p className="price">{work.price} ₽/м²</p>
      </div>
      <div className="down">
        <Link to={`/work/${work.id}`} className="card-button">
          Подробнее
        </Link>
        <form method="post" action={`/work/${work.id}/add_work/`}>
            <button className="main-block__button__add" type="submit">
                Добавить
            </button>
        </form>
      </div>
    </div>
  );
};

export default WorkCard;