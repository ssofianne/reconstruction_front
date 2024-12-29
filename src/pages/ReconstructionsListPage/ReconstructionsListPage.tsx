import './ReconstructionsListPage.css';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { Reconstruction } from '../../api/Api';
import { DateDisplay } from '../../modules/DateDisplay';
import { Container, Row, Spinner, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchReconstructions, changeStatus } from '../../redux/ReconstructionsSlice';

const ReconstructionsListPage: FC = () => {
    const translations: {[key: string]: string} = {
        "draft": "черновик",
        "deleted": "удалена",
        "created": "сформирована",
        "completed": "завершена",
        "rejected": "отклонена"
    };
    function translateElement(element: HTMLElement) {
        const key = element.dataset.translation;
        if (key && translations.hasOwnProperty(key)) {
            element.textContent = translations[key];
        }
    }
    
    function translatePage() {
        const elementsToTranslate = document.querySelectorAll<HTMLElement>('[data-translation]'); 
        elementsToTranslate.forEach(element => {
          if (element instanceof HTMLElement) {
            translateElement(element);
          }
        });
    }

    const [creatorFilter, setCreatorFilter] = useState<string>('');
    const [filteredReconstructions, setFilteredReconstructions] = useState<Reconstruction[]>([]);
    const { is_staff } = useSelector((state: RootState) => state.auth);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [status, setStatus] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.reconstructions);
    const navigate = useNavigate();

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Корректировка на часовой пояс
            setStartDate(localDate);  // Устанавливаем локальную дату
        } else {
            setStartDate(undefined);  // Если дата пустая, сбрасываем
        }
    };
    
    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Корректировка на часовой пояс
            setEndDate(localDate);  // Устанавливаем локальную дату
        } else {
            setEndDate(undefined);  // Если дата пустая, сбрасываем
        }
    };;

    useEffect(() => {
        translatePage();
    }, [filteredReconstructions]);

    useEffect(() => {
        // Преобразуем даты в строку формата YYYY-MM-DD перед отправкой
        dispatch(fetchReconstructions({
            startDate: startDate ? startDate.toISOString().split('T')[0] : '',
            endDate: endDate ? endDate.toISOString().split('T')[0] : '',
            status,
        }));
        console.log(startDate, endDate);
    }, [dispatch, startDate, endDate, status]);

    // Фильтрация по создателю
    useEffect(() => {
        if (creatorFilter) {
            setFilteredReconstructions(
                data.reconstructions.filter((item) =>
                    item.creator?.toLowerCase().includes(creatorFilter.toLowerCase())
                )
            );
        } else {
            setFilteredReconstructions(data.reconstructions);
        }
    }, [creatorFilter, data.reconstructions]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(fetchReconstructions({
                startDate: startDate?.toISOString().split('T')[0] || '',
                endDate: endDate?.toISOString().split('T')[0] || '',
                status,
            })); 
        }, 5000); // Интервал 5 секунд
    
        return () => clearInterval(intervalId);
    }, [dispatch, status, startDate, endDate]); 

    const handleRowClick = (id: number | undefined) => {
        if (id) {
            navigate(`${ROUTES.RECONSTRUCTIONS}/${id}`);
        } else {
            console.log("Ошибка перехода на страницу заявки по id")
        }
    }

    const handleStatusButtonClick = async (reconstructionId: number, newStatus: "completed" | "rejected") => {
        const result = await dispatch(changeStatus({ applicationId: reconstructionId.toString(), status: newStatus }));
        if (changeStatus.rejected.match(result)) {
            console.error('Не удалось изменить статус заявки');
        } else {
            dispatch(fetchReconstructions({
                startDate: startDate?.toISOString().split('T')[0] || '',
                endDate: endDate?.toISOString().split('T')[0] || '',
                status,
            }));
        }
    };
    
    return(
        <div>
            <Header />
            <div className="ссcontainer">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.RECONSTRUCTIONS }]} />
            </div>

            <div >
                <div className="titlee">Заявки на реконструкцию</div>
                {is_staff && (
                    <div>
                        <Container fluid className="table-container">
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        // className='findcreator'
                                        placeholder="Фильтровать по создателю"
                                        value={creatorFilter}
                                        onChange={(e) => setCreatorFilter(e.target.value)} // Обработчик изменения фильтра
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        // className="findstatus"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)} // Обработчик изменения фильтра
                                    >
                                        <option value="">Все статусы</option>
                                        <option value="created">Сформирована</option>
                                        <option value="completed">Завершена</option>
                                        <option value="rejected">Отклонена</option>
                                    </Form.Control>
                                </Col>
                                <Col className='startdate'>
                                    <p className='start-end'>C:</p>
                                    <div className="date-picker-container">
                                        <DatePicker
                                            className="form-control"
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            selectsStart
                                            startDate={startDate}
                                            placeholderText="Начальная дата"
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </div>
                                </Col>
                                <Col className='startdate'>
                                    <p className='start-end'>По:</p>
                                    <div className="date-picker-container">
                                        <DatePicker
                                            className="form-control"
                                            selected={endDate}
                                            onChange={handleEndDateChange}
                                            selectsEnd
                                            endDate={endDate}
                                            placeholderText="Конечная дата"
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </div>
            {loading && (
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            )}
            {!loading && 
                (!filteredReconstructions.length ? (
                    <div>
                        <h1>Заявок на реконструкцию нет</h1>
                    </div>
                ) : (
                    <div className="table-container">   
                        <Container fluid>
                            <Row className='names align-items-center'>
                                <Col>Номер</Col>
                                <Col>Статус</Col>
                                <Col>Создатель</Col>
                                <Col>Дата создания</Col>
                                <Col>Дата формирования</Col>
                                <Col>Дата завершения</Col>
                                <Col>Место работ</Col>
                                <Col>Собранные средства</Col>
                                {is_staff ? (
                                    <>
                                    <Col>Завершить</Col>
                                    <Col>Отклонить</Col>
                                    </>
                                ) : null}
                            </Row>
                       
                            {filteredReconstructions.map((item, _) => (
                                <Row key={item.pk} onClick={() => handleRowClick(item.pk)} className="my-2 align-items-center cursor-pointer">
                                    <Col>{item.pk}</Col>
                                    <Col data-translation={item.status}>{item.status}</Col>
                                    <Col>{item.creator}</Col>
                                    <Col><DateDisplay dateString={item.creation_date || ''}/></Col>
                                    <Col><DateDisplay dateString={item.apply_date || ''}/></Col>
                                    <Col><DateDisplay dateString={item.end_date || ''}/></Col>
                                    <Col>{item.place || '--'}</Col>
                                    <Col>{item.fundraising || '--'}</Col>
                                    {is_staff ? (
                                        <>
                                        <Col>
                                            <Button 
                                                className='finish' 
                                                type="button" 
                                                disabled={loading}
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                    e.stopPropagation();
                                                    if (item.pk !== undefined) {
                                                        handleStatusButtonClick(item.pk, 'completed'); // Завершить заявку
                                                    }
                                                }}
                                            >
                                                {loading ? 'Завершение...' : 'Завершить'}
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button 
                                                className='finish' 
                                                type="button" 
                                                disabled={loading}
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                    e.stopPropagation();
                                                    if (item.pk !== undefined) {
                                                        handleStatusButtonClick(item.pk, 'rejected'); // Завершить заявку
                                                    }
                                                }}
                                            >
                                                {loading ? 'Отклонение...' : 'Отклонить'}
                                            </Button>
                                        </Col>
                                        </>
                                    ) : null}
                                </Row>
                            ))}
                        </Container>
                    </div>
                )
                )
            }
        </div>
    );
};

export default ReconstructionsListPage;