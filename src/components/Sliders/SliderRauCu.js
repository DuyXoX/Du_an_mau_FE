'use client'

import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderMain.scss';
import Image from 'next/image';
import { FaRegUser, FaRegClock } from "react-icons/fa";
import product_trung_cut from '../../assets/imgs/product/product_trung_cut.webp';
import product_thit_bo from '../../assets/imgs/product/product_thit_bo.webp';
import product_cot_let from '../../assets/imgs/product/product_cot_let.webp';
import product_cam from '../../assets/imgs/product/product_cam.webp';
import product_ngo_gai from '../../assets/imgs/product/product_ngo_gai.webp';
import product_ngo_ri from '../../assets/imgs/product/product_ngo_ri.webp';
import product_ngo_om from '../../assets/imgs/product/product_ngo_om.webp';
import ScrollAnimation from '../animation/ScrollAnimation';


const SliderRauCu = () => {
    const settings = {
        dots: false, // Hiển thị các dấu chấm chỉ số slide tại vị trí hiện tại
        autoplay: false, // Tự động chạy slide
        autoplaySpeed: 3000, // Tốc độ chuyển đổi slide khi tự động chạy (ms)
        infinite: true, // Chạy vô hạn các slide
        speed: 800, // Tốc độ chuyển đổi slide (ms)
        focusOnSelect: true, //Vô hiện hóa bôi đen viền và tự động chuyển đổi slider khi chạm
        slidesToShow: 3, // Số slide hiển thị tại một thời điểm
        slidesToScroll: 1, // Số slide chuyển đổi tại một thời điểm
        responsive: [
            {
                breakpoint: 1400, // tạo ra 1 breakpoint cho màn hình có độ rộng 1400px
                settings: {
                    // arrows: false, // Xóa bỏ nút điều hướng trái phải khi có 1 slide
                }
            },
            {
                breakpoint: 992, // tạo ra 1 breakpoint cho màn hình có độ rộng 992px 
                settings: {
                    // centerMode: true, //Chia nữa các slider hai bên chỉ để slider ở giữa là nguyên vẹn
                    arrows: false, // Xóa bỏ nút điều hướng trái phải khi có 1 slide
                    slidesToShow: 2, // Số slide hiển thị tại một thời điểm
                    className: "w-100"
                }
            },
            {
                breakpoint: 576, // tạo ra 1 breakpoint cho màn hình có độ rộng 576px
                settings: {
                    // centerMode: true, //Chia nữa các slider hai bên chỉ để slider ở giữa là nguyên vẹn
                    arrows: false, // Xóa bỏ nút điều hướng trái phải khi có 1 slide
                    slidesToShow: 1, // Số slide hiển thị tại một thời điểm
                }
            }
        ]
    };

    return (
        <div className='py-5 w-100 d-block mx-auto slider-teacher'>
            <Slider {...settings}>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_trung_cut}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Trứng Cút
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_thit_bo}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Thịt Bò
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_cot_let}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Cốt Lết
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_cam}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Cam
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_ngo_gai}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Ngo Gai
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_ngo_ri}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Ngo Ri
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animationClass='animation-bottom px-2'>
                    <Image src={product_ngo_om}
                        className="w-100 h-auto"
                        alt="images-shrimp"
                    />
                    <div className=''>
                        <h6 className='mt-3'>
                            Ngo Om
                        </h6>
                        <div style={{ fontSize: '13px' }}
                            className='fw-light'>
                            <FaRegUser className='me-3' />
                            <FaRegClock className='me-1' />
                            <span className=''>
                                07/08/2024
                            </span>
                        </div>
                    </div>
                </ScrollAnimation>
            </Slider>
        </div>
    );
};

export default SliderRauCu;