import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
// import { work } from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import '../../components/InputField/InputField.css';
import { Spinner } from 'react-bootstrap';
import { mockWorks } from '../../modules/mocks';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
// import { RootState } from '../../redux/store';
import { api } from '../../api'; 
import { Work } from '../../api/Api';
import './WorksPage.css';


import { setSearchWork, setInputValue, setFlagSearch } from '../../redux/WorksSlice';
import { useNavigate } from 'react-router-dom';

const WorksPage: React.FC = () => {
    const dispatch = useDispatch();
    const searchWork = useSelector((state: any) => state.works.searchWork);
    const inputValue = useSelector((state: any) => state.works.inputValue);
    const flagSearch = useSelector((state: any) => state.works.flagSearch);

    const [works, setWorks] = useState<Work[]>([]);
    const [loadingWorks, setLoadingWorks] = useState(false);

    const [count, setCount] = useState(0);
    const [draftReconstructionID, setDraftReconstructionID] = useState(0);
    const navigate = useNavigate();

    const fetchAllWorks = async () => {
        setLoadingWorks(true);
        try {
            const response = await api.works.worksList({
                work_title: searchWork,
            });
        
            // Данные находятся внутри response.data
            const data = response.data;
            const allWorks = data.works as Work[]; // Извлекаем works из response.data
            console.log('Полученные данные из API:', allWorks);
        
            setWorks(allWorks); // Устанавливаем массив works

            if (data && data.draft_reconstruction_id && data.count_of_works) {
                const NumberOfWorks = data.count_of_works as number;
                const draftReconstructionIDData = data.draft_reconstruction_id as number;

                setCount(NumberOfWorks);
                setDraftReconstructionID(draftReconstructionIDData);
            }
        } catch (error) {
          console.error('Ошибка при загрузке данных из API:', error);
          setWorks(mockWorks); // Используем моки в случае ошибки
        } finally {
          setLoadingWorks(false);
        }
    };
            
    useEffect(() => {
        fetchAllWorks();
    }, [searchWork, flagSearch]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(event.target.value));
    };

    const handleSearchClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setSearchWork(inputValue));
        dispatch(setFlagSearch(true));
    };

    const handleReconstructionClick = () => {
        if (draftReconstructionID) {
            navigate(`/reconstructions/${draftReconstructionID}/`);
        }
    };

    const addWorkToReconstruction = async (workId: number) => {
        try {
            await api.reconstruction.reconstructionDraftCreate({ work_id: workId });
            console.log(`Работа с id: ${workId} успешно добавлена в заявку.`);
            setCount(count+1)
            fetchAllWorks()
        } catch (error) {
            alert("Ошибка при добавлении работы в заявку")
            console.error('Ошибка при добавлении работы в заявку:', error);
        }
    };
    return (
        <div>
            <Header />
            <BreadCrumbs
                crumbs={[{ label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS }]}
            />
            <div className="page_container">
                <div>
                    <form className="reserch" onSubmit={handleSearchClick}>
                        <p className="title_reserch">Общие работы</p>
                        <div className="inputField">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Вид работы"
                            />
                            <button type="submit">Поиск</button>
                            {count > 0 && (
                                <div className="request">
                                    <img
                                        src="http://127.0.0.1:9000/fond-media/request.png"
                                        className="application"
                                        onClick={handleReconstructionClick}
                                    />
                                    <div className="sum-request">{count}</div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                <div className="space">
                    <div className="container">
                        {loadingWorks && (
                            <div className="loadingBg">
                                <Spinner animation="border" />
                            </div>
                        )}
                        {flagSearch && works.length === 0 ? (
                            <div>К сожалению, такая работа не найдена...</div>
                        ) : (
                            works.map((work) => (
                                <WorkCard key={work.pk} work={work} onAddWork={addWorkToReconstruction} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorksPage;
