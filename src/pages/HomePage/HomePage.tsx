import './HomePage.css'
import Header from '../../components/Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const HomePage = () => {

    const images = [
        "src/assets/image1.png",
        "src/assets/image2.jpg",
        "src/assets/image3.jpg"
    ];

    return (
        <div>
            <Header />
            <div className="homepage my-custom-font">
                <h1 className="display-4 mb-2">Реконструкция исторических зданий</h1>
                <p className="lead mb-4">
                    Мы бережно восстанавливаем историческое наследие, используя современные технологии и традиционные методы.  
                </p>
                <Swiper 
                    modules={[Pagination, Autoplay]} 
                    spaceBetween={50} 
                    slidesPerView={1} 
                    pagination={{ clickable: true }} 
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className='swiper'
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className='swiper-slide img'>
                            <img src={image} alt={`Slide ${index}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomePage;