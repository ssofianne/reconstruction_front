import { Component, ChangeEvent, FormEvent } from 'react';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { Work } from '../../modules/Work';
import WorkCard from '../../components/WorkCard/WorkCard';
import '../../components/InputField/InputField.css';
import { Spinner } from 'react-bootstrap';
import { fetchWorks } from '../../modules/mocks';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import './WorksPage.css';

interface WorksPageState {
    searchWork: string;
    inputValue: string;
    loadingWorks: boolean;
    works: Work[];
    count: number;
    flagSearch: boolean;
}

class WorksPage extends Component<{}, WorksPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchWork: '',
            inputValue: '',
            loadingWorks: false,
            works: [],
            count: 0,
            flagSearch: false,
        };
    }

    componentDidMount() {
        this.fetchAllWorks();
    }

    componentDidUpdate(prevProps: {}, prevState: WorksPageState) {
        // Проверяем, изменился ли searchWork
        if (prevState.searchWork !== this.state.searchWork || prevState.flagSearch !== this.state.flagSearch) {
            this.fetchAllWorks();
        }
    }

    fetchAllWorks = async () => {
        this.setState({ loadingWorks: true });
        try {
            let allWorks = await fetchWorks(); // Загружаем все работы
            if (this.state.searchWork) {
                const lowerCaseWork = this.state.searchWork.toLowerCase();
                allWorks = allWorks.filter(work =>
                    work.title.toLowerCase().includes(lowerCaseWork)
                );
            }
            console.log('Полученные данные:', allWorks);
            this.setState({ works: allWorks});
        } catch (error) {
            console.error('Ошибка при загрузке работ:', error);
        } finally {
            this.setState({ loadingWorks: false });
        }
    };

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: event.target.value });
    };

    handleSearchClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({
            searchWork: this.state.inputValue,
            flagSearch: true,
        });
    };

    render() {
        const { inputValue, works, loadingWorks, flagSearch, count } = this.state;

        return (
            <div>
                <Header />
                <BreadCrumbs
                    crumbs={[{ label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS }]}
                />
                <div className="page_container">
                    <div className="reserch">
                        <form onSubmit={this.handleSearchClick}>
                            <p className="title_reserch">Общие работы</p>
                            <div className="inputField">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={this.handleInputChange}
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
    }
}

export default WorksPage;
