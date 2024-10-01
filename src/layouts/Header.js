'use client'
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaFacebookSquare, FaFacebookMessenger } from "react-icons/fa";
import Link from 'next/link';
import '../styles/Header.scss';


const Header = () => {
    return (
        <header className='d-lg-none bg-orange'>
            <Container fluid='xl'>
                <Row className='d-flex flex-row'>
                    <Col className='col-4'>
                        <div className='py-2'>
                            <ul className='list-inline my-auto'>
                                <li className='list-inline-item'>
                                    <Link className='me-1 text-white' href="https://www.facebook.com/pijinjapan/"><FaFacebookSquare /></Link></li>
                                <li className='list-inline-item'>
                                    <Link className='text-white' href="https://m.me/pijinjapan"><FaFacebookMessenger /></Link></li>
                            </ul>
                        </div>
                    </Col>
                    <Col className='col-8'>
                        <div className='py-2'>
                            <ul className="list-inline text-end text-white my-auto">
                                <li className="list-inline-item btl">
                                    <Link className="nav-link pe-2" href="dang-nhap">Đăng nhập</Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link className="nav-link" href="dang-ky">Đăng ký</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>

            </Container>

        </header>

    );
};

export default Header;