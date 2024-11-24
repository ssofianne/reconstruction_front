import { Work } from '../modules/Work'; 

const mockWorks: Work[] = [
  {id: 1, imageurl: 'src/assets/default_image.png', title: 'Работа 1', price: 4000, description: 'Описание отсутствует'},
  {id: 2, imageurl: 'src/assets/default_image.png', title: 'Работа 2', price: 4000, description: 'Описание отсутствует'},
  {id: 3, imageurl: 'src/assets/default_image.png', title: 'Работа 3', price: 4000, description: 'Описание отсутствует'},
];

export const fetchWorks = async (): Promise<Work[]> => {
    try {
        // const response = await fetch('/works/'); // Запрос через прокси
        const response = await fetch('http://localhost:8000/works/');
        console.log('Статус ответа:', response.status);

        if (!response.ok) {
            console.error('Ошибка при получении данных:', response.status);
            //Возвращаем mock-данные при ошибке
            return mockWorks;
        }

        // Проверяем, что content-type соответствует JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Сервер вернул не JSON');
            const text = await response.text(); // Читаем текст ответа
            console.log('Ответ сервера:', text);
            
            return mockWorks; // Возвращаем mock-данные
        }
        const data: { works: Work[] } = await response.json();
        return data.works;
    } catch (error) {
        console.error("Ошибка:", error)
        return mockWorks; // Возвращаем mock-данные при ошибке
    }
};