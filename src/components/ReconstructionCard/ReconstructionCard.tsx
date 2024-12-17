// import { FC } from 'react';
import './ReconstructionCard.css';
import { FC, useEffect, useState } from "react";

interface ReconstructionCardProps {
  title: string;
  imageurl: string;
  price: number | undefined;
  space: number | undefined; 
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
const [myspace, setmyspace] = useState<number>(1);

    useEffect(() => {
      setmyspace(space);
  }, []);

  function convertTo(input: string): number {
    const result = Number(input);
    return result
  }

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
            {/* <input
                type="text"
                className="value-input"
                placeholder='0'
                value={myspace}
              /> */}
              <input className="value-input" value={myspace} placeholder={'0'} onChange={(event => setmyspace(convertTo(event.target.value)))}/>
            м²
          </div>
        </div>
        <div className="actions">
          <button className="edit-btn" onClick={() => HandleEdit(myspace)}>
            Изменить объем
          </button>
        </div>
      </div>
    </div>
  );
};



export default ReconstructionCard;