import React from 'react';
import { Link } from 'react-router-dom';
import './WorkCard.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type WorkCardProps = {
    work: {
        pk: number;
        title: string;
        description: string;
        price: number;
        imageurl: string;
    };
    onAddWork: (workId: number) => Promise<void>;
};

const WorkCard: React.FC<WorkCardProps> = ({ work, onAddWork }) => {
    const { is_staff } = useSelector((state: RootState) => state.auth);
    const handleAddWork = async () => {
        try {
            await onAddWork(work.pk);
        } catch (error) {
            console.error('Ошибка при добавлении работы:', error);
        }
    };

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
                {!is_staff && (
                    <button className="card-button" onClick={handleAddWork}>
                        Добавить
                    </button>
                )}
            </div>
        </div>
    );
};

export default WorkCard;
