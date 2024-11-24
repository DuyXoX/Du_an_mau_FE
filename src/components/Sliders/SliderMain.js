'use client'

import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderMain.scss';
import Image from 'next/image';
import slider1 from '../../assets/imgs/slider/slider_main_01.webp';
import slider2 from '../../assets/imgs/slider/slider_main_01.webp';

const SliderMain = () => {
    const settings = {
        dots: false, // Hiển thị các dấu chấm chỉ số slide tại vị trí hiện tại
        autoplay: true, // Tự động chạy slide
        autoplaySpeed: 3000, // Tốc độ chuyển đổi slide khi tự động chạy (ms)
        infinite: true, // Chạy vô hạn các slide
        speed: 800, // Tốc độ chuyển đổi slide (ms)
        slidesToShow: 1, // Số slide hiển thị tại một thời điểm
        slidesToScroll: 1, // Số slide chuyển đổi tại một thời điểm
        responsive: [
            {
                breakpoint: 1400, // tạo ra 1 breakpoint cho màn hình có độ rộng 1400px
                settings: {
                    arrows: false, // Xóa bỏ nút điều hướng trái phải khi có 1 slide
                }
            },
            // {
            //     breakpoint: 992, // tạo ra 1 breakpoint cho màn hình có độ rộng 992px 
            //     settings: {
            //         // centerMode: true, //Chia nữa các slider hai bên chỉ để slider ở giữa là nguyên vẹn
            //         arrows: false, // Xóa bỏ nút điều hướng trái phải khi có 1 slide
            //         slidesToShow: 1, // Số slide hiển thị tại một thời điểm
            //         className: "w-100"
            //     }
            // },
            // {
            //     breakpoint: 576, // tạo ra 1 breakpoint cho màn hình có độ rộng 576px
            //     settings: {
            //         // centerMode: true, //Chia nữa các slider hai bên chỉ để slider ở giữa là nguyên vẹn
            //         arrows: false, // Xóa bỏ nút điều hướng trái phải khi có 1 slide
            //         slidesToShow: 1, // Số slide hiển thị tại một thời điểm
            //     }
            // }
        ]
    };
    return (
        <section style={{ paddingTop: '0px' }}>
            <Container fluid='xxl'>
                <div className='w-100 d-block mx-auto slider-teacher'>
                    <Slider {...settings}>
                        <div className=''>
                            <Image src={slider1}
                                className="w-100 h-auto"
                                alt="images-shrimp"
                            />
                        </div>
                        <div className=''>
                            <Image src={slider2}
                                className="img-fluid"
                                alt="images-shrimp"
                            />
                        </div>
                        <div className=''>
                            <Image src={slider1}
                                className="img-fluid"
                                alt="images-shrimp"
                            />
                        </div>
                        <div className=''>
                            <Image src={slider2}
                                className="img-fluid"
                                alt="images-shrimp"
                            />
                        </div>
                        <div className=''>
                            <Image src={slider1}
                                className="img-fluid"
                                alt="images-shrimp"
                            />
                        </div>
                        <div className=''>
                            <Image src={slider2}
                                className="img-fluid"
                                alt="images-shrimp"
                            />
                        </div>
                    </Slider>
                </div>

            </Container>
        </section>
    );
};

export default SliderMain;