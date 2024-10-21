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
        <footer className="mt-5 bg-custom">
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
                                            107-95 Chu Văn An, Phường 26, Bình Thạnh, Hồ Chí Minh
                                        </span>
                                    </h6>
                                </li>
                                <li className="">
                                    <h6 className="text-white">
                                        <MdEmail className='fs-4' />
                                        <span style={{ textDecoration: 'underline' }} className='ps-2'>
                                            mimimusiccenter@gmail.com
                                        </span>
                                    </h6>
                                </li>
                                <li className="">
                                    <h6 className="text-white">
                                        <FaPhoneAlt className='fs-4' />
                                        <span className='ps-2'>
                                            090 147 86 50
                                        </span>
                                    </h6>
                                </li>
                                <li className="">
                                    <h6 className="text-white">
                                        <FaFacebookF className='fs-4' />
                                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} className='ps-2'
                                            onClick={() => { handleNewTab('https://www.facebook.com/phongtapnhacmimimusic') }}
                                        >
                                            Phongtapnhacmimimusic
                                        </span>
                                    </h6>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className='pt-5'>
                            <ul className="list-unstyled">
                                <li className="menu__item"><Link className="menu__link" href="/#">Trang chủ</Link></li>
                                <li className="menu__item"><Link className="menu__link" href="/dang-ky-khoa-hoc">Đăng ký ngay</Link></li>
                                <li className="menu__item"><Link className="menu__link" href="/#tiem-hieu-ngay">Tìm hiểu ngay</Link></li>
                                <li className="menu__item"><Link className="menu__link" href="#">Hội nhóm</Link></li>
                                <li className="menu__item"><Link className="menu__link" href="#">Contact</Link></li>
                            </ul>
                        </div>
                    </Col>
                    <div className='py-4'>
                        <h5 className='text-center text-white fw-bold'>&copy;2024 Mimimusic | All Rights Reserved</h5>
                    </div>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;