'use client'

import Image from 'next/image';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import vi_sao_chon_chung_toi from '../../assets/imgs/product/vi_sao_chon_chung_toi.webp';
import cay_trong_01 from '../../assets/imgs/caytrong/cay_trong_01.webp';
import cay_trong_02 from '../../assets/imgs/caytrong/cay_trong_02.webp';
import cay_trong_03 from '../../assets/imgs/caytrong/cay_trong_03.webp';
import ScrollAnimation from '../animation/ScrollAnimation';

const LoadingPageThree = () => {
    return (
        <section>
            <Container fluid='xxl'>
                <Row className='py-4'>
                    <Col>
                        <div className=''>
                            <Image src={vi_sao_chon_chung_toi}
                                className='img-fluid'
                                alt='Vì sao chọn chúng tôi'
                            />
                        </div>
                    </Col>
                </Row>
                <Row className='py-5'>
                    <Col lg={3}>
                        <div className=''>
                            <ScrollAnimation animationClass='animation-left'>
                                <h2 className='text-green'>
                                    Bán hàng Nông Sản
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation animationClass='animation-right'>
                                <p style={{ fontSize: '14px' }}>
                                    Bán hàng Nông Sản tọa lạc tại tỉnh Đắk Lắk, với diện tích 1000 m2. Áp dụng mô hình nông trại công nghệ cao được trang bị hệ thống tưới tiêu tự động tiên tiến. Đây cũng là nơi cung cấp độc quyền các loại rau, củ, quả tươi sạch và an toàn cho người tiêu dùng.
                                    <br />
                                    Sản phẩm trải qua quy trình nuôi trồng, bảo quản nghiêm ngặt. Được chú trọng trong quá trình lựa chọn, kiểm tra trước khi đưa đến tay người tiêu dùng. Chúng tôi tự hào về sự minh bạch trong việc xác định nguồn gốc sản phẩm.
                                </p>
                            </ScrollAnimation>
                        </div>
                    </Col>
                    <Col>
                        <ScrollAnimation animationClass='animation-bottom'>
                            <Image src={cay_trong_01}
                                className='w-100 h-auto'
                                alt='Cầy trông'
                            />
                        </ScrollAnimation>
                    </Col>
                    <Col>
                        <ScrollAnimation animationClass='animation-bottom'>
                            <Image src={cay_trong_02}
                                className='w-100 h-auto'
                                alt='Cầy trông'
                            />
                        </ScrollAnimation>
                    </Col>
                    <Col className='d-none d-md-block'>
                        <ScrollAnimation animationClass='animation-bottom'>
                            <Image src={cay_trong_03}
                                className='w-100 h-auto'
                                alt='Cầy trông'
                            />
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadingPageThree;