import { FC } from 'react';
import './ReconstructionCard.css';

interface ReconstructionCardProps {
    title: string;
    imageurl: string;
    price: number | undefined;
    space: number;
    imageClickHandler: () => void;
    HandleEdit: () => void;
    HandleDelete: () => void;
}

const ReconstructionCard: FC<ReconstructionCardProps> = ({ 
        title, 
        imageurl,
        price,
        space,
        imageClickHandler,
        HandleEdit, 
        HandleDelete 
    }) => {
  return (
    <div className="card-container">
      {/* <div className="cardd"> */}
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
                    defaultValue={space}
                    readOnly
                />
              м²
            </div>
          </div>
          <div className="actions">
            <button className="edit-btn" onClick={HandleEdit}>
              Изменить объем
            </button>
            
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ReconstructionCard;