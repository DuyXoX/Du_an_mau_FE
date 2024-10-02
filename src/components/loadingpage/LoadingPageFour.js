'use client';

import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SliderRauCu from '../sliders/SliderRauCu';

const LoadingPageFour = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col>
                        <div className=''>
                            <h2 className='text-green text-center'>
                                Tin tức mới nhất
                            </h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className=''>
                            <SliderRauCu />
                            <Button variant='green' className='d-block mx-auto'>
                                Xem tất cả
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadingPageFour;