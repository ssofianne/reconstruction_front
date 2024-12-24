import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import { Work } from "../../api/Api";
import Header from "../../components/Header/Header";
import './WorkChangePage.css';
import { BreadCrumbs } from "../../components/Breadcrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../components/Routes";

const EditWorkPage: React.FC = () => {
    const { pk } = useParams();
    const navigate = useNavigate();

    const [work, setWork] = useState<Work | null>(null); // Состояние для данных работы
    const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
    const [error, setError] = useState<string | null>(null); // Состояние ошибки

    // Локальные состояния для полей формы
    const [imageurl, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    // Состояние для URL изображения (генерируем для отображения)
    const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);

    // Функция загрузки данных работы (если pk существует)
    const fetchWork = async () => {
        if (!pk) return; // Если нет ID, не загружаем данные
        setLoading(true);
        try {
            const response = await api.works.worksRead(pk!);
            const data = response.data as Work;
            setWork(data);
            setTitle(data.title);
            setPrice(data.price);
            setDescription(data.description);
            setImageUrlPreview(data.imageurl || null); // Задаем URL текущего изображения
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            setError("Ошибка при загрузке данных работы.");
        } finally {
            setLoading(false);
        }
    };

    // Функция для отправки изменений
    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Формируем данные для отправки
            const updateData = {
                title,
                price: Number(price),
                description,
                imageurl,
            };

            // Если есть pk, то это обновление работы
            if (pk) {
                await api.works.worksChangeUpdate(pk!, updateData);
            } else {
                // Если pk нет, значит это новая работа, и нужно создать новую
                await api.works.worksCreate(updateData); 
            }

            // Если изображение было изменено, отправляем его
            if (imageurl && !pk) {
                const formData = new FormData();
                formData.append("pic", imageurl); // Добавляем файл изображения
                await api.works.worksImageCreate(pk!, { body: formData });
                // if (pk) {
                //     // Запрос для обновления изображения существующей работы
                //     await api.works.worksImageCreate(pk!, { body: formData });
                // } else {
                //     // Запрос для загрузки изображения для новой работы
                //     const newWorkResponse = await api.works.worksCreate({ ...updateData, image: formData });
                // }

            }

            navigate("/works-table"); // Переход на страницу с таблицей
        } catch (error) {
            console.error("Ошибка при обновлении/добавлении работы:", error);
            alert("Ошибка при обновлении или добавлении работы.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (imageurl) {
            const objectUrl = URL.createObjectURL(imageurl);
            setImageUrlPreview(objectUrl); // Обновляем превью
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImageUrlPreview(null);
        }
    }, [imageurl]);
    
    useEffect(() => {
        if (pk) {
            fetchWork();
        } else {
            // Если pk отсутствует, сбрасываем данные формы для добавления новой работы
            setWork(null);
            setTitle("");
            setPrice(0);
            setDescription("");
            setImage(null);
            setImageUrlPreview(null);
            setLoading(false); // Отключаем состояние загрузки
        }
    }, [pk]);


    if (loading) {
        return (
            <div className="loading">
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="edit-work-page">
            <Header />
            <BreadCrumbs 
                crumbs={[
                { label: ROUTE_LABELS.WORKS_TABLE, path: ROUTES.WORKS_TABLE },
                { label: work?.title || "Редактирование работы" },
                ]}
            />
            <h1>{pk ? "Редактировать работу" : "Добавить новую работу"}</h1>
            <img
                src={imageUrlPreview || work?.imageurl || "default_image.png"}
                alt="work image"
                className="imggg"
            />
            <Form>
                <div className="forrmmmss">
                    <Form.Group controlId="formTitle">
                        <Form.Label className="titttlle">Название</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label className="titttlle">Цена</Form.Label>
                        <Form.Control
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label className="titttlle">Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImageUrl">
                        <Form.Label className="titttlle">Изображение</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                if (input.files) {
                                    setImage(input.files[0]);
                                } else {
                                    setImage(null);
                                }
                            }}
                        />
                    </Form.Group>
                </div>
            </Form>

            <Button
                className="buttonch"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {pk ? "Сохранить изменения" : "Добавить работу"}
            </Button>
        </div>
    );
};

export default EditWorkPage;
