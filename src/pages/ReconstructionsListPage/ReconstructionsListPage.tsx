import './ReconstructionsListPage.css';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
// import { useAppDispatch } from '../../redux/store';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { api } from '../../api';
import { Reconstruction } from '../../api/Api';
import { DateDisplay } from '../../modules/DateDisplay';
import { Container, Row, Spinner, Col } from "react-bootstrap";

const ReconstructionsListPage: FC = () => {

    const [reconstructions, setReconstructions] = useState<Reconstruction[]>([]);
    const [loading, setLoading] = useState(false);

    const [Date, setDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const navigate = useNavigate();

    const fetchAllReconstructions = async () => {
        setLoading(true);
        try {
            const response = await api.reconstructions.reconstructionsList({
                status: status,
                apply_date: Date,
            });
        
            const data = response.data;
            const allReconstructions = data.reconstructions as Reconstruction[]; // Извлекаем works из response.data
            console.log('Полученные данные из API:', allReconstructions);
        
            setReconstructions(allReconstructions); // Устанавливаем массив works

        } catch (error) {
            setReconstructions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReconstructions();
    }, [status, Date]);

    const handleRowClick = (id: number | undefined) => {
        if (id) {
            navigate(`${ROUTES.RECONSTRUCTIONS}/${id}`);
        } else {
            console.log("Ошибка перехода на страницу заявки по id")
        }
    }

    // const handleFilterChange = () => {
    //     setStartDate((document.getElementById('start-date') as HTMLInputElement).value);
    //     setEndDate((document.getElementById('end-date') as HTMLInputElement).value);
    // }

    // const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setStatus(event.target.value);
    // }

    return(
        <div>
            <Header />
            <div className="ссcontainer">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.RECONSTRUCTIONS }]} />
            </div>

            <div className="top-container">
                <div className="title">Заявки на реконструкцию</div>
            </div>

            {loading && (
                console.log('Реконструкции для отображения:', reconstructions),
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            )}
            {!loading && 
                (!reconstructions.length ? (
                    <div>
                        <h1>Заявок на реконструкцию нет</h1>
                    </div>
                ) : (
                    <div className="table-container">
                        <Container fluid>
                            <Row className='names align-items-center'>
                                <Col>Номер</Col>
                                <Col>Статус</Col>
                                <Col>Дата создания</Col>
                                <Col>Дата формирования</Col>
                                <Col>Дата завершения</Col>
                                <Col>Место работ</Col>
                                <Col>Собранные средства</Col>
                            </Row>

                            {reconstructions.map((item, _) => (
                                <Row key={item.pk} onClick={() => handleRowClick(item.pk)} className="my-2 custom-row align-items-center">
                                    <Col>{item.pk}</Col>
                                    <Col>{item.status}</Col>
                                    <Col><DateDisplay dateString={item.creation_date || ''}/></Col>
                                    <Col><DateDisplay dateString={item.apply_date || ''}/></Col>
                                    <Col><DateDisplay dateString={item.end_date || ''}/></Col>
                                    <Col>{item.place || '--'}</Col>
                                    <Col>{item.fundraising || '--'}</Col>
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