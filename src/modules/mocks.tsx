import { work } from '../modules/Work'; 

export const mockWorks: work[] = [
  {pk: 1, imageurl: '/reconstruction_front/mocks/1.jpg', title: 'Разборка и замена конструкций здания', price: 4000, description: 'Описание отсутствует'},
  {pk: 2, imageurl: '/reconstruction_front/mocks/2.jpg', title: 'Перепланировка помещений', price: 14500, description: 'Описание отсутствует'},
  {pk: 3, imageurl: '/reconstruction_front/mocks/3.jpg', title: 'Усиление конструкций здания', price: 6500, description: 'Описание отсутствует'},
];

// export const fetchWorks = async (): Promise<work[]> => {
//     try {
//         const response = await fetch('/api/works/');
//         console.log('Статус ответа:', response.status);

//         if (!response.ok) {
//             console.error('Ошибка при получении данных:', response.status);
//             return mockWorks;
//         }
//         const data: { works: work[] } = await response.json();
//         return data.works;
//     } catch (error) {
//         console.log('Ошибка:', error);
//         return mockWorks;
//     }
// };

export const fetchWork = async (workId: number): Promise<work | undefined> => {
    try {
        const response = await fetch(`/api/works/${workId}/`);
        console.log('Статус ответа:', response.status);
        if (!response.ok) {
            console.error('Ошибка при получении данных:', response.status);
            const work = mockWorks.find(work => work.pk === workId);
            return work;
        }
        const data: work = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        const work = mockWorks.find(work => work.pk === workId);
        return work; 
    }
};
