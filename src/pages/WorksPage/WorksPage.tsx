import React, { useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
// import { work } from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import '../../components/InputField/InputField.css';
import { Spinner } from 'react-bootstrap';
// import { mockWorks } from '../../modules/mocks';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
// import { RootState } from '../../redux/store';
// import { api } from '../../api'; 
// import { Work } from '../../api/Api';
import './WorksPage.css';
import { useAppDispatch, RootState } from '../../redux/store';
import { fetchWorks, addWorkToDraft } from "../../redux/WorksSlice";


import { setSearchWork, setInputValue, setFlagSearch} from '../../redux/SearchSlice';
import { useNavigate } from 'react-router-dom';

const WorksPage: React.FC = () => {
    const dispatch = useDispatch();
    const searchWork = useSelector((state: any) => state.search.searchWork);
    const inputValue = useSelector((state: any) => state.search.inputValue);
    const flagSearch = useSelector((state: any) => state.search.flagSearch);
    const { data, loading } = useSelector((state: RootState) => state.works);
    // const [counter, setCounter] = React.useState(data.counterWorks);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
            
    useEffect(() => {
        appDispatch(fetchWorks(searchWork));
    }, [appDispatch, searchWork, flagSearch]);
 

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(event.target.value));
    };

    const handleSearchClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setSearchWork(inputValue));
        dispatch(setFlagSearch(true));
    };

    const handleReconstructionClick = () => {
        navigate(`${ROUTES.RECONSTRUCTIONS}/${data.draftReconstructionID}`);
    };

    const addWorkToReconstruction = (workId: number) => {
        if (!workId) return;
        appDispatch(addWorkToDraft(workId));
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
                            {data.counterWorks > 0 && (
                                <div className="request">
                                    <img
                                        src="http://127.0.0.1:9000/fond-media/request.png"
                                        className="application"
                                        onClick={handleReconstructionClick}
                                    />
                                    <div className="sum-request">{data.counterWorks}</div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                <div className="space">
                    <div className="container">
                        {loading && (
                            <div className="loadingBg">
                                <Spinner animation="border" />
                            </div>
                        )}
                        {flagSearch && data.works.length === 0 ? (
                            <div>К сожалению, такая работа не найдена...</div>
                        ) : (
                            data.works.map((work) => (
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
