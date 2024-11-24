import "./WorkDetailPage.css";
import { FC, useEffect, useState } from "react";
import {BreadCrumbs} from '../../components/Breadcrumbs/BreadCrumbs';
import Header from '../../components/Header/Header';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import { useParams } from "react-router-dom";
import { Work, getWorkById } from "../../modules/Work";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import { fetchWorks } from '../../modules/mocks';
// import defaultImage from "/DefaultImage.jpg";

export const WorkDetailPage: FC = () => {
  const [loading, setLoading] = useState(false)
  const [work, setWork] = useState<Work>()

  const { pk } = useParams(); // ид страницы, пример: "/albums/12"

    //   useEffect(() => {
    //     if (!pk) return;
    //     getWorkById(pk)
    //     .then((response) => {
    //         if (response.works && response.works.length > 0) {
    //           setPageData(response.works[0]);  // Устанавливаем данные работы
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Ошибка при загрузке работы:", error);
    //       });
    //   }, [pk]);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                setLoading(true);
                const fetchedWork = await getWorkById(parseInt(pk!, 10));
                setWork(fetchedWork);
            } catch (error: any) {
                console.error("Ошибка при загрузке работы:", error);
            } finally {
                setLoading(false);
            }
        };

        if (pk) {
            fetchWork();
        }
    }, [pk]);

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
                                <img src={work.imageurl} className="image-wrapper"/>
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
            <div className="album_page_loader_block">{/* загрузка */}
            <Spinner animation="border" />
            </div>
        )}
    </div>
  );
};