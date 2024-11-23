import { FC, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import {Work} from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import InputField from '../../components/InputField/InputField';
import './WorksPage.css'

const WorksPage = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const handleSearch = () => {
        console.log('Поиск:', searchValue);
    };
    const [works, setWorks] = useState<Work[]>([]);
    // const [title, setTitle] = useState('');
    const [count, setCount] = useState(0);

    return (
        <div>
            <Header /> 
            <div className="page_container">
                <div className="reserch">
                    <form>
                        <p className="title_reserch">Общие работы</p>
                        <InputField
                            value={searchValue}
                            setValue={setSearchValue}
                            onSubmit={handleSearch}
                            placeholder="Вид работы"
                            loading={false} // Можно заменить на состояние загрузки
                        />
                        {/* <button className="reserch-button" type="submit" onClick={() => window.location.reload()}>Поиск</button> */}
                        {count > 0 && (
                            <div className="request">
                                <img src="http://127.0.0.1:9000/fond-media/request.png" className="application" />
                                <div className="sum-request">{count}</div>
                            </div>
                        )}
                    </form>
                </div>
                <div className="space">
                    <div className="container">
                        {works.map((work) => (
                            <WorkCard key={work.id} work={work}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorksPage