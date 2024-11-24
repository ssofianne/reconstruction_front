import { Work } from '../modules/Work'; 

const mockWorks: Work[] = [
  {id: 1, imageurl: 'src/assets/default_image.png', title: 'Работа 1', price: 4000, description: 'Описание отсутствует'},
  {id: 2, imageurl: 'src/assets/default_image.png', title: 'Работа 2', price: 4000, description: 'Описание отсутствует'},
  {id: 3, imageurl: 'src/assets/default_image.png', title: 'Работа 3', price: 4000, description: 'Описание отсутствует'},
];

export const fetchWorks = async (): Promise<Work[]> => {
    try {
        const response = await fetch('/works/'); // Запрос через прокси

        if (!response.ok) {
            console.error('Ошибка при получении данных:', response.status);
            //Возвращаем mock-данные при ошибке
            return mockWorks;
        }

        const data: { results: Work[] } = await response.json();
        return data.results;
    } catch (error) {
        console.error('Ошибка:', error);
        return mockWorks; // Возвращаем mock-данные при ошибке
    }
};