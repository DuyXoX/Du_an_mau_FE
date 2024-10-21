'use client';

import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SliderRauCu from '../sliders/SliderRauCu';
import ScrollAnimation from '../animation/ScrollAnimation';

const LoadingPageFour = () => {
    return (
        <section>
            <Container fluid='xxl'>
                <Row>
                    <Col>
                        <ScrollAnimation animationClass='animation-left'>
                            <h2 className='text-green text-center'>
                                Tin tức mới nhất
                            </h2>
                        </ScrollAnimation>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ScrollAnimation animationClass='animation-'>
                            <SliderRauCu />
                            <ScrollAnimation animationClass='animation-bottom'>
                                <Button variant='green' className='d-block mx-auto'>
                                    Xem tất cả
                                </Button>
                            </ScrollAnimation>
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadingPageFour;