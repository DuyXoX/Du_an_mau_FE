import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const MoTaSanPham = ({ products }) => {
    return (
        <section>
            <Container fluid="xxl">
                <Row
                    style={{ "--bs-gutter-x": "none" }}
                    className="p-3 shadow-custom rounded bg-white"
                >
                    <Col>
                        <div className="">
                            <h5 className="">MÔ TẢ SẢN PHẨM</h5>
                            <p className="">🔶 Thông tin Sản phẩm 🔶</p>

                            <div>
                                <p dangerouslySetInnerHTML={{ __html: products?.MoTa }} />
                            </div>

                            <p className="fs-8 text-secondary">#thong-tin #hashtag</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MoTaSanPham;