import './ReconstructionsListPage.css';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { api } from '../../api';
import { Reconstruction } from '../../api/Api';
import { DateDisplay } from '../../modules/DateDisplay';
import { Container, Row, Spinner, Col, Button, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

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
    const [reconstructions, setReconstructions] = useState<Reconstruction[]>([]);
    const [loading, setLoading] = useState(false);

    const [Date, ] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Обработчик выбора начальной даты
    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    // Обработчик выбора конечной даты
    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    const fetchAllReconstructions = async () => {
        setLoading(true);
        try {
            const queryParams: any = {
                status: status,
            };

                // Если начальная дата выбрана, передаем её
            if (startDate) {
                queryParams.apply_date_start = startDate.toISOString().split('T')[0];
            }

            // Если конечная дата выбрана, передаем её
            if (endDate) {
                queryParams.apply_date_end = endDate.toISOString().split('T')[0];
            }

            const response = await api.reconstructions.reconstructionsList(queryParams);
            const data = response.data;
            const allReconstructions = data.reconstructions as Reconstruction[]; 
            setReconstructions(allReconstructions);
            setFilteredReconstructions(allReconstructions);
            translatePage();
        } catch (error) {
            setReconstructions([]);
            setFilteredReconstructions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReconstructions();
    }, [status, startDate, endDate]);

    // Фильтрация по создателю
    useEffect(() => {
        if (creatorFilter) {
            setFilteredReconstructions(
                reconstructions.filter((item) =>
                    item.creator.toLowerCase().includes(creatorFilter.toLowerCase())
                )
            );
        } else {
            setFilteredReconstructions(reconstructions); // Если фильтр пустой, показываем все данные
        }
        translatePage();
    }, [creatorFilter, reconstructions]);

    const handleRowClick = (id: number | undefined) => {
        if (id) {
            navigate(`${ROUTES.RECONSTRUCTIONS}/${id}`);
        } else {
            console.log("Ошибка перехода на страницу заявки по id")
        }
    }

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
                                            endDate={endDate}
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
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Конечная дата"
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </div>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </div>
            {loading && (
                console.log('Реконструкции для отображения:', reconstructions),
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
                                            <Button className='finish' type="button" disabled={loading}>
                                                {loading ? 'Завершение...' : 'Завершить'}
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button className='finish' type="button" disabled={loading}>
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