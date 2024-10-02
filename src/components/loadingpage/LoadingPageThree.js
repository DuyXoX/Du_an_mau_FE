'use client'

import Image from 'next/image';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import vi_sao_chon_chung_toi from '../../assets/imgs/product/vi_sao_chon_chung_toi.webp';
import cay_trong_01 from '../../assets/imgs/caytrong/cay_trong_01.webp';
import cay_trong_02 from '../../assets/imgs/caytrong/cay_trong_02.webp';
import cay_trong_03 from '../../assets/imgs/caytrong/cay_trong_03.webp';

const LoadingPageThree = () => {
    return (
        <section>
            <Container>
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
                            <h2 className='text-green'>
                                Nông trại Fresco
                            </h2>
                            <p style={{ fontSize: '12px' }}>
                                Nông trại Fresco tọa lạc tại tỉnh Long An, với diện tích 58.000 m2. Áp dụng mô hình nông trại công nghệ cao được trang bị hệ thống tưới tiêu tự động tiên tiến. Đây cũng là nơi cung cấp độc quyền các loại rau, củ, quả tươi sạch và an toàn cho Công ty CP Thực Phẩm Fresco.
                                <br />
                                Sản phẩm trải qua quy trình nuôi trồng, bảo quản nghiêm ngặt. Được chú trọng trong quá trình lựa chọn, kiểm tra trước khi đưa đến tay người tiêu dùng. Chúng tôi tự hào về sự minh bạch trong việc xác định nguồn gốc sản phẩm.
                            </p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className=''>
                            <Image src={cay_trong_01}
                                className='imf-fluid'
                                alt='Cầy trông'
                            />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className=''>
                            <Image src={cay_trong_02}
                                className='imf-fluid'
                                alt='Cầy trông'
                            />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className=''>
                            <Image src={cay_trong_03}
                                className='imf-fluid'
                                alt='Cầy trông'
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadingPageThree;