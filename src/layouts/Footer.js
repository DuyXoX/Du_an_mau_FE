'use client'

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import '../styles/Footer.scss';
import Link from 'next/link';

const Footer = () => {
    const handleNewTab = (url) => {
        window.open(url);
    };

    return (
        <footer className="mt-5 bg-green">
            <Container fluid='xxl'>
                <Row>
                    <Col>
                        <div className='pt-5'>
                            <ul className="list-unstyled">
                                <li className="">
                                    <h6 className="text-white">
                                        <FaMapMarkerAlt className='fs-4' />
                                        <span style={{ cursor: 'pointer' }} className='ps-2'
                                            onClick={() => { handleNewTab('https://maps.app.goo.gl/PQk15Ui9QmnVAff38') }}
                                        >
                                            300,6 Hà Huy Tập, Buôn Ma Thuột, Đăk Lăk
                                        </span>
                                    </h6>
                                </li>
                                <li className="">
                                    <h6 className="text-white">
                                        <MdEmail className='fs-4' />
                                        <span style={{ textDecoration: 'underline' }} className='ps-2'>
                                            banhangnongsan@gmail.com
                                        </span>
                                    </h6>
                                </li>
                                <li className="">
                                    <h6 className="text-white">
                                        <FaPhoneAlt className='fs-4' />
                                        <span className='ps-2'>
                                            080 155 66 50
                                        </span>
                                    </h6>
                                </li>
                                <li className="">
                                    <h6 className="text-white">
                                        <FaFacebookF className='fs-4' />
                                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} className='ps-2'
                                            onClick={() => { handleNewTab('https://www.facebook.com/phongtapnhacmimimusic') }}
                                        >
                                            Banhangnongsan
                                        </span>
                                    </h6>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className='pt-5'>
                            <ul className="list-unstyled">
                                <li className=""><Link className="text-light text-decoration-none" href="/">Trang chủ</Link></li>
                                <li className=""><Link className="text-light text-decoration-none" href="/gioi-thieu">Giới thiệu</Link></li>
                                <li className=""><Link className="text-light text-decoration-none" href="/san-pham">Sản phẩm</Link></li>
                                <li className=""><Link className="text-light text-decoration-none" href="/#dang-ky-tu-van">Đăng ký ngay</Link></li>
                                <li className=""><Link className="text-light text-decoration-none" href="/tin-tuc">Tin tức</Link></li>
                            </ul>
                        </div>
                    </Col>
                    <div className='py-4'>
                        <h5 className='text-center text-white fw-bold'>&copy;2024 Bán hàng nông sản | All Rights Reserved</h5>
                    </div>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;