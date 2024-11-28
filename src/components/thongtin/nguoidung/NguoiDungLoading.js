import React from 'react';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';

const NguoiDungLoading = () => {
    return (
        <section>
            <Container fluid='xxl'>
                <Row style={{ '--bs-gutter-x': 'none', minHeight: '55vh' }} className='p-3 border border-3 rounded-4'>
                    <Col xs={12}>
                        <div>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={5} bg="secondary" style={{ height: '2rem' }} className='rounded' />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={4} bg="secondary" style={{ height: '1.5rem' }} className='rounded' />
                            </Placeholder>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='pt-4 pe-lg-2'>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} bg="secondary" style={{ height: '3rem' }} className='rounded' />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} bg="secondary" style={{ height: '3rem' }} className='rounded' />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} bg="secondary" style={{ height: '3rem' }} className='rounded' />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} bg="secondary" style={{ height: '3rem' }} className='rounded' />
                            </Placeholder>
                            <Placeholder as="p" animation="glow" className='mt-4'>
                                <Placeholder xs={3} bg="secondary" style={{ height: '2rem' }} className='rounded' />
                            </Placeholder>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='pt-4 ps-lg-2 h-100'>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} bg="secondary" style={{ height: '3rem' }} className='rounded' />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} bg="secondary" style={{ height: '3rem' }} className='rounded' />
                            </Placeholder>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NguoiDungLoading;