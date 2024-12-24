import './WorksListPage.css';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { Work } from '../../api/Api'; // Подразумевается, что у вас есть тип для работы
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../components/Routes';

const WorksListPage: FC = () => {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Запрос на получение всех видов работ
    const fetchWorks = async () => {
        setLoading(true);
        try {
            const response = await api.works.worksList(); 
            const data = response.data;
            const allWorks = data.works as Work[];
            setWorks(allWorks);
        } catch (error) {
            console.error("Ошибка при загрузке работ", error);
            setWorks([]); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorks();
    }, []);

    // Обработчик клика на строку
    const handleRowClick = (id: number | undefined) => {
        if (id) {
            navigate(`/work/${id}`); // Переход к странице конкретной работы
        } else {
            console.log("Ошибка перехода на страницу работы по id");
        }
    };
    const handleChangeClick = (id: number | undefined) => {
            if (id) {
                navigate(`/work-change/${id}`);
            } else {
                console.log("Ошибка перехода на страницу  по id")
            }
    }
    const handleAddClick = () => {
        navigate(`/work-change`);
    }

    const handleDeleteClick = (id: number | undefined) => {
        const workNumberString = String(id);

        api.works.worksDeleteDelete(workNumberString);
        fetchWorks();

        // navigate(ROUTES.RECONSTRUCTIONS);
    }

    return (
        <div>
            <Header/>
            <BreadCrumbs 
                crumbs={[
                { label: ROUTE_LABELS.WORKS_TABLE, path: ROUTES.WORKS_TABLE },
                ]}
            />
            <div className='fdops'>
                <div>
                    <h1>Список видов работ</h1>
                </div>
                <Button
                    className='buttonch addd'
                    onClick={handleAddClick}
                >
                    Добавить работу
                </Button>
            </div>
            {loading ? (
                <div className="loading">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Container fluid className="table-containerr">
                    <Row className='names align-items-center'>
                        <Col>Изображение</Col>
                        <Col>Название</Col>
                        <Col>Цена</Col>
                        <Col>Действия</Col>
                    </Row>

                    {works.length === 0 ? (
                        <div>Виды работ не найдены.</div>
                    ) : (
                        works.map((work) => (
                            <Row key={work.pk} onClick={() => handleRowClick(work.pk)} className="my-2 align-items-center cursor-pointer">
                                <Col><img src={work.imageurl || 'src/assets/default_image.png'} className='imginlist'/></Col>
                                <Col>{work.title}</Col>
                                <Col>{work.price}</Col>
                                <Col className='buuttons'>
                                    <Button
                                        className='buttonch'
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            handleChangeClick(work.pk);
                                        }}
                                    >
                                        Изменить
                                    </Button>
                                    <Button
                                        className='buttondl'
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            e.stopPropagation();
                                            handleDeleteClick(work.pk)
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        ))
                    )}
                </Container>
                
            )}
        </div>
    );
};

export default WorksListPage;
