import { FC, useEffect } from 'react';
import { useAppDispatch, RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchWork } from '../../redux/WorkSlice'; // Импорт экшена
import { Spinner } from 'react-bootstrap';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import Header from '../../components/Header/Header';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import './WorkDetailPage.css';

export const WorkDetailPage: FC = () => {
    const dispatch = useAppDispatch();
    const { pk } = useParams();
    const { data, loading, error } = useSelector((state: RootState) => state.work);

    useEffect(() => {
        console.log('workId from params:', pk);
        if (pk) {
            dispatch(fetchWork(pk)); 
        }
    }, [dispatch, pk]);

    return (
        <div>
            <Header />
            <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS },
                    { label: data?.title || 'Работа' },
                ]}
            />
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <div>{`Ошибка: ${error}`}</div>
            ) : (
                <div className="page-container">
                    <div className="page-title">{data?.title}</div>
                    <div className="content-wrapper">
                        <div className="content-info">
                            <div className="content-img">
                                <div className="image-wrapper">
                                    <img src={data?.imageurl} alt={data?.title} />
                                </div>
                            </div>
                            <div className="garanties">
                                <div className="garanties-wrapper">
                                    <div className="making-progect">
                                        Создание проекта с учетом ваших пожеланий и требований
                                    </div>
                                    <div className="working-time">
                                        Время выполнения зависит от объема работ
                                    </div>
                                    <div className="work-garant">
                                        Гарантия на выполненные работы и материалы 1 год
                                    </div>
                                    <div className="work-price">
                                        <p>Цена</p>
                                        <p>{data?.price} ₽/м²</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="subtitle">{data?.description}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
