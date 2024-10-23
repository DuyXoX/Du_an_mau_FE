'use client'

import React, { useState } from 'react';
import './SanPhamMain.scss';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import Image from 'next/image';
import product from '@/assets/imgs/product/product_thanh_long.webp';
import { FaStar, FaPlus, FaMinus, FaCartPlus, FaRegHeart, FaShoppingCart, FaHeart } from "react-icons/fa";

const SanPhamMain = ({ id }) => {
    const [quantity, setQuantity] = useState(1);

    const handlePlus = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 99))//Ko cho lớn hơn 99
    };

    const handleMinus = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));//Ko cho bé hơn 1
    };
    // console.log('check  quantity: ', quantity);

    return (
        <>
            <section>
                <Container fluid='xxl'>
                    <Row style={{ '--bs-gutter-x': 'none' }} className='p-3 shadow-custom rounded bg-white'>
                        <Col md={5}>
                            <div className=''>
                                <Image src={product} alt='Ảnh sản phẩm' className='w-100 h-auto' />
                            </div>
                        </Col>
                        <Col sm={7} className='d-flex align-items-center'>
                            <div className=''>
                                <div>
                                    <h5 className=''>
                                        Tên sản phẩm
                                    </h5>
                                </div>
                                <div className='d-flex'>
                                    <div className='pe-3 mb-3 text-warning d-flex justify-content-center align-items-center'>
                                        <div className='me-1'>
                                            5
                                        </div>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
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
                                <div className='mb-4 fw-light'>
                                    <div className='d-flex'>
                                        <Button variant='+'
                                            style={{ '--bs-btn-color': '#8f8f8f' }}
                                            className='border'
                                            onClick={() => { handlePlus() }}
                                        >
                                            <FaPlus size={10} className='' />
                                        </Button>
                                        <input style={{ width: '50px' }}
                                            className='border rounded text-center'
                                            type='number'
                                            value={quantity}
                                            onChange={(e) => {
                                                const value = Math.max(1, Math.min(99, Number(e.target.value))); // Giới hạn từ 1 đến 99
                                                setQuantity(value);
                                            }}
                                        />
                                        <Button variant='-'
                                            style={{ '--bs-btn-color': '#8f8f8f', '--bs-btn-fucus-color': 'red' }}
                                            className='border'
                                            onClick={() => { handleMinus() }}
                                        >
                                            <FaMinus size={10}
                                                className=''
                                            />
                                        </Button>

                                    </div>
                                </div>
                                <div className=''>
                                    <Button variant='green'
                                        className=''
                                        onClick={() => { }}
                                    >
                                        <FaCartPlus size={15} className='' />{' '}
                                        <span className=''>Thêm vào giỏ hàng</span>
                                    </Button>{' '}
                                    <Button variant='danger'
                                        className=''
                                        onClick={() => { }}
                                    >
                                        <span className=''>Mua ngay</span>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container fluid='xxl'>
                    <Row style={{ '--bs-gutter-x': 'none' }} className='p-3 shadow-custom rounded bg-white'>
                        <Col>
                            <div className=''>
                                <h5 className=''>
                                    MÔ TẢ SẢN PHẨM
                                </h5>
                                <p className=''>
                                    🔶 Thông tin Sản phẩm 🔶
                                </p>
                                <p>
                                    🔶 Bla bla bla ... 🔶
                                </p>
                                <p className='fs-8 text-secondary'>
                                    #thong-tin #hashtag
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container fluid='xxl'>
                    <div className='p-3 rounded shadow-custom'>
                        <Row>
                            <div>
                                <h4 className='pt-3 mb-5 text-green text-center'>
                                    Đánh giá và nhận xét
                                </h4>
                            </div>
                            <Col>
                                <div className='h-100 d-flex justify-content-center align-items-center'>
                                    <div className='fs-4 fw-bold'>
                                        5/5
                                    </div>
                                    <FaStar className='ms-2 text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <span className='ps-2 fw-normal'>(10 đánh giá)</span>
                                </div>
                            </Col>
                            <Col>
                                <div className=''>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ width: '10px' }}>
                                            5
                                        </div>
                                        <FaStar className='mx-1 text-warning' />
                                        <ProgressBar variant="green" now={100} className='flex-grow-1' />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ width: '10px' }}>
                                            4
                                        </div>
                                        <FaStar className='mx-1 text-warning' />
                                        <ProgressBar variant="green" now={0} className='flex-grow-1' />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ width: '10px' }}>
                                            3
                                        </div>
                                        <FaStar className='mx-1 text-warning' />
                                        <ProgressBar variant="green" now={0} className='flex-grow-1' />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ width: '10px' }}>
                                            2
                                        </div>
                                        <FaStar className='mx-1 text-warning' />
                                        <ProgressBar variant="green" now={0} className='flex-grow-1' />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ width: '10px' }}>
                                            1
                                        </div>
                                        <FaStar className='mx-1 text-warning' />
                                        <ProgressBar variant="green" now={0} className='flex-grow-1' />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ '--bs-gutter-x': 'none' }}>
                            <p className='fw-bold'>
                                Lọc
                            </p>
                            <Col xs={12}>
                                <div className=''>
                                    <div className='d-flex'>
                                        <Button variant='green'
                                            size='sm'
                                            className='rounded-3'
                                            onClick={() => { }}
                                        >
                                            Tất cả
                                        </Button>
                                        <Button variant='outline-success'
                                            size='sm'
                                            className='ms-2 rounded-3 d-flex align-items-center'
                                            onClick={() => { }}
                                        >
                                            5
                                            <FaStar className='ms-1 text-warning' />
                                        </Button>
                                        <Button variant='outline-success'
                                            size='sm'
                                            className='ms-2 rounded-3 d-flex align-items-center'
                                            onClick={() => { }}
                                        >
                                            4
                                            <FaStar className='ms-1 text-warning' />
                                        </Button>
                                        <Button variant='outline-success'
                                            size='sm'
                                            className='ms-2 rounded-3 d-flex align-items-center'
                                            onClick={() => { }}
                                        >
                                            3
                                            <FaStar className='ms-1 text-warning' />
                                        </Button>
                                        <Button variant='outline-success'
                                            size='sm'
                                            className='ms-2 rounded-3 d-flex align-items-center'
                                            onClick={() => { }}
                                        >
                                            2
                                            <FaStar className='ms-1 text-warning' />
                                        </Button>
                                        <Button variant='outline-success'
                                            size='sm'
                                            className='ms-2 rounded-3 d-flex align-items-center'
                                            onClick={() => { }}
                                        >
                                            1
                                            <FaStar className='ms-1 text-warning' />
                                        </Button>
                                        <Button variant='outline-success'
                                            size='sm'
                                            className='ms-2 rounded-3 d-flex align-items-center'
                                            onClick={() => { }}
                                        >
                                            Có hình ảnh & video
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className='pt-3 d-flex'>
                                    <div>
                                        <Image src={product} width={35} height={35} className='rounded-pill' alt='Ảnh avatar người dùng' />
                                    </div>
                                    <div className='pt-1'>
                                        <div className='d-flex'>
                                            <div className='mb-2 d-flex align-items-center'>
                                                Tên người dùng{' '}
                                                <span style={{ fontSize: 'x-small' }}>
                                                    12:00 10/10/2024
                                                </span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />{' '}
                                            <span className='p-1 border border-success rounded fs-8 text-green'>
                                                Chất lượng sản phẩm tốt
                                            </span>{' '}
                                            <span className='p-1 border border-success rounded fs-8 text-green'>
                                                Đúng hàng đủ số lượng
                                            </span>
                                            <p className='pt-3 fs-8'>
                                                Nội dung đánh giá của khách hàng
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </Col>
                            <Col xs={12} className='separator-top'>
                                <div className='pt-3 d-flex'>
                                    <div>
                                        <Image src={product} width={35} height={35} className='rounded-pill' alt='Ảnh avatar người dùng' />
                                    </div>
                                    <div className='pt-1'>
                                        <div className='d-flex'>
                                            <div className='mb-2 d-flex align-items-center'>
                                                Tên người dùng{' '}
                                                <span style={{ fontSize: 'x-small' }}>
                                                    12:00 10/10/2024
                                                </span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />
                                            <FaStar className='text-warning' />{' '}
                                            <span className='p-1 border border-success rounded fs-8 text-green'>
                                                Chất lượng sản phẩm tốt
                                            </span>{' '}
                                            <span className='p-1 border border-success rounded fs-8 text-green'>
                                                Đúng hàng đủ số lượng
                                            </span>
                                            <p className='pt-3 fs-8'>
                                                Nội dung đánh giá của khách hàng
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </Col>
                            <div className='mb-3 d-flex justify-content-center'>
                                <Button style={{ width: '180px' }} variant='green'>
                                    Xem thêm
                                </Button>
                            </div>
                        </Row>
                    </div>
                </Container>
            </section>
            <section>
                <Container fluid='xxl'>
                    <h4 className='mb-5 fw-bold text-green'>
                        Sản phẩm tương tự
                    </h4>
                    <Row>
                        <Col xs={6} sm={4} xl={3}>
                            <div className=''>
                                <Image src={product}
                                    style={{ objectFit: 'cover' }}
                                    className='mb-4 w-100 h-auto shadow-custom rounded'
                                    alt='Ảnh sản phẩm'
                                />
                                <div className='d-flex card-product'>
                                    <Col xs={7} lg={8}>
                                        <div className=''>
                                            <h6 className='text-truncate'>
                                                Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                                            </h6>
                                            <div className='price d-flex justify-content-between'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='text-truncate text-secondary text-decoration-line-through'>
                                                        Giá gốc
                                                    </div>
                                                    <div className='ms-1 text-truncate'>
                                                        Giảm còn
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 'x-small', width: '40px' }} className='p-1 text-center text-white text-sale rounded bg-secondary'>
                                                    25%
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='outline-light'
                                                style={{
                                                    '--bs-btn-color': 'pink',
                                                    '--bs-btn-hover-color': '#ff8888',
                                                    '--bs-btn-active-color': '#ff8888',
                                                }}
                                                className=''
                                                aria-label='Thích sản phẩm'
                                            >
                                                <FaRegHeart />
                                                {/* <FaHeart /> */}
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='green'
                                                style={{}}
                                                className='border'
                                                aria-label='Mua sản phẩm'
                                            >
                                                <FaShoppingCart />
                                            </Button>
                                        </div>
                                    </Col>
                                </div>
                                <div className='d-flex'>
                                    <Col>
                                        <div className='d-flex card-product'>
                                            <Col xs={7} lg={8}>
                                                <div className='text-warning icon-start'>
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='text-truncate love-buy'>
                                                    Đã thích 99
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='text-truncate love-buy'>
                                                    Đã mua 99
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} xl={3}>
                            <div className=''>
                                <Image src={product}
                                    style={{ objectFit: 'cover' }}
                                    className='mb-4 w-100 h-auto shadow-custom rounded'
                                    alt='Ảnh sản phẩm'
                                />
                                <div className='d-flex card-product'>
                                    <Col xs={7} lg={8}>
                                        <div className=''>
                                            <h6 className='text-truncate'>
                                                Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                                            </h6>
                                            <div className='price d-flex justify-content-between'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='text-truncate text-secondary text-decoration-line-through'>
                                                        Giá gốc
                                                    </div>
                                                    <div className='ms-1 text-truncate'>
                                                        Giảm còn
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 'x-small', width: '40px' }} className='p-1 text-center text-white text-sale rounded bg-secondary'>
                                                    25%
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='outline-light'
                                                style={{
                                                    '--bs-btn-color': 'pink',
                                                    '--bs-btn-hover-color': '#ff8888',
                                                    '--bs-btn-active-color': '#ff8888',
                                                }}
                                                className=''
                                                aria-label='Thích sản phẩm'
                                            >
                                                <FaRegHeart />
                                                {/* <FaHeart /> */}
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='green'
                                                style={{}}
                                                className='border'
                                                aria-label='Mua sản phẩm'
                                            >
                                                <FaShoppingCart />
                                            </Button>
                                        </div>
                                    </Col>
                                </div>
                                <div className='d-flex'>
                                    <Col>
                                        <div className='d-flex card-product'>
                                            <Col xs={7} lg={8}>
                                                <div className='text-warning icon-start'>
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='love-buy'>
                                                    Đã thích 99
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='love-buy'>
                                                    Đã mua 99
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} xl={3}>
                            <div className=''>
                                <Image src={product}
                                    style={{ objectFit: 'cover' }}
                                    className='mb-4 w-100 h-auto shadow-custom rounded'
                                    alt='Ảnh sản phẩm'
                                />
                                <div className='d-flex card-product'>
                                    <Col xs={7} lg={8}>
                                        <div className=''>
                                            <h6 className='text-truncate'>
                                                Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                                            </h6>
                                            <div className='price d-flex justify-content-between'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='text-truncate text-secondary text-decoration-line-through'>
                                                        Giá gốc
                                                    </div>
                                                    <div className='ms-1 text-truncate'>
                                                        Giảm còn
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 'x-small', width: '40px' }} className='p-1 text-center text-white text-sale rounded bg-secondary'>
                                                    25%
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='outline-light'
                                                style={{
                                                    '--bs-btn-color': 'pink',
                                                    '--bs-btn-hover-color': '#ff8888',
                                                    '--bs-btn-active-color': '#ff8888',
                                                }}
                                                className=''
                                                aria-label='Thích sản phẩm'
                                            >
                                                <FaRegHeart />
                                                {/* <FaHeart /> */}
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='green'
                                                style={{}}
                                                className='border'
                                                aria-label='Mua sản phẩm'
                                            >
                                                <FaShoppingCart />
                                            </Button>
                                        </div>
                                    </Col>
                                </div>
                                <div className='d-flex'>
                                    <Col>
                                        <div className='d-flex card-product'>
                                            <Col xs={7} lg={8}>
                                                <div className='text-warning icon-start'>
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='love-buy'>
                                                    Đã thích 99
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='love-buy'>
                                                    Đã mua 99
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} xl={3}>
                            <div className=''>
                                <Image src={product}
                                    style={{ objectFit: 'cover' }}
                                    className='mb-4 w-100 h-auto shadow-custom rounded'
                                    alt='Ảnh sản phẩm'
                                />
                                <div className='d-flex card-product'>
                                    <Col xs={7} lg={8}>
                                        <div className=''>
                                            <h6 className='text-truncate'>
                                                Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                                            </h6>
                                            <div className='price d-flex justify-content-between'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className='text-truncate text-secondary text-decoration-line-through'>
                                                        Giá gốc
                                                    </div>
                                                    <div className='ms-1 text-truncate'>
                                                        Giảm còn
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 'x-small', width: '40px' }} className='p-1 text-center text-white text-sale rounded bg-secondary'>
                                                    25%
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='outline-light'
                                                style={{
                                                    '--bs-btn-color': 'pink',
                                                    '--bs-btn-hover-color': '#ff8888',
                                                    '--bs-btn-active-color': '#ff8888',
                                                }}
                                                className=''
                                                aria-label='Thích sản phẩm'
                                            >
                                                <FaRegHeart />
                                                {/* <FaHeart /> */}
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <Button variant='green'
                                                style={{}}
                                                className='border'
                                                aria-label='Mua sản phẩm'
                                            >
                                                <FaShoppingCart />
                                            </Button>
                                        </div>
                                    </Col>
                                </div>
                                <div className='d-flex'>
                                    <Col>
                                        <div className='d-flex card-product'>
                                            <Col xs={7} lg={8}>
                                                <div className='text-warning icon-start'>
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='love-buy'>
                                                    Đã thích 99
                                                </div>
                                            </Col>
                                            <Col className='d-flex justify-content-center align-items-center'>
                                                <div style={{ fontSize: 'xx-small' }} className='love-buy'>
                                                    Đã mua 99
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SanPhamMain;