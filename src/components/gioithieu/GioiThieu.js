'use client'

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const GioiThieu = () => {
    return (
        <>
            <section>
                <Container fluid='xxl' style={{ minHeight: '55vh' }}>
                    <h1 className='text-green text-center'>
                        BÁN HÀNG NÔNG SẢN
                    </h1>
                    <Row xs={1} md={2} className='pt-5 row-gap-3'>
                        <Col className=''>
                            <div className='p-3 md-mb-0 rounded shadow'>
                                <h3 className='text-center text-green py-3'>
                                    Lịch sử phát triển
                                </h3>
                                <p>
                                    Bán hàng nông sản ra đời vào năm 2024, từ tâm huyết của những người nông dân. Với mong muốn gìn giữ những giá trị truyền thống của làng quê, chúng tôi đã quyết định xây dựng một thương hiệu nông sản riêng, mang đến những sản phẩm chất lượng cao đến tay người tiêu dùng.
                                </p>
                            </div>
                        </Col>
                        <Col className=''>
                            <div className='p-3 rounded shadow h-100'>
                                <h3 className='text-center text-green py-3'>
                                    Mục tiêu
                                </h3>
                                <p>
                                    Bán hàng nông sản không chỉ là một thương hiệu nông sản, mà còn là câu chuyện về tình yêu dành cho đất đai, sự trân trọng những sản vật quý giá của thiên nhiên và cam kết mang đến những thực phẩm tươi sạch, an toàn cho mỗi gia đình.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default GioiThieu;