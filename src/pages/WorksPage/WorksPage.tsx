import { FC, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import {Work} from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import './WorksPage.css'

const WorksPage = () => {
    const [works, setWorks] = useState<Work[]>([]);
    const [title, setTitle] = useState('');
    const [count, setCount] = useState(0);

    return (
        <div>
            <Header /> 
            <div className="page_container">
                <div className="reserch">
                    <form>
                        <p className="title_reserch">Общие работы</p>
                        <input
                        className="work_types"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Вид работы"
                        />
                        <button className="reserch-button" type="submit" onClick={() => window.location.reload()}>Поиск</button>
                        {count >= 0 && (
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