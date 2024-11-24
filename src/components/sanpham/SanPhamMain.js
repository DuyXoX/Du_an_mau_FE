"use client"

import React, { useEffect, useState } from "react";
import "./SanPhamMain.scss";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import Image from "next/image";
import product from "@/assets/imgs/product/product_thanh_long.webp";
import { FaStar, FaRegHeart, FaShoppingCart, } from "react-icons/fa";
import { useGetData } from "@/service/apiServive";
import { InFoCart } from "@/containers/context/InFoCart";
import HeaderSanPham from "./HeaderSanPham";

const SanPhamMain = ({ id }) => {
  const { data, isLoading, error, mutate } = useGetData(`/sanpham/${id}`)
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  // return console.log('check: ', products);

  if (isLoading) {
    return <div>Loading...</div>; // Hoặc có thể hiển thị một thông báo khác
  }
  if (error) {
    return <div className="">Sản phẩm không tồn tại...</div>
  }

  // console.log('check: ', products;

  return (
    <>
      {/* <InFoCart> */}
      <HeaderSanPham
        products={products}
      />
      {/* </InFoCart> */}
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
      <section>
        <Container fluid="xxl">
          <h4 className="mb-5 fw-bold text-green">Sản phẩm tương tự</h4>
          <Row>
            <Col xs={6} sm={4} xl={3}>
              <div className="">
                <Image
                  src={product}
                  style={{ objectFit: "cover" }}
                  className="mb-4 w-100 h-auto shadow-custom rounded"
                  alt="Ảnh sản phẩm"
                  width={180}
                  height={180}
                />
                <div className="d-flex card-product">
                  <Col xs={7} lg={8}>
                    <div className="">
                      <h6 className="text-truncate">
                        Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                      </h6>
                      <div className="price d-flex justify-content-between">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="text-truncate text-secondary text-decoration-line-through">
                            Giá gốc
                          </div>
                          <div className="ms-1 text-truncate">Giảm còn</div>
                        </div>
                        <div
                          style={{ fontSize: "x-small", width: "40px" }}
                          className="p-1 text-center text-white text-sale rounded bg-secondary"
                        >
                          25%
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="outline-light"
                        style={{
                          "--bs-btn-color": "pink",
                          "--bs-btn-hover-color": "#ff8888",
                          "--bs-btn-active-color": "#ff8888",
                        }}
                        className=""
                        aria-label="Thích sản phẩm"
                      >
                        <FaRegHeart />
                        {/* <FaHeart /> */}
                      </Button>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="green"
                        style={{}}
                        className="border"
                        aria-label="Mua sản phẩm"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div>
                  </Col>
                </div>
                <div className="d-flex">
                  <Col>
                    <div className="d-flex card-product">
                      <Col xs={7} lg={8}>
                        <div className="text-warning icon-start">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="text-truncate love-buy"
                        >
                          Đã thích 99
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="text-truncate love-buy"
                        >
                          Đã mua 99
                        </div>
                      </Col>
                    </div>
                  </Col>
                </div>
              </div>
            </Col>
            <Col xs={6} sm={4} xl={3}>
              <div className="">
                <Image
                  src={product}
                  style={{ objectFit: "cover" }}
                  className="mb-4 w-100 h-auto shadow-custom rounded"
                  alt="Ảnh sản phẩm"
                />
                <div className="d-flex card-product">
                  <Col xs={7} lg={8}>
                    <div className="">
                      <h6 className="text-truncate">
                        Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                      </h6>
                      <div className="price d-flex justify-content-between">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="text-truncate text-secondary text-decoration-line-through">
                            Giá gốc
                          </div>
                          <div className="ms-1 text-truncate">Giảm còn</div>
                        </div>
                        <div
                          style={{ fontSize: "x-small", width: "40px" }}
                          className="p-1 text-center text-white text-sale rounded bg-secondary"
                        >
                          25%
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="outline-light"
                        style={{
                          "--bs-btn-color": "pink",
                          "--bs-btn-hover-color": "#ff8888",
                          "--bs-btn-active-color": "#ff8888",
                        }}
                        className=""
                        aria-label="Thích sản phẩm"
                      >
                        <FaRegHeart />
                        {/* <FaHeart /> */}
                      </Button>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="green"
                        style={{}}
                        className="border"
                        aria-label="Mua sản phẩm"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div>
                  </Col>
                </div>
                <div className="d-flex">
                  <Col>
                    <div className="d-flex card-product">
                      <Col xs={7} lg={8}>
                        <div className="text-warning icon-start">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="love-buy"
                        >
                          Đã thích 99
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="love-buy"
                        >
                          Đã mua 99
                        </div>
                      </Col>
                    </div>
                  </Col>
                </div>
              </div>
            </Col>
            <Col xs={6} sm={4} xl={3}>
              <div className="">
                <Image
                  src={product}
                  style={{ objectFit: "cover" }}
                  className="mb-4 w-100 h-auto shadow-custom rounded"
                  alt="Ảnh sản phẩm"
                />
                <div className="d-flex card-product">
                  <Col xs={7} lg={8}>
                    <div className="">
                      <h6 className="text-truncate">
                        Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                      </h6>
                      <div className="price d-flex justify-content-between">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="text-truncate text-secondary text-decoration-line-through">
                            Giá gốc
                          </div>
                          <div className="ms-1 text-truncate">Giảm còn</div>
                        </div>
                        <div
                          style={{ fontSize: "x-small", width: "40px" }}
                          className="p-1 text-center text-white text-sale rounded bg-secondary"
                        >
                          25%
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="outline-light"
                        style={{
                          "--bs-btn-color": "pink",
                          "--bs-btn-hover-color": "#ff8888",
                          "--bs-btn-active-color": "#ff8888",
                        }}
                        className=""
                        aria-label="Thích sản phẩm"
                      >
                        <FaRegHeart />
                        {/* <FaHeart /> */}
                      </Button>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="green"
                        style={{}}
                        className="border"
                        aria-label="Mua sản phẩm"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div>
                  </Col>
                </div>
                <div className="d-flex">
                  <Col>
                    <div className="d-flex card-product">
                      <Col xs={7} lg={8}>
                        <div className="text-warning icon-start">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="love-buy"
                        >
                          Đã thích 99
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="love-buy"
                        >
                          Đã mua 99
                        </div>
                      </Col>
                    </div>
                  </Col>
                </div>
              </div>
            </Col>
            <Col xs={6} sm={4} xl={3}>
              <div className="">
                <Image
                  src={product}
                  style={{ objectFit: "cover" }}
                  className="mb-4 w-100 h-auto shadow-custom rounded"
                  alt="Ảnh sản phẩm"
                />
                <div className="d-flex card-product">
                  <Col xs={7} lg={8}>
                    <div className="">
                      <h6 className="text-truncate">
                        Tên sản phẩmjssssssssssssssssssssssssssssssssssssssss
                      </h6>
                      <div className="price d-flex justify-content-between">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="text-truncate text-secondary text-decoration-line-through">
                            Giá gốc
                          </div>
                          <div className="ms-1 text-truncate">Giảm còn</div>
                        </div>
                        <div
                          style={{ fontSize: "x-small", width: "40px" }}
                          className="p-1 text-center text-white text-sale rounded bg-secondary"
                        >
                          25%
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="outline-light"
                        style={{
                          "--bs-btn-color": "pink",
                          "--bs-btn-hover-color": "#ff8888",
                          "--bs-btn-active-color": "#ff8888",
                        }}
                        className=""
                        aria-label="Thích sản phẩm"
                      >
                        <FaRegHeart />
                        {/* <FaHeart /> */}
                      </Button>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div>
                      <Button
                        variant="green"
                        style={{}}
                        className="border"
                        aria-label="Mua sản phẩm"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div>
                  </Col>
                </div>
                <div className="d-flex">
                  <Col>
                    <div className="d-flex card-product">
                      <Col xs={7} lg={8}>
                        <div className="text-warning icon-start">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="love-buy"
                        >
                          Đã thích 99
                        </div>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <div
                          style={{ fontSize: "xx-small" }}
                          className="love-buy"
                        >
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