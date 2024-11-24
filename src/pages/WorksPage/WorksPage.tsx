import { FC, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import {Work, getWorkByName} from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import InputField from '../../components/InputField/InputField';
import './WorksPage.css'
import { Col, Row, Spinner } from 'react-bootstrap';
import { fetchWorks  } from '../../modules/mocks';


const WorksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [works, setWorks] = useState<Work[]>([])

    const handleSearch = async () =>{
        setLoading(true)
        const result = await getWorkByName(searchValue)
        setWorks(result.results)
        setLoading(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedWorks = await fetchWorks();
                setWorks(fetchedWorks);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [count, setCount] = useState(0);

    return (
        <div>
            <Header /> 
            <div className="page_container">
                <div className="reserch">
                    <form>
                        <p className="title_reserch">Общие работы</p>
                        <div className={`container ${loading && 'containerLoading'}`}>
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
                            {/* {works.length > 0 && (
                                <Row xs={4} md={4} className="g-4">
                                    {works.map((work) => (
                                    <WorkCard key={work.id} work={work} />
                                ))}
                                </Row>
                            )}     */}
                        </div>
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

function setError(error: unknown) {
    throw new Error('Function not implemented.');
}
