'use client'

import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import teacher1 from '../assets/imgs/slider/teacher.svg';
import teacher2 from '../assets/imgs/slider/face.svg';

const SliderMain = () => {
    const settings = {
        dots: true, // Hiển thị các dấu chấm chỉ số slide tại vị trí hiện tại
        autoplay: true, // Tự động chạy slide
        autoplaySpeed: 3000, // Tốc độ chuyển đổi slide khi tự động chạy (ms)
        fade: true, // Hiệu ứng fade khi chuyển đổi slide
        infinite: true, // Chạy vô hạn các slide
        speed: 800, // Tốc độ chuyển đổi slide (ms)
        slidesToShow: 2, // Số slide hiển thị tại một thời điểm
        slidesToScroll: 2, // Số slide chuyển đổi tại một thời điểm
        waitForAnimate: false, // Chờ cho slide hiện tại hoàn thành chuyển đổi mới chuyển đổi slide tiếp theo
        arrows: false, // Hiển thị các mũi tên điều hướng slide
    };
    return (
        <section>
            <Container>
                <div className='text-center'>
                    <h2 className=''>
                        <span className='text-orange'></span>
                    </h2>
                </div>
                <div>
                    <Slider {...settings}>
                        <div className='slider-main'>
                            <Image className="img-slider" src={teacher1} alt="images-shrimp" />
                        </div>
                        <div className='slider-main'>
                            <Image className="img-slider" src={teacher2} alt="images-shrimp" />
                        </div>
                        <div className='slider-main'>
                            <Image className="img-slider" src={teacher1} alt="images-shrimp" />
                        </div>
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default SliderMain;