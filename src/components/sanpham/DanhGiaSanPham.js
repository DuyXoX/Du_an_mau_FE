import Image from 'next/image';
import React from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const DanhGiaSanPham = ({ product }) => {
    return (
        <section>
            <Container fluid="xxl">
                <div className="p-3 rounded shadow-custom">
                    <Row>
                        <div>
                            <h4 className="pt-3 mb-5 text-green text-center">
                                Đánh giá và nhận xét
                            </h4>
                        </div>
                        <Col>
                            <div className="h-100 d-flex justify-content-center align-items-center">
                                <div className="fs-4 fw-bold">5/5</div>
                                <FaStar className="ms-2 text-warning" />
                                <FaStar className="text-warning" />
                                <FaStar className="text-warning" />
                                <FaStar className="text-warning" />
                                <FaStar className="text-warning" />
                                <span className="ps-2 fw-normal">(10 đánh giá)</span>
                            </div>
                        </Col>
                        <Col>
                            <div className="">
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "10px" }}>5</div>
                                    <FaStar className="mx-1 text-warning" />
                                    <ProgressBar
                                        variant="green"
                                        now={100}
                                        className="flex-grow-1"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "10px" }}>4</div>
                                    <FaStar className="mx-1 text-warning" />
                                    <ProgressBar
                                        variant="green"
                                        now={0}
                                        className="flex-grow-1"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "10px" }}>3</div>
                                    <FaStar className="mx-1 text-warning" />
                                    <ProgressBar
                                        variant="green"
                                        now={0}
                                        className="flex-grow-1"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "10px" }}>2</div>
                                    <FaStar className="mx-1 text-warning" />
                                    <ProgressBar
                                        variant="green"
                                        now={0}
                                        className="flex-grow-1"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "10px" }}>1</div>
                                    <FaStar className="mx-1 text-warning" />
                                    <ProgressBar
                                        variant="green"
                                        now={0}
                                        className="flex-grow-1"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ "--bs-gutter-x": "none" }}>
                        <p className="fw-bold">Lọc</p>
                        <Col xs={12}>
                            <div className="">
                                <div className="d-flex">
                                    <Button
                                        variant="green"
                                        size="sm"
                                        className="rounded-3"
                                        onClick={() => { }}
                                    >
                                        Tất cả
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        className="ms-2 rounded-3 d-flex align-items-center"
                                        onClick={() => { }}
                                    >
                                        5
                                        <FaStar className="ms-1 text-warning" />
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        className="ms-2 rounded-3 d-flex align-items-center"
                                        onClick={() => { }}
                                    >
                                        4
                                        <FaStar className="ms-1 text-warning" />
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        className="ms-2 rounded-3 d-flex align-items-center"
                                        onClick={() => { }}
                                    >
                                        3
                                        <FaStar className="ms-1 text-warning" />
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        className="ms-2 rounded-3 d-flex align-items-center"
                                        onClick={() => { }}
                                    >
                                        2
                                        <FaStar className="ms-1 text-warning" />
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        className="ms-2 rounded-3 d-flex align-items-center"
                                        onClick={() => { }}
                                    >
                                        1
                                        <FaStar className="ms-1 text-warning" />
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        className="ms-2 rounded-3 d-flex align-items-center"
                                        onClick={() => { }}
                                    >
                                        Có hình ảnh & video
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="pt-3 d-flex">
                                <div>
                                    <Image
                                        src={product}
                                        width={35}
                                        height={35}
                                        className="rounded-pill"
                                        alt="Ảnh avatar người dùng"
                                    />
                                </div>
                                <div className="pt-1">
                                    <div className="d-flex">
                                        <div className="mb-2 d-flex align-items-center">
                                            Tên người dùng{" "}
                                            <span style={{ fontSize: "x-small" }}>
                                                12:00 10/10/2024
                                            </span>
                                        </div>
                                    </div>
                                    <div className="">
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />{" "}
                                        <span className="p-1 border border-success rounded fs-8 text-green">
                                            Chất lượng sản phẩm tốt
                                        </span>{" "}
                                        <span className="p-1 border border-success rounded fs-8 text-green">
                                            Đúng hàng đủ số lượng
                                        </span>
                                        <p className="pt-3 fs-8">
                                            Nội dung đánh giá của khách hàng
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} className="separator-top">
                            <div className="pt-3 d-flex">
                                <div>
                                    <Image
                                        src={product}
                                        width={35}
                                        height={35}
                                        className="rounded-pill"
                                        alt="Ảnh avatar người dùng"
                                    />
                                </div>
                                <div className="pt-1">
                                    <div className="d-flex">
                                        <div className="mb-2 d-flex align-items-center">
                                            Tên người dùng{" "}
                                            <span style={{ fontSize: "x-small" }}>
                                                12:00 10/10/2024
                                            </span>
                                        </div>
                                    </div>
                                    <div className="">
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />{" "}
                                        <span className="p-1 border border-success rounded fs-8 text-green">
                                            Chất lượng sản phẩm tốt
                                        </span>{" "}
                                        <span className="p-1 border border-success rounded fs-8 text-green">
                                            Đúng hàng đủ số lượng
                                        </span>
                                        <p className="pt-3 fs-8">
                                            Nội dung đánh giá của khách hàng
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <div className="mb-3 d-flex justify-content-center">
                            <Button style={{ width: "180px" }} variant="green">
                                Xem thêm
                            </Button>
                        </div>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default DanhGiaSanPham;