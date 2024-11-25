import { Work } from '../modules/Work'; 

const mockWorks: Work[] = [
  {pk: 1, imageurl: 'src/assets/mock_images/1.jpg', title: 'Работа 1', price: 4000, description: 'Описание отсутствует'},
  {pk: 2, imageurl: 'src/assets/mock_images/2.jpg', title: 'Работа', price: 4000, description: 'Описание отсутствует'},
  {pk: 3, imageurl: 'src/assets/mock_images/3.jpg', title: 'Работа', price: 4000, description: 'Описание отсутствует'},
];

export const fetchWorks = async (): Promise<Work[]> => {
    try {
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

export const fetchWork = async (workId: number): Promise<Work | undefined> => {
    try {
        const response = await fetch(`http://localhost:8000/works/${workId}/`);
        console.log('Статус ответа:', response.status);
        if (!response.ok) {
            console.error('Ошибка при получении данных:', response.status);
            // Ищем работу в mockWorks
            const work = mockWorks.find(work => work.pk === workId);
            return work; // Возвращаем найденную работу или undefined
        }
        //Проверяем, что content-type соответствует JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Сервер вернул не JSON');
            const text = await response.text(); // Читаем текст ответа
            console.error('Ответ сервера:', text);
            // Ищем работу в mockWorks
            const work = mockWorks.find(work => work.pk === workId);
            return work; // Возвращаем найденную работу или undefined
        }
        const data: Work = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        // Ищем работу в mockWorks
        const work = mockWorks.find(work => work.pk === workId);
        return work; // Возвращаем найденную работу или undefined
    }
};
