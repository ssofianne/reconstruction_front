import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import {BreadCrumbs}     from '../../components/Breadcrumbs/BreadCrumbs';
import {Work, getWorkByName} from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import InputField from '../../components/InputField/InputField';
import { Spinner } from 'react-bootstrap';
import { fetchWorks } from '../../modules/mocks';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import './WorksPage.css'


const WorksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [loadingWorks, setLoadingWorks] = useState(false)
    const [works, setWorks] = useState<Work[]>([])
    const [count, setCount] = useState(0);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    // Функция для получения всех работ
    useEffect(() => {
        const fetchAllWorks = async () => {
            setLoadingWorks(true);
            try {
                const allWorks = await fetchWorks(); // Загружаем все работы
                console.log('Полученные данные:', allWorks);
                setWorks(allWorks);  // Обновляем список работ
            } catch (error) {
                console.error('Ошибка при загрузке работ:', error);
            } finally {
                setLoadingWorks(false);  // Завершаем загрузку
            }
        };

        fetchAllWorks();
    }, []);

    // Фильтрация работ по имени
    const handleSearch = async () => {
        setLoadingSearch(true);  // Устанавливаем состояние загрузки в true
        setIsSearchPerformed(true);
        try {
            const result = await getWorkByName(searchValue);  // Получаем работы по названию
            setWorks(result.works);  // Обновляем список работ
        } catch (error) {
            console.error('Ошибка при фильтрации работ:', error);
        } finally {
            setLoadingSearch(false);  // Завершаем загрузку
        }
    };

    return (
        <div>
            <Header /> 
            <BreadCrumbs
                crumbs={[
                { label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS },
                ]}
            />
            <div className="page_container">
                <div className="reserch">
                    <form>
                        <p className="title_reserch">Общие работы</p>
                        <div >
                            {loadingSearch && <div className="loadingBg"><Spinner animation="border"/></div>}
                            <InputField
                                value={searchValue}
                                setValue={setSearchValue}
                                loading={loadingSearch}
                                onSubmit={handleSearch}
                                placeholder='Вид работы'
                            />
                            {count > 0 && (
                                <div className="request">
                                    <img src="http://127.0.0.1:9000/fond-media/request.png" className="application" />
                                    <div className="sum-request">{count}</div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                <div className="space">
                    <div className="container">
                        {loadingWorks && <div className="loadingBg"><Spinner animation="border"/></div>}
                        {isSearchPerformed && works.length === 0 ? (
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
    )
}

export default WorksPage

