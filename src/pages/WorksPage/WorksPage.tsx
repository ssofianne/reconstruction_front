import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import {Work, getWorkByName} from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import InputField from '../../components/InputField/InputField';
import './WorksPage.css'
import { Spinner } from 'react-bootstrap';
import { fetchWorks  } from '../../modules/mocks';


const WorksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [works, setWorks] = useState<Work[]>([])
    const [count, setCount] = useState(0);

    // Функция для получения всех работ
    const fetchAllWorks = async () => {
        setLoading(true);
        try {
            const fetchedWorks = await fetchWorks(); // Получение всех работ
            setWorks(fetchedWorks); // Устанавливаем работы для отображения
        } catch (error) {
            console.error('Ошибка при загрузке работ:', error);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация работ по имени
    const handleSearch = async () => {
        setLoading(true);
        try {
            if (searchValue === '') {
                // Если поле поиска пустое, показываем все работы
                const fetchedWorks = await fetchWorks(); 
                setWorks(fetchedWorks);
            } else {
                // Если есть текст в поле поиска, отправляем запрос с фильтром
                const work = await getWorkByName(searchValue);
                setWorks(work.works);
            }
        } catch (error) {
            console.error('Ошибка при фильтрации работ:', error);
        } finally {
            setLoading(false);
        }
    };

    // Загружаем работы при монтировании компонента
    useEffect(() => {
        fetchAllWorks();
    }, []);

    // const handleSearch = async () =>{
    //     setLoading(true)
    //     const work = await getWorkByName(searchValue)
    //     setWorks(work.works)
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const fetchedWorks = await fetchWorks();
    //             setWorks(fetchedWorks);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

  

    return (
        <div>
            <Header /> 
            <div className="page_container">
                <div className="reserch">
                    <form>
                        <p className="title_reserch">Общие работы</p>
                        <div >
                            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
                            <InputField
                                value={searchValue}
                                setValue={(value) => setSearchValue(value)}
                                loading={loading}
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
                        {/* {loading && <div className="loadingBg"><Spinner animation="border"/></div>} */}
                        {works.length === 0 ? (
                            <div>К сожалению, такая работа не найдена...</div>
                        ) : (
                            works.map((work) => (
                                <WorkCard key={work.id} work={work} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorksPage

