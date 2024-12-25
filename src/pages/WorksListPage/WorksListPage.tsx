import './WorksListPage.css';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../components/Routes';
import { useAppDispatch, RootState } from '../../redux/store';
import { fetchWorks, createWork} from "../../redux/WorksSlice";
import { useSelector } from 'react-redux';
import { deleteWork } from '../../redux/WorkSlice';

const WorksListPage: FC = () => {
    const { data, loading } = useSelector((state: RootState) => state.works);
    const { is_staff } = useSelector((state: any) => state.auth);

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!is_staff) {
            navigate('/403');
            return;
        }
        appDispatch(fetchWorks()); // Получаем все работы
    }, [is_staff, appDispatch, navigate]);

    // Обработчик клика на строку
    const handleRowClick = (id: number | undefined) => {
        if (id) {
            navigate(`/work/${id}`); // Переход к странице конкретной работы
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

    const handleDeleteClick = async (id: number | undefined) => {
        if (!id) return;
        try {
            const workId = String(id);
            // Используем экшен deleteWork для удаления работы
            await appDispatch(deleteWork(workId)).unwrap();
            appDispatch(fetchWorks()); // Перезапросить данные после удаления
        } catch (error) {
            console.error('Ошибка при удалении работы:', error);
        }
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

                    {data.works.length === 0 ? (
                        <div>Виды работ не найдены.</div>
                    ) : (
                        data.works.map((work) => (
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
