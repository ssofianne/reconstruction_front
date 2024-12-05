import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { Work } from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import '../../components/InputField/InputField.css';
import { Spinner } from 'react-bootstrap';
import { fetchWorks } from '../../modules/mocks';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import './WorksPage.css';

// Импортируем экшены
import { setSearchWork, setInputValue, setFlagSearch } from '../../redux/WorksSlice';

const WorksPage: React.FC = () => {
    const dispatch = useDispatch();
    const searchWork = useSelector((state: any) => state.works.searchWork);
    const inputValue = useSelector((state: any) => state.works.inputValue);
    const flagSearch = useSelector((state: any) => state.works.flagSearch);

    const [works, setWorks] = useState<Work[]>([]);
    const [loadingWorks, setLoadingWorks] = useState(false);
    const [count, setCount] = useState(0);

    const fetchAllWorks = async () => {
        setLoadingWorks(true);
        try {
            let allWorks = await fetchWorks();
            if (searchWork) {
                const lowerCaseWork = searchWork.toLowerCase();
                allWorks = allWorks.filter(work =>
                    work.title.toLowerCase().includes(lowerCaseWork)
                );
            }
            console.log('Полученные данные:', allWorks);
            setWorks(allWorks);
        } catch (error) {
            console.error('Ошибка при загрузке работ:', error);
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
                                <WorkCard key={work.pk} work={work} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorksPage;
