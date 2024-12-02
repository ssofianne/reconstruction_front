import { FC, useEffect, useState } from "react";
import {BreadCrumbs} from '../../components/Breadcrumbs/BreadCrumbs';
import Header from '../../components/Header/Header';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import { useParams } from "react-router-dom";
import { Work } from "../../modules/Work";
import { Spinner } from "react-bootstrap";
import { fetchWork } from '../../modules/mocks';
import "./WorkDetailPage.css";

export const WorkDetailPage: FC = () => {
    const { workId } = useParams();
    const [work, setWork] = useState<Work | null>(null);
    const [, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndDisplayWork = async () => {
            if (!workId) {
                setError('ID работы не указан');
                setLoading(false);
                return;
            }
            try {
                const numericWorkId = parseInt(workId, 10);
                if (isNaN(numericWorkId)) {
                setError('Неверный формат ID работы');
                setLoading(false);
                return;
            }
            const fetchedWork = await fetchWork(numericWorkId);
            if (fetchedWork === undefined || fetchedWork === null) {
                setError('Работа не найдена');
                return;
            }
            setWork(fetchedWork);
            } catch (error) {
                setError('Ошибка при загрузке работы');
            } finally {
                setLoading(false);
            }
        };
        fetchAndDisplayWork();
    }, [workId]);

    if (loading) {
        return <div>{loading && <div className="loadingBg"><Spinner animation="border"/></div>}</div>;
    }

  return (
    <div>
        <Header /> 
        <BreadCrumbs
            crumbs={[
            { label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS },
            { label: work?.title || "Работа" },
            ]}
        />
        {work ? ( // проверка на наличие данных, иначе загрузка
            <div className="page-container">
                <div className="page-title">
                    {work.title}
                </div>
                <div className="content-wrapper">
                    <div className="content-info">
                        <div className="content-img">
                            <div className="image-wrapper">
                                <img src={work.imageurl} alt={work.title}/>
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
                                    <p>{work.price}  ₽/м²</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="subtitle">
                        {work.description}
                    </div>
                </div>
            </div>
        ) : (
            <div>{/* загрузка */}
            <Spinner animation="border" />
            </div>
        )}
    </div>
  );
};