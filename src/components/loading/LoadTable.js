'use client'
import React from 'react';
import { Button, Col, Container, Placeholder, Row } from 'react-bootstrap';
import { FaFileUpload, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

const LoadTable = () => {
    return (
        <section>
            <Container fluid>
                <Row>
                    <Col className=''>
                        <div className='p-3 rounded bg-white shadow-sm '>
                            <div className='p-3 border rounded d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <Button style={{ width: '100px' }} variant='success'
                                        className='me-1 d-flex justify-content-center align-items-center'>
                                        <IoMdAdd className='fs-5' /> Thêm
                                    </Button>
                                    <Button style={{ width: '100px' }} variant='danger'
                                        disabled={true}
                                        className='d-flex justify-content-center align-items-center'>
                                        <FaRegTrashAlt className='pe-1' /> Xóa
                                    </Button>
                                </div>
                                {/* <div className='d-none d-sm-block'>
                                    <Button style={{
                                        width: '100px',
                                        '--bs-btn-bg': '#be44ff',
                                        '--bs-btn-border-color': '#be44ff',
                                        '--bs-btn-hover-bg': '#cd6eff',
                                        '--bs-btn-hover-border-color': '#cd6eff',
                                        '--bs-btn-active-bg': '#be44ff',
                                        '--bs-btn-active-border-color': '#be44ff',
                                    }}
                                        className='d-flex justify-content-center align-items-center'>
                                        <FaFileUpload />
                                        Upfile
                                    </Button>
                                </div> */}
                            </div>
                            <div className='p-3 border rounded'>
                                <Placeholder animation="glow" className='d-block d-sm-flex justify-content-sm-between'>
                                    <Placeholder
                                        xs={2}
                                        bg="secondary"
                                        style={{ height: '2rem' }}
                                        className='rounded'
                                    />{' '}
                                    <Placeholder
                                        xs={3}
                                        bg="secondary"
                                        style={{ height: '2rem' }}
                                        className='rounded'
                                    />
                                </Placeholder>
                            </div>
                            <div className='p-3 border rounded'>
                                <Placeholder animation='glow'>
                                    <Placeholder
                                        xs={12}
                                        bg="secondary"
                                        style={{ height: '3rem' }}
                                        className='mb-3 rounded'
                                    />
                                    <Placeholder
                                        xs={12}
                                        bg="secondary"
                                        style={{ height: '3rem' }}
                                        className='mb-3 rounded'
                                    />
                                    <Placeholder
                                        xs={12}
                                        bg="secondary"
                                        style={{ height: '3rem' }}
                                        className='mb-3 rounded'
                                    />
                                    <Placeholder
                                        xs={12}
                                        bg="secondary"
                                        style={{ height: '3rem' }}
                                        className='mb-3 rounded'
                                    />
                                    <Placeholder
                                        xs={12}
                                        bg="secondary"
                                        style={{ height: '3rem' }}
                                        className='mb-3 rounded'
                                    />
                                </Placeholder>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadTable;