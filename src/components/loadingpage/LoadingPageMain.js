'use client'

import React from 'react';
import './LoadingPage.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import loadingpage_01 from '../../assets/imgs/loadingpage/loadingpage_01.webp';
import loadingpage_02 from '../../assets/imgs/loadingpage/loadingpage_02.webp';
import loadingpage_03 from '../../assets/imgs/loadingpage/loadingpage_03.png';
import loadingpage_04 from '../../assets/imgs/loadingpage/loadingpage_04.png';
import loadingpage_05 from '../../assets/imgs/loadingpage/loadingpage_05.png';
import loadingpage_06 from '../../assets/imgs/loadingpage/loadingpage_06.png';
import loadingpage_07 from '../../assets/imgs/loadingpage/loadingpage_07.jpg';
import loadingpage_bg from '../../assets/imgs/loadingpage/loadingpage_bg.png';
import ScrollAnimation from '../animation/ScrollAnimation';
import { useRouter } from 'next/navigation';
import { useGetData } from '@/service/apiServive';


const LoadingPageMain = () => {
    const { data } = useGetData('/sanpham')
    const router = useRouter();

    const limitedData = data ? data.slice(0, 8) : [];
    // console.log('check: ', data && limitedData);

    return (
        <section style={{ paddingTop: '0px' }}>
            <Container fluid='xxl'>
                <div style={{ background: `url(${loadingpage_bg.src})`, backgroundRepeat: 'no-repeat' }} className='position-relative' >
                    <Row>
                        <Col md={6} className='d-flex justify-content-center justify-content-md-end align-items-center'>
                            <div style={{ maxWidth: '380px' }} className=''>
                                <ScrollAnimation animationClass='animation-left'>
                                    <h2 className='text-green'>
                                        Về chúng tôi
                                    </h2>
                                </ScrollAnimation>
                                <ScrollAnimation animationClass='animation-right'>
                                    <p style={{ fontSize: '12px' }}>
                                        Thương hiệu đã trải qua một hành trình phát triển nhiều kinh nghiệm khi bắt đầu từ một cơ sở nhỏ vào tháng 06/2006 cho đến nay. Với hơn 17 năm hoạt động trong lĩnh vực thực phẩm sạch và an toàn chúng tôi đã phát triển thành một doanh nghiệp lớn vững mạnh với quy mô khoảng hơn 500 công nhân viên, cung cấp thực phẩm cho nhiều đơn vị trên địa bàn TP. Hồ Chí Minh và Bình Dương.
                                    </p>
                                </ScrollAnimation>
                                <ScrollAnimation animationClass='animation-bottom'>
                                    <Button
                                        variant='green'
                                        className=''
                                        onClick={() => router.push('/gioi-thieu')}
                                    >
                                        Xem thêm
                                    </Button>
                                </ScrollAnimation>
                            </div>
                        </Col>
                        <Col md={6}>
                            <ScrollAnimation animationClass='animation-right'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <Image src={loadingpage_01} className='img-fluid' alt='ảnh giới thiệu về chúng tôi' />
                                </div>
                            </ScrollAnimation>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className=''>
                                <ScrollAnimation animationClass='animation-left'>
                                    <h2 className='text-center text-green'>
                                        Các Sản Phẩm Nổi Bật
                                    </h2>
                                </ScrollAnimation>
                                <ScrollAnimation animationClass='animation-right'>
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
                                                Rau củ
                                            </h6>
                                        </div>
                                        <div className='p-3'>
                                            <Image
                                                width={50}
                                                height={50}
                                                src={loadingpage_05}
                                                alt='Tất cả sản phẩm'
                                                className='d-block mx-auto' />
                                            <h6 className='d-none d-md-block pt-3 text-green'>
                                                Trái cây
                                            </h6>
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
                                </ScrollAnimation>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {limitedData ?
                            limitedData.map((item, idx) => {
                                return (
                                    <Col sm={6} lg={3} className='py-2' key={idx}>
                                        <ScrollAnimation animationClass='animation-bottom h-100 border border1 bg-white'>
                                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${item.HinhAnh[0]?.DuongDanHinh}`}
                                                style={{ maxHeight: '250px', objectFit: 'cover' }}
                                                className='w-100 d-block mx-auto'
                                                width={250}
                                                height={250}
                                                alt={item.TenSanPham}
                                            />
                                            <Link href={`san-pham/${item.SanPhamId}`} style={{ bottom: '1%' }}
                                                className='py-3 nav-link fw-bold text-center'
                                            >
                                                {item.TenSanPham}
                                            </Link>
                                        </ScrollAnimation>
                                    </Col>
                                )
                            })
                            :
                            <>
                            </>
                        }
                    </Row>
                    <Button variant='green'
                        className='mt-3 d-block mx-auto'
                        onClick={() => router.push('/san-pham')}
                    >
                        Xem tất cả sản phẩm
                    </Button>
                    <Image src={loadingpage_02} alt='ảnh lá deco' style={{ top: '25%' }} className='img-fluid position-absolute start-0' />
                </div>
            </Container>
        </section>
    );
};

export default LoadingPageMain;