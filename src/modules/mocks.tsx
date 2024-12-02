import { Work } from '../modules/Work'; 

const mockWorks: Work[] = [
  {pk: 1, imageurl: '/reconstruction_front/mocks/1.jpg', title: 'Разборка и замена конструкций здания', price: 4000, description: 'Описание отсутствует'},
  {pk: 2, imageurl: '/reconstruction_front/mocks/2.jpg', title: 'Перепланировка помещений', price: 14500, description: 'Описание отсутствует'},
  {pk: 3, imageurl: '/reconstruction_front/mocks/3.jpg', title: 'Усиление конструкций здания', price: 6500, description: 'Описание отсутствует'},
];

export const fetchWorks = async (): Promise<Work[]> => {
    try {
        const response = await fetch('http://127.0.0.1:8000/works/');
        console.log('Статус ответа:', response.status);

        if (!response.ok) {
            console.error('Ошибка при получении данных:', response.status);
            return mockWorks;
        }
        const data: { works: Work[] } = await response.json();
        return data.works;
    } catch (error) {
        console.log('Ошибка:', error);
        return mockWorks;
    }
};

export const fetchWork = async (workId: number): Promise<Work | undefined> => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/works/${workId}/`);
        console.log('Статус ответа:', response.status);
        if (!response.ok) {
            console.error('Ошибка при получении данных:', response.status);
            const work = mockWorks.find(work => work.pk === workId);
            return work;
        }
        const data: Work = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        const work = mockWorks.find(work => work.pk === workId);
        return work; 
    }
};
