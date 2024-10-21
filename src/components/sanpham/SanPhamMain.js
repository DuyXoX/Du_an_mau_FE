'use client'

import React from 'react';
import './SanPhamMain.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import product from '@/assets/imgs/product/product_thanh_long.webp';
import { FaStar } from "react-icons/fa";

const SanPhamMain = ({ id }) => {
    return (
        <section>
            <Container fluid='xxl'>
                <Row style={{ '--bs-gutter-x': 'none' }} className='shadow-sm rounded bg-white'>
                    <Col md={5}>
                        <div className=''>
                            <Image src={product} alt='Ảnh sản phẩm' className='w-100 h-auto' />
                        </div>
                    </Col>
                    <Col sm={7}>
                        <div className=''>
                            <div>
                                <h5 className=''>
                                    Tên sản phẩm
                                </h5>
                            </div>
                            <div className='d-flex'>
                                <p className='pe-3 text-warning d-flex justify-content-center align-items-center'>
                                    5 {' '}
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </p>
                                <p className='separator pe-3'>
                                    99 {' '}
                                    <span className='fs-8 text-secondary'>
                                        Đánh giá
                                    </span>
                                </p>
                                <p className='separator'>
                                    2k {' '}
                                    <span className='fs-8 text-secondary'>
                                        Đã bán
                                    </span>
                                </p>
                            </div>
                            <div className='mb-3 d-flex align-items-center'>
                                <div className='me-2 text-secondary text-decoration-line-through'>
                                    Giá gốc
                                </div>
                                <div className='me-2 fs-5 text-green'>
                                    Giá hiện tại
                                </div>
                                <div className='fs-8'>
                                    Giảm còn
                                </div>
                            </div>
                            <div className=''>
                                <div className='mb-3 fw-light d-flex flex-wrap align-items-center'>
                                    Phân loại
                                    <Button variant='custom' className='p-1 me-2 border rounded'>
                                        <Image src={product}
                                            width={25}
                                            height={25} className=''
                                            alt='Ảnh sản phẩm'
                                        />
                                        <span className='fs-8'>Loại</span>
                                    </Button>
                                    <Button variant='custom' className='p-1 me-2 border rounded'>
                                        <Image src={product}
                                            width={25}
                                            height={25} className=''
                                            alt='Ảnh sản phẩm'
                                        />
                                        <span className='fs-8'>Loại</span>
                                    </Button>
                                    <Button variant='custom' className='p-1 me-2 border rounded'>
                                        <Image src={product}
                                            width={25}
                                            height={25} className=''
                                            alt='Ảnh sản phẩm'
                                        />
                                        <span className='fs-8'>Loại</span>
                                    </Button>
                                </div>
                                <div className='mb-3 fw-light d-flex flex-wrap align-items-center'>
                                    Chủng loại
                                    <Button variant='custom' className='p-1 me-2 border rounded'>
                                        <div className='fs-8'>Loại 1</div>
                                    </Button>
                                    <Button variant='custom' className='p-1 me-2 border rounded'>
                                        <div className='fs-8'>Loại 2</div>
                                    </Button>
                                    <Button variant='custom' className='p-1 me-2 border rounded'>
                                        <div className='fs-8'>Loại 3</div>
                                    </Button>
                                </div>
                            </div>
                            <div className='fw-light'>
                                Số lượng
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SanPhamMain;