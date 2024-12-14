'use client'

import Footer from '@/layouts/Footer';
import Navigation from '@/layouts/Navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const NotFound = () => {
    const router = useRouter();

    return (
        <>
            <Navigation />
            <section>
                <Container style={{ minHeight: '55vh' }}>
                    <Row>
                        <Col>
                            <div className='text-center'>
                                <h1 style={{ fontSize: '10vw', textShadow: '0px 0px 5px green' }} className=' text-light fw-bold'>
                                    4
                                    <span className='text-green'>
                                        0
                                    </span>
                                    4
                                </h1>
                                <p className='fs-5 fw-bold'>
                                    Hiện không có trang này vui lòng trở về trang chủ.
                                </p>
                                <Button variant='green'
                                    onClick={() => router.push('/')}
                                >
                                    Trang chủ
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default NotFound;