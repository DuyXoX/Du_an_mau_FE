import React from 'react';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';

const LoadThongKe = () => {
    return (
        <section>
            <Container fluid>
                <Placeholder animation="glow" as='div' className=''>
                    <Placeholder
                        xs={3}
                        bg="secondary"
                        style={{ height: '2rem' }}
                        className='mb-3 rounded'
                    />{' '}
                </Placeholder>
                <Row xs={2} sm={3} lg={6} className='g-3'>
                    <Col>
                        <Placeholder animation="glow" as='div' className=''>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '5rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder animation="glow" as='div' className=''>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '5rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder animation="glow" as='div' className=''>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '5rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder animation="glow" as='div' className=''>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '5rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder animation="glow" as='div' className=''>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '5rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder animation="glow" as='div' className=''>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '5rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                </Row>
                <Row className='g-3'>
                    <Col lg>
                        <Placeholder animation="glow" as='div' className='pt-3'>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '25rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col lg>
                        <Placeholder animation="glow" as='div' className='pt-3'>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '25rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                    <Col xs lg={3}>
                        <Placeholder animation="glow" as='div' className='pt-3'>
                            <Placeholder
                                xs={12}
                                bg="secondary"
                                style={{ height: '25rem' }}
                                className='rounded'
                            />
                        </Placeholder>
                    </Col>
                </Row>


            </Container>
        </section>
    );
};

export default LoadThongKe;