'use client'

import Image from 'next/image';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './LoadingPage.scss';
import product_01 from '../../assets/imgs/product/product_01.webp';
import product_02 from '../../assets/imgs/product/product_02.webp';
import product_03 from '../../assets/imgs/product/product_03.webp';
import ScrollAnimation from '../animation/ScrollAnimation';


const LoadingPageTwo = () => {
    return (
        <section>
            <Container fluid='xxl'>
                <Row>
                    <Col>
                        <ScrollAnimation animationClass='animation-left'>
                            <h2 className='mb-5 text-center'>
                                Sản Phẩm của thương hiệu
                            </h2>
                        </ScrollAnimation>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ScrollAnimation animationClass='animation-bottom w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden cursor img-hover rounded-3'>
                            <Image src={product_01}
                                className='w-100 h-auto'
                                alt='Thịt & thủy hải sản'
                            />
                        </ScrollAnimation>
                    </Col>
                    <Col>
                        <ScrollAnimation animationClass='animation-bottom w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden cursor img-hover rounded-3'>
                            <Image src={product_02}
                                className='w-100 h-auto'
                                alt='Thịt & thủy hải sản'
                            />
                        </ScrollAnimation>
                    </Col>
                    <Col className='d-none d-md-block'>
                        <ScrollAnimation animationClass='animation-bottom w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden cursor img-hover rounded-3'>
                            <Image src={product_03}
                                className='w-100 h-auto'
                                alt='Thịt & thủy hải sản'
                            />
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadingPageTwo;