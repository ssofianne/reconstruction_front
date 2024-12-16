import './ReconstructionPage.css';
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
// import InputField from "../components/InputField";
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import { useNavigate, useParams } from "react-router-dom";
// import { ApplicationRow } from "../components/ApplicationRow";
import Header from '../../components/Header/Header';
import { useSelector } from "react-redux";
import { api } from '../../api';
import { Reconstruction, Work } from '../../api/Api';
import ReconstructionCard from "../../components/ReconstructionCard/ReconstructionCard";

const ReconstructionPage: FC = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [reconstruction, setReconstruction] = useState<Reconstruction>();
    const [works, setWorks] = useState<Work[]>();
    const [place, setPlace] = useState("");
  
    const navigate = useNavigate();
    const { pk } = useParams();
    const user = useSelector((state: any) => state.auth.user);

    const fetchReconstruction = async () => {
        if (!pk) {
            setIsError(true);
            return;
        }
        setLoading(true);
        try {
            const response = await api.reconstructions.reconstructionsRead(pk);
            const data = response.data;
            if (data.reconstruction?.creator != user.username) {
                setIsError(true);
            }
            if (data.reconstruction && data.works) {
                const reconstructionData = data.reconstruction as Reconstruction;
                const worksData = data.works as Work[];
    
                setReconstruction(reconstructionData);
                setWorks(worksData);
                if (worksData.length === 0 && reconstruction?.status === 'draft') {
                    navigate(ROUTES.RECONSTRUCTIONS);
                }
                setPlace(reconstructionData.place ?? '');
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
  
    const handleCardClick = (workId: number | undefined) => {
        if (workId) {
            navigate(`${ROUTES.WORKS}/${workId}`);
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
                                { label: `Реконструкция` },
                            ]}
                        />
            
                        <div className="top-container">
                            <div className="title"></div>
            
                            <div className="horizontal-container">
                                {/* <Button variant="primary" onClick={handleSubmitButtonClick}>Сформировать заявку</Button>
                                <Button variant="danger" onClick={handleDeleteButtonClick}>Удалить заявку</Button> */}
                            </div>
                        </div>

                        {works?.length ? (
                            <Row className="cardd">
                                {works.map((item, index) => (
                                    <Col key={index} xs={12}>
                                        <ReconstructionCard
                                            key={item.pk}
                                            imageurl={item.imageurl || ''}
                                            title={item.title}
                                            price={item.price}
                                            space={0}
                                            imageClickHandler={() => handleCardClick(item.pk)}
                                            HandleEdit={() => handleArrowClick(item.pk)}
                                            HandleDelete={() => handleMinusClick(item.pk)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div>Вы еще не добавили ни одной работы</div>
                        )}
                    </>
                ) : (
                    <div>Нет доступа к данной заявке</div>
                )}
            </div>
        </div>
    );
};
  
export default ReconstructionPage;