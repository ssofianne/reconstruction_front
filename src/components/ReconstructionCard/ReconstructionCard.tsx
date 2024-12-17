import { FC } from 'react';
import './ReconstructionCard.css';

interface ReconstructionCardProps {
  title: string;
  imageurl: string;
  price: number | undefined;
  space: number; 
  imageClickHandler: () => void;
  HandleEdit: (space: number) => void;
  HandleDelete: () => void;
}


const ReconstructionCard: FC<ReconstructionCardProps> = ({ 
    title, 
    imageurl,
    price,
    space = 0,
    imageClickHandler,
    HandleEdit, 
    HandleDelete 
  }) => {
  return (
    <div className="card-container">
      <div >
        <img src={imageurl} alt={title} className="work-img" onClick={imageClickHandler}/>
      </div>
      <div className="info-work">
        <div className='title_and_delete'>
          <div className="title-card">{title}</div>
          <button className="delete-btn" onClick={HandleDelete}>
            ✕
          </button>
        </div>
        <div className="specifications">
          <p>Цена: {price} ₽/м²</p>
          <div>
            Объем работ:
            <input
                type="text"
                className="value-input"
                placeholder='0'
                defaultValue={space.toString()} 
              />
            м²
          </div>
        </div>
        <div className="actions">
          <button className="edit-btn" onClick={() => HandleEdit(space ?? 0)}>
            Изменить объем
          </button>
        </div>
      </div>
    </div>
  );
};



export default ReconstructionCard;