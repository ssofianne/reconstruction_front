import './ReconstructionPage.css';
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
// import InputField from "../components/InputField";
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../components/Routes';
import { useNavigate, useParams } from "react-router-dom";
// import { ApplicationRow } from "../components/ApplicationRow";
import Header from '../../components/Header/Header';
import { useSelector } from "react-redux";
import { api } from '../../api';
import { Reconstruction, Work, ReconstructionWork } from '../../api/Api';
import ReconstructionCard from "../../components/ReconstructionCard/ReconstructionCard";
import { RootState } from '../../redux/store';

const ReconstructionPage: FC = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [reconstruction, setReconstruction] = useState<Reconstruction>();
    const [works, setWorks] = useState<ReconstructionWork[]>();
    const [place, setPlace] = useState("");
    const [fundraising, setFundraising] = useState<number>(0);
  
    const navigate = useNavigate();
    const { pk } = useParams();
    const { username } = useSelector((state: RootState) => state.auth);

    const fetchReconstruction = async () => {
        if (!pk) {
            setIsError(true);
            return;
        }
        setLoading(true);
        try {
            const response = await api.reconstructions.reconstructionsRead(pk);
            const data = response.data;
            if (data.reconstruction?.creator != username) {
                setIsError(true);
            }
            if (data.reconstruction && data.works) {
                const reconstructionData = data.reconstruction as Reconstruction;
                const worksData = data.works as ReconstructionWork[];
    
                setReconstruction(reconstructionData);
                setWorks(worksData);
                if (worksData.length === 0 && reconstruction?.status === 'draft') {
                    navigate(ROUTES.RECONSTRUCTIONS);
                }
                setPlace(reconstructionData.place ?? '');
                setFundraising(reconstructionData.fundraising ?? 0); 
            } else {
                setIsError(true);
            }
            
        } catch (error) {
            setIsError(true);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchReconstruction();
    }, [pk]);
  
    const handleCardClick = (workPk: number) => {
        navigate(`/work/${workPk}/`);
    };

    const handleDeleteClick = async (pk: number | undefined) => {
        if (reconstruction && reconstruction.pk && pk && reconstruction.status == 'draft') {
            const reconstructionNumberString = String(reconstruction.pk);
            const pkString = String(pk);

            setLoading(true);
            api.reconstructions.reconstructionsSpaceDelete(reconstructionNumberString, pkString)
                .then((response) => {
                    const data = response.data;
                    
                    // if (data.reconstruction?.creator != username) {
                    //     setIsError(true);
                    // }
                    
                    setLoading(false);
                })
                .catch(() => {
                    setIsError(true);
                    setLoading(false);
                });
            alert('Работа успешно удалена из заявки на реконструкцию') 
            await fetchReconstruction();   
        } else {
            alert('Изменение реконструкции невозможно');
        }
    };

    const handleChangePlaceClick = async () => {
        if (reconstruction && reconstruction.pk && pk && reconstruction.status == 'draft') {
            const newPlace = place.trim();
            if (newPlace) {
                setLoading(true);
                try {
                    const response = await api.reconstructions.reconstructionsUpdate(pk, { ...reconstruction, place: newPlace });
                    const updatedReconstruction = response.data;
                    setReconstruction(updatedReconstruction);
                    alert('Место работ успешно изменено');
                } catch (error) {
                    alert('Произошла ошибка при изменении места работ');
                } finally {
                    setLoading(false);
                }
            } else {
                alert('Введите место работ');
            }
        } else {
            alert('Изменение реконструкции невозможно');
        }
    }; 

    // const handleChangeSpaceClick = async (pk: number, work_space?: number) => {
    //     if (reconstruction && reconstruction.pk && pk && reconstruction.status === 'draft') {
    //         const reconstructionNumberString = String(reconstruction.pk);
    //         const pkString = String(pk);
    //         console.log(work_space);
    //         if (work_space){
    //             setLoading(true);
    //             api.reconstructions.reconstructionsSpaceUpdate(reconstructionNumberString, pkString, { space: work_space })
    //                 .then((response) => {
    //                     const data = response.data;
    //                     if (data.reconstruction?.creator != username) {
    //                         setIsError(true);
    //                     }
    //                     setLoading(false);
    //                 })
    //                 .catch(() => {
    //                     setIsError(true);
    //                     setLoading(false);
    //                 });
    //             alert('Объем работы успешно изменен')
    //             await fetchReconstruction();   
    //         } else {
    //             alert('Введите необходимый объем работ')
    //         }
    //     } else {
    //         alert('Изменение реконструкции невозможно');
    //     }
    // };
    const handleChangeSpaceClick = async (pk: number, work_space?: number) => {
        if (reconstruction && reconstruction.pk && pk && reconstruction.status === 'draft') {
            const reconstructionNumberString = String(reconstruction.pk);
            const pkString = String(pk);
            console.log(work_space);
    
            if (work_space) {
                setLoading(true);
                try {
                    const response = await api.reconstructions.reconstructionsSpaceUpdate(reconstructionNumberString, pkString, { space: work_space });
                    console.log('Объем работы изменен:', response.data);
                    
                    await fetchReconstruction();
    
                    alert('Объем работы успешно изменен');
                } catch (error) {
                    console.error('Ошибка при изменении объема работы:', error);
                    alert('Ошибка при изменении объема работы');
                    setIsError(true);
                } finally {
                    setLoading(false);
                }
            } else {
                alert('Введите необходимый объем работ');
            }
        } else {
            alert('Изменение реконструкции невозможно');
        }
    };

    const handleDeleteButtonClick = () => {
        if (reconstruction && reconstruction.pk && pk && reconstruction.status == 'draft') {
            const reconstructionNumberString = String(reconstruction.pk);

            api.reconstructions.reconstructionsDelete(reconstructionNumberString);

            navigate(ROUTES.RECONSTRUCTIONS);
        } else {
            alert('Удаление реконструкции невозможно');
        }
    };

    const handleSubmitButtonClick = () => {
        if (reconstruction && reconstruction.pk && pk && reconstruction.status == 'draft') {
            const reconstructionNumberString = String(reconstruction.pk);

            api.reconstructions.reconstructionsCreateUpdate(reconstructionNumberString);

            navigate(ROUTES.RECONSTRUCTIONS);
        } else {
            alert('Вы уже сформировали эту заявку');
        }
    };
       
    return (
        <div>
            <Header/>
            <div className="ccontainer">
                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border" />
                    </div>
                )}
                {!loading && !isError ? (
                    <>
                        <BreadCrumbs
                            crumbs={[
                                {label: ROUTE_LABELS.RECONSTRUCTIONS, path: ROUTES.RECONSTRUCTIONS },
                                { label: `Реконструкция` },
                            ]}
                        />
            
                        <div className="container-up">
                            <div className="title-works">Реконструкционные работы</div>
                            <div>
                                <input type="text" className="pplace" placeholder="Введите место" defaultValue={place} onChange={(e) => setPlace(e.target.value)}/>
                            </div>
                            <div className="title-fundraising">Результат сбора средств: 
                                <p className="result-fundraising">{fundraising} ₽</p>
                            </div>
                        </div>
                        <div className='cards-buttons'>           
                            {works?.length ? (
                                <Row className="cardd">
                                    {works.map((item, index) => (
                                        <Col key={index} xs={12}>
                                            <ReconstructionCard
                                                key={item.pk}
                                                imageurl={item.imageurl || ''}
                                                title={item.title}
                                                price={item.price}
                                                space={item.space}
                                                imageClickHandler={() => handleCardClick(item.pk)}
                                                HandleEdit={(got_work_space) => handleChangeSpaceClick(item.pk, got_work_space)}
                                                HandleDelete={() => handleDeleteClick(item.pk)}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <div>Вы еще не добавили ни одной работы</div>
                            )}
                            <div className='buttons-rec'>
                                <Button className='create-btn' onClick={handleChangePlaceClick}>Изменить место работ</Button>
                                <Button className='create-btn' onClick={handleSubmitButtonClick}>Сформировать заявку</Button>
                                <Button className='delete-btnn' onClick={handleDeleteButtonClick}>Удалить заявку</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Нет доступа к данной заявке</div>
                )}
            </div>
        </div>
    );
};
  
export default ReconstructionPage;