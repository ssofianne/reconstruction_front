import './HomePage.css'
import Header from '../../components/Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';



const HomePage = () => {

    const images = [
        "/reconstruction_front/swiper/image1.png",
        "/reconstruction_front/swiper/image2.jpg",
        "/reconstruction_front/swiper/image3.jpg",
        // "src/assets/image4.jpg"
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