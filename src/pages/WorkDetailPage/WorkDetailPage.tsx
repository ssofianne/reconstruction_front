import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import Header from '../../components/Header/Header';
import { ROUTES, ROUTE_LABELS } from '../../components/Routes';
import { Work } from "../../modules/Work";
import { Spinner } from "react-bootstrap";
import { fetchWork } from '../../modules/mocks';
import "./WorkDetailPage.css";

interface MatchParams {
    workId: string;
}

interface WorkDetailPageProps extends RouteComponentProps<MatchParams> {}

interface WorkDetailPageState {
    work: Work | null;
    error: string | null;
    loading: boolean;
}

class WorkDetailPage extends Component<WorkDetailPageProps, WorkDetailPageState> {
    constructor(props: WorkDetailPageProps) {
        super(props);
        this.state = {
            work: null,
            error: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchAndDisplayWork();
    }

    fetchAndDisplayWork = async () => {
        const { workId } = this.props.match.params;

        if (!workId) {
            this.setState({ error: 'ID работы не указан', loading: false });
            return;
        }

        try {
            const numericWorkId = parseInt(workId, 10);
            if (isNaN(numericWorkId)) {
                this.setState({ error: 'Неверный формат ID работы', loading: false });
                return;
            }

            const fetchedWork = await fetchWork(numericWorkId);
            if (!fetchedWork) {
                this.setState({ error: 'Работа не найдена', loading: false });
                return;
            }

            this.setState({ work: fetchedWork });
        } catch (error) {
            this.setState({ error: 'Ошибка при загрузке работы', loading: false });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { work, error, loading } = this.state;

        if (loading) {
            return (
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            );
        }

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div>
                <Header />
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.WORKS, path: ROUTES.WORKS },
                        { label: work?.title || "Работа" },
                    ]}
                />
                {work ? (
                    <div className="page-container">
                        <div className="page-title">{work.title}</div>
                        <div className="content-wrapper">
                            <div className="content-info">
                                <div className="content-img">
                                    <div className="image-wrapper">
                                        <img src={work.imageurl} alt={work.title} />
                                    </div>
                                </div>
                                <div className="garanties">
                                    <div className="garanties-wrapper">
                                        <div className="making-progect">
                                            Создание проекта с учетом ваших пожеланий и требований
                                        </div>
                                        <div className="working-time">
                                            Время выполнения зависит от объема работ
                                        </div>
                                        <div className="work-garant">
                                            Гарантия на выполненные работы и материалы 1 год
                                        </div>
                                        <div className="work-price">
                                            <p>Цена</p>
                                            <p>{work.price} ₽/м²</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="subtitle">{work.description}</div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Spinner animation="border" />
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(WorkDetailPage);
