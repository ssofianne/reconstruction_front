import { useState, useEffect, ChangeEvent } from 'react';
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
    const [searchWork, setSearchWork] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loadingWorks, setLoadingWorks] = useState(false)
    const [works, setWorks] = useState<Work[]>([])
    const [count, setCount] = useState(0);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    // Функция для получения всех работ
    useEffect(() => {
        const fetchAllWorks = async () => {
            setLoadingWorks(true);
            try {
                let allWorks = await fetchWorks(); // Загружаем все работы
                if (searchWork) {
                    const lowerCaseWork = searchWork.toLowerCase();
                    allWorks = allWorks.filter(work =>
                        work.title.toLowerCase().includes(lowerCaseWork)
                    );
                }
                console.log('Полученные данные:', allWorks);
                setWorks(allWorks);  // Обновляем список работ
            } catch (error) {
                console.error('Ошибка при загрузке работ:', error);
            } finally {
                setLoadingWorks(false);  // Завершаем загрузку
            }
        };

        fetchAllWorks();
    }, [searchWork]);

    // Обработчик изменения в текстовом поле
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Обновляем временное состояние
    };

    // Обработчик нажатия кнопки поиска
    const handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем отправку формы
        setSearchWork(inputValue); // Обновляем основное состояние
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
                    <form onSubmit={handleSearchClick}>
                        <p className="title_reserch">Общие работы</p>
                        <div >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder='Вид работы'
                            />
                            <button type="submit">Поиск</button>
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
                        {works.length === 0 ? (
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

