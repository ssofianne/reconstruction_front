import './ReconstructionPage.css';
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../components/Routes';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../components/Header/Header';
import { useSelector } from "react-redux";
import ReconstructionCard from "../../components/ReconstructionCard/ReconstructionCard";
import {fetchReconstruction, removeWork, changePlace, deleteReconstruction, submitReconstruction, changeSpace} from '../../redux/ReconstructionSlice';
import {RootState, useAppDispatch } from '../../redux/store';

const ReconstructionPage: FC = () => {
    const { data, loading} = useSelector((state: RootState) => state.reconstruction);
    const [place, setPlace] = useState("");
    const [fundraising, ] = useState<number>(0);
    
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pk } = useParams();

    useEffect(() => {
        if (!pk) return;
        appDispatch(fetchReconstruction(pk));
        setPlace(data.reconstruction?.place || '');
    }, [appDispatch, pk]);

  
    const handleCardClick = (workPk: number) => {
        navigate(`/work/${workPk}/`);
    };

    const handleDeleteClick = (workId: number | undefined) => {
        if (!pk || !workId) return;
        appDispatch(removeWork({ reconstructionId: pk, workId: String(workId) }));
 
    };

    const handleChangePlaceClick = async () => {
        if (pk && data.reconstruction) {
            const updatedPlace = place.trim();
            if (updatedPlace) {
                appDispatch(changePlace({ reconstructionId: pk, updatedReconstruction: { ...data.reconstruction, place: updatedPlace } }));
            } else {
                alert('Введите место работ');
            }
        }
    }; 
    
    const handleChangeSpaceClick = async (pk: number, work_space?: number) => {
        if (data.reconstruction && data.reconstruction.pk && pk && data.reconstruction.status === 'draft') {
            console.log(work_space);
            if (work_space) {
                appDispatch(changeSpace({reconstructionId:String(data.reconstruction.pk),workId:String(pk),NewSpace: { space: work_space },}))
                appDispatch(fetchReconstruction(String(data.reconstruction.pk)));
            } else {
                alert('Введите необходимый объем работ');
            }
        }
    };

    const handleDeleteButtonClick = () => {
        if (!pk) return;

        appDispatch(deleteReconstruction(pk));
        navigate(ROUTES.WORKS);
    };

    const handleSubmitButtonClick = () => {
        if (!pk) return;

        appDispatch(submitReconstruction(pk));
        navigate(ROUTES.WORKS);
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
                        {data.works?.length ? (
                            <Row className="cardd">
                                {data.works.map((item, index) => (
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
                                            isDraft={data.reconstruction?.status === 'draft'} 
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div>Вы еще не добавили ни одной работы</div>
                        )}
                        {data.reconstruction?.status === 'draft' && (
                            <div className='buttons-rec'>
                                <Button className='create-btn' onClick={handleChangePlaceClick}>Изменить место работ</Button>
                                <Button className='create-btn' onClick={handleSubmitButtonClick}>Сформировать заявку</Button>
                                <Button className='delete-btnn' onClick={handleDeleteButtonClick}>Удалить заявку</Button>
                            </div>
                        )}
                    </div>
                </>
            </div>
        </div>
    );
};
  
export default ReconstructionPage;