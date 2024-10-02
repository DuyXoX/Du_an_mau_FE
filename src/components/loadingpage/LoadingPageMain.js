'use client'

import React from 'react';
import './LoadingPage.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import loadingpage_01 from '../../assets/imgs/loadingpage/loadingpage_01.webp';
import loadingpage_02 from '../../assets/imgs/loadingpage/loadingpage_02.webp';
import loadingpage_03 from '../../assets/imgs/loadingpage/loadingpage_03.png';
import loadingpage_04 from '../../assets/imgs/loadingpage/loadingpage_04.png';
import loadingpage_05 from '../../assets/imgs/loadingpage/loadingpage_05.png';
import loadingpage_06 from '../../assets/imgs/loadingpage/loadingpage_06.png';
import loadingpage_07 from '../../assets/imgs/loadingpage/loadingpage_07.jpg';
import loadingpage_bg from '../../assets/imgs/loadingpage/loadingpage_bg.png';
import product_xa_lat from '../../assets/imgs/product/product_xa_lat.webp';
import product_oi from '../../assets/imgs/product/product_oi.webp';
import product_man_cut from '../../assets/imgs/product/product_man_cut.webp';
import product_thanh_long from '../../assets/imgs/product/product_thanh_long.webp';
import product_kho_qua from '../../assets/imgs/product/product_kho_qua.webp';
import product_ca_tim from '../../assets/imgs/product/product_ca_tim.webp';
import product_ca_rot from '../../assets/imgs/product/product_ca_rot.webp';
import product_bap_cai from '../../assets/imgs/product/product_bap_cai.webp';
import Link from 'next/link';


const LoadingPageMain = () => {
    return (
        <section style={{ paddingTop: '0px' }}>
            <Container>
                <div style={{ background: `url(${loadingpage_bg.src})`, backgroundRepeat: 'no-repeat' }} className='position-relative' >
                    <Row>
                        <Col lg={6} className='d-flex justify-content-end align-items-center'>
                            <div style={{ maxWidth: '380px' }} className=''>
                                <h2 className='text-green'>
                                    Về chúng tôi
                                </h2>
                                <p style={{ fontSize: '12px' }}>
                                    Thương hiệu đã trải qua một hành trình phát triển nhiều kinh nghiệm khi bắt đầu từ một cơ sở nhỏ vào tháng 06/2006 cho đến nay. Với hơn 17 năm hoạt động trong lĩnh vực thực phẩm sạch và an toàn chúng tôi đã phát triển thành một doanh nghiệp lớn vững mạnh với quy mô khoảng hơn 500 công nhân viên, cung cấp thực phẩm cho nhiều đơn vị trên địa bàn TP. Hồ Chí Minh và Bình Dương.
                                </p>
                                <Button variant='green' className=''>
                                    Xem thêm
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Image src={loadingpage_01} className='img-fluid' alt='ảnh giới thiệu về chúng tôi' />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className=''>
                                <h2 className='text-center text-green'>
                                    Các Sản Phẩm Nổi Bật
                                </h2>
                                <div className='d-flex flex-wrap justify-content-center align-items-center'>
                                    <div className='p-3'>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={loadingpage_03}
                                            alt='Tất cả sản phẩm'
                                            className='d-block mx-auto' />
                                        <h6 className='d-none d-md-block pt-3 text-green'>
                                            Tất cả sản phẩm
                                        </h6>
                                    </div>
                                    <div className='p-3'>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={loadingpage_04}
                                            alt='Tất cả sản phẩm'
                                            className='d-block mx-auto' />
                                        <h6 className='d-none d-md-block pt-3 text-green'>
                                            Rau củ                                        </h6>
                                    </div>
                                    <div className='p-3'>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={loadingpage_05}
                                            alt='Tất cả sản phẩm'
                                            className='d-block mx-auto' />
                                        <h6 className='d-none d-md-block pt-3 text-green'>
                                            Trái cây                                        </h6>
                                    </div>
                                    <div className='p-3'>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={loadingpage_06}
                                            alt='Tất cả sản phẩm'
                                            className='d-block mx-auto' />
                                        <h6 className='d-none d-md-block pt-3 text-green'>
                                            Thịt & Thủy Hải Sản
                                        </h6>
                                    </div>
                                    <div className=''>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={loadingpage_07}
                                            alt='Tất cả sản phẩm'
                                            className='d-block mx-auto' />
                                        <h6 className='d-none d-md-block pt-3 text-green'>
                                            Gia vị & Thực phẩm khô
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_xa_lat}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Xà lách'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Xà lách
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_oi}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Ổi'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Ổi
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_man_cut}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Măng cụt'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Măng cụt
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_thanh_long}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Thanh long'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Thanh long
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_kho_qua}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Khổ qua'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Khổ qua
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_ca_tim}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Cà tím'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Cà tím
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_ca_rot}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Cà rốt'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Cà rốt
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className='py-2'>
                            <div className='h-100 border border1 bg-white'>
                                <Image src={product_bap_cai}
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                    className='w-100 d-block mx-auto'
                                    alt='Bắp cải'
                                />
                                <Link href='/product/' style={{ bottom: '1%' }}
                                    className='py-3 nav-link fw-bold text-center'
                                >
                                    Bắp cải
                                </Link>
                            </div>
                        </Col>

                    </Row>
                    <Button variant='green' className='mt-3 d-block mx-auto'>
                        Xem tất cả sản phẩm
                    </Button>
                    <Image src={loadingpage_02} alt='ảnh lá deco' style={{ top: '25%' }} className='img-fluid position-absolute start-0' />
                </div>
            </Container>
        </section>
    );
};

export default LoadingPageMain;