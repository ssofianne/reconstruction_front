import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, RootState } from '../../redux/store';
import { fetchWork, updateWork, updateWorkImage } from "../../redux/WorkSlice";
import Header from "../../components/Header/Header";
import './WorkChangePage.css';
import { BreadCrumbs } from "../../components/Breadcrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../components/Routes";
import { useSelector } from "react-redux";
import { Work } from "../../api/Api";
import { createWork } from "../../redux/WorksSlice";

const EditWorkPage: React.FC = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: work, loading, error } = useSelector((state: RootState) => state.work);

    const [imageurl, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);

    useEffect(() => {
        if (pk) {
            // Для редактирования работы
            dispatch(fetchWork(pk)); 
        } else {
            // Если pk отсутствует, сбрасываем локальные состояния для добавления новой работы
            setTitle("");
            setPrice(0);
            setDescription("");
            setImage(null);
            setImageUrlPreview(null);
        }
    }, [pk, dispatch]);

    // Обновляем превью изображения при изменении файла
    useEffect(() => {
        if (imageurl) {
            const objectUrl = URL.createObjectURL(imageurl);
            setImageUrlPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImageUrlPreview(null);
        }
    }, [imageurl]);

    // Загружаем данные работы из Redux, если они есть
    useEffect(() => {
        if (work && pk) {
            setTitle(work.title);
            setPrice(work.price);
            setDescription(work.description);
            setImageUrlPreview(work.imageurl || null);
        }
    }, [work, pk]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!pk) {
            // Добавление новой работы
            try {
                const newWork: Work = {
                    title,
                    price: Number(price),
                    description,
                };
                const response = await dispatch(createWork(newWork)).unwrap();
                const newWorkId = response.pk;
    
                if (imageurl) {
                    const formData = new FormData();
                    formData.append("pic", imageurl); 
                    await dispatch(updateWorkImage({ workId: newWorkId, imageFile: formData }));
                }
    
                navigate("/works-table");
            } catch (error) {
                console.error("Ошибка при добавлении работы:", error);
                alert("Ошибка при добавлении работы.");
            }
        } else {
            // Редактирование существующей работы
            try {
                const updatedWork: Work = {
                    title,
                    price: Number(price),
                    description,
                };
                await dispatch(updateWork({ workId: pk!, updatedWork }));
    
                if (imageurl) {
                    console.log("Отправляем файл:", imageurl);
                    const formData = new FormData();
                    formData.append("pic", imageurl);
                    await dispatch(updateWorkImage({ workId: pk!, imageFile: formData }));
                }
    
                navigate("/works-table");
            } catch (error) {
                console.error("Ошибка при обновлении работы:", error);
                alert("Ошибка при обновлении работы.");
            }
        }
    };
    

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
                    { label: pk ? work?.title || "Редактирование работы" : "Добавить новую работу" }
                ]}
            />
            <h1>{pk ? "Редактировать работу" : "Добавить новую работу"}</h1>
            <img
                src={imageUrlPreview || (pk ? work?.imageurl : "default_image.png")}
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
                                    setImageUrlPreview(null); // Очистить старое изображение, если выбирается новое
                                } else {
                                    setImage(null);
                                    setImageUrlPreview(null);
                                }
                            }}
                        />
                    </Form.Group>
                </div>
            </Form>

            <Button
                className="buttonch addorsave"
                onClick={handleSubmit}
            >
                {pk ? "Сохранить изменения" : "Добавить работу"}
            </Button>
        </div>
    );
};

export default EditWorkPage;
