import { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
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

// Подключаем Redux
const mapStateToProps = (state: any) => ({
    searchWork: state.works.searchWork,
    inputValue: state.works.inputValue,
    flagSearch: state.works.flagSearch,
});
  
  const mapDispatchToProps = {
    setSearchWork,
    setInputValue,
    setFlagSearch,
};

// Типы пропсов, которые получаем от Redux
interface WorksPageProps {
    searchWork: string;
    inputValue: string;
    flagSearch: boolean;
    setSearchWork: (searchWork: string) => void;
    setInputValue: (inputValue: string) => void;
    setFlagSearch: (flagSearch: boolean) => void;
}

interface WorksPageState {
    loadingWorks: boolean;
    works: Work[];
    count: number;
}

class WorksPage extends Component<WorksPageProps, WorksPageState> {
    constructor(props: WorksPageProps) {
        super(props);
        this.state = {
          works: [],
          count: 0,
          loadingWorks: false,
        };
    }

    componentDidMount() {
        this.fetchAllWorks();
    }


    componentDidUpdate(prevProps: WorksPageProps) {
        console.log(prevProps);
        // Проверяем, изменился ли searchWork
        if (prevProps.searchWork !== this.props.searchWork || prevProps.flagSearch !== this.props.flagSearch) {
            this.fetchAllWorks();
        }
    }

    fetchAllWorks = async () => {
        this.setState({ loadingWorks: true });
        try {
            let allWorks = await fetchWorks(); // Загружаем все работы
            if (this.props.searchWork) {
                const lowerCaseWork = this.props.searchWork.toLowerCase();
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
        // Обновляем значение ввода в Redux
        this.props.setInputValue(event.target.value);
    };

    handleSearchClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Обновляем searchWork и флаг поиска в Redux
        this.props.setSearchWork(this.props.inputValue);
        this.props.setFlagSearch(true);
    };

    render() {
        const { works, loadingWorks, count } = this.state;
        const { inputValue, flagSearch} = this.props;

        return (
            <div>
                <Header />
                <BreadCrumbs
                    crumbs={[{ label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS }]}
                />
                <div className="page_container">
                    <div >
                        <form className="reserch" onSubmit={this.handleSearchClick}>
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

export default connect(mapStateToProps, mapDispatchToProps)(WorksPage);
