"use client"

import React, { useEffect, useState } from "react";
import "./SanPhamMain.scss";
// Đảm bảo tên đúng
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import Image from "next/image";
import product from "@/assets/imgs/product/product_thanh_long.webp";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import {
  FaStar,
  FaPlus,
  FaMinus,
  FaCartPlus,
  FaRegHeart,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { postData, checkLogin } from "@/service/apiServive";
const SanPhamMain = ({ id }) => {
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [chiTietSanPhamId, setChiTietSanPhamId] = useState(null); // Thêm state để lưu ChiTietSanPhamId
  const [quantity, setQuantity] = useState(1);

  const handlePlus = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99)); //Ko cho lớn hơn 99
  };

  const handleMinus = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); //Ko cho bé hơn 1
  };
  // console.log('check  quantity: ', quantity);

  // const router = useRouter();
  // const fetchedId = router.query.id; // Lấy id từ URL
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/sanpham/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data); // Giả sử `data` là đối tượng sản phẩm
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Kiểm tra nếu product là null hoặc undefined
  if (!products) {
    return <div>Loading...</div>; // Hoặc có thể hiển thị một thông báo khác
  }
  const sanPhamId = products ? products.SanPhamId : null; // Lấy ID sản phẩm nếu đã có dữ liệu
  // const handleAddToCart = async () => {
  //     if (!sanPhamId) {
  //         console.error('Sản phẩm không tồn tại');
  //         return;
  //     }

  //     try {
  //         const response = await axios.post('http://localhost:8000/api/cart', {
  //             SanPhamId: sanPhamId, // ID sản phẩm
  //             SoLuong: quantity // Số lượng được chọn
  //         });
  //         // Xử lý phản hồi nếu cần
  //         console.log('Sản phẩm đã được thêm vào giỏ hàng:', response.data);
  //     } catch (error) {
  //         console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
  //     }
  // };

  const handleAddToCart = async () => {
    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = await checkLogin();

    // Nếu người dùng chưa đăng nhập
    if (!isLoggedIn) {
        console.warn("Người dùng chưa đăng nhập. Chuyển hướng đến trang đăng nhập.");
        return;
    }

    // Kiểm tra ID sản phẩm
    if (!sanPhamId) {
        console.error("Sản phẩm không tồn tại");
        return;
    }

    // Kiểm tra ChiTietSanPhamId đã được lưu trong state
    if (!chiTietSanPhamId) {
        alert("Bạn chưa chọn chi tiết sản phẩm. Vui lòng chọn chi tiết sản phẩm trước khi thêm vào giỏ hàng.");
       
        return;
    }

    try {
        // Sử dụng hàm postData đã cấu hình để gọi API thêm sản phẩm vào giỏ hàng
        const cartResponse = await postData("/cart", {
            SanPhamId: sanPhamId, // ID sản phẩm
            SoLuong: quantity, // Số lượng được chọn
            ChiTietSanPhamId: chiTietSanPhamId, // Sử dụng ChiTietSanPhamId từ state
        });

        // console.log("Sản phẩm đã được thêm vào giỏ hàng:", cartResponse);
        if (cartResponse.message) {
          toast.success(cartResponse.message);  // Hiển thị thông báo thành công
      }

    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);

        // Nếu có lỗi xác thực, tự động điều hướng đến trang đăng nhập
        // (Có thể thêm logic để xử lý lỗi ở đây)
    }
};



  const handleDetailChange = (detail) => {
    setSelectedDetail(detail);
    setChiTietSanPhamId(detail.ChiTietSanPhamId); // Giả sử `detail` có trường ChiTietSanPhamId
    
 
console.log("Sản phẩm đã click:", detail);
};
  return (
    <>
      <section>
        <Container fluid="xxl">
          <Row
            style={{ "--bs-gutter-x": "none" }}
            className="p-3 shadow-custom rounded bg-white"
          >
            <Col md={5}>
              <div className="">
                <img
                  src={products.HinhAnh[0]}
                  alt={product.TenSanPham}
                  className="imgsanphamid"
                />
              </div>
            </Col>
            <Col sm={7} className="d-flex align-items-center">
              <div className="">
                <div>
                  <h1>{products.TenSanPham || "Tên sản phẩm không có"}</h1>
                </div>
                <div className="d-flex">
                  <div className="pe-3 mb-3 text-warning d-flex justify-content-center align-items-center">
                    <div className="me-1">5</div>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="separator pe-3">
                    99 <span className="fs-8 text-secondary">Đánh giá</span>
                  </p>
                  <p className="separator">
                    2k <span className="fs-8 text-secondary">Đã bán</span>
                  </p>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  {/* <div className='me-2 text-secondary text-decoration-line-through'>
                                        Giá gốc
                                    </div> */}
                  <div className="me-2 fs-5 text-green">
                    {/* <h1>{products.Gia || "Tên sản phẩm không có"} VND / {products.TenDonVi || "Tên Đơn Vị không có"} </h1> */}
                    <h1>
                    {/* Hiển thị thông tin giá mặc định nếu chưa chọn radio nào */}
            {selectedDetail ? (
                <p className="sanphamcogia">
                    Sản phẩm {selectedDetail.LoaiChiTiet} có giá: {new Intl.NumberFormat('vi-VN').format(selectedDetail.Gia)} VNĐ
                </p>
            ) : (
                products.Gia && products.Gia.length > 0 && (
                    <p className="sanphamcogia">
                        Sản phẩm có giá từ: {new Intl.NumberFormat('vi-VN').format(products.Gia[0].Gia)} VNĐ đến:{" "}
                        {new Intl.NumberFormat('vi-VN').format(products.Gia[products.Gia.length - 1].Gia)} VNĐ / {products.TenDonVi}
                    </p>
                )
            )}
                    </h1>
                  </div>
                
                </div>
               
                <div>
            {products.Gia && products.Gia.length > 0 && (
                <div className="radio-cards-container">
                    {products.Gia.map((detail, index) => {
                        const key = detail.ChiTietSanPhamId || index; // Sử dụng index nếu không có ChiTietSanPhamId
                        return (
                            <div className="radio-card" key={key}>
                                <input
                                    type="radio"
                                    id={`detail-${key}`} // Sử dụng key làm phần của ID
                                    name="details"
                                    className="radio-input"
                                    onChange={() => handleDetailChange(detail)}
                                />
                                <label htmlFor={`detail-${key}`} className="radio-label">
                                    <div className="radio-content">
                                        <div className="image-container">
                                            <img 
                                              src={products.HinhAnh[0]}
                                                alt={`Loại Chi Tiết: ${detail.LoaiChiTiet}`} 
                                                className="radio-image" 
                                            />
                                        </div>
                                        <div className="info-container">
                                            <h4 className="radio-title">{detail.LoaiChiTiet}</h4>
                                            <p className="radio-price">
                                                Giá: {new Intl.NumberFormat('vi-VN').format(detail.Gia)} VNĐ
                                            </p>
                                            {/* <p className="radio-quantity">Số Lượng: {detail.SoLuong}</p> */}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>



                <div className="phanloaitxt">
                  <div className="mb-3 fw-light d-flex flex-wrap align-items-center">
                    Phân loại
                    <Button
                      variant="custom"
                      className="p-1 me-2 border rounded"
                    >
                      <div className="txtphanloai">
                        <h6>{products.TenLoai || "Tên sản phẩm không có"}</h6>
                      </div>
                    </Button>
                    {/* <Button variant='custom' className='p-1 me-2 border rounded'>
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
                                        </Button> */}
                  </div>
                  {/* <div className='mb-3 fw-light d-flex flex-wrap align-items-center'>
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
                                    </div> */}
                </div>
                <div className="mb-4 fw-light">
                  <div className="d-flex">
                    <Button
                      variant="+"
                      style={{ "--bs-btn-color": "#8f8f8f" }}
                      className="border"
                      onClick={() => {
                        handlePlus();
                      }}
                    >
                      <FaPlus size={10} className="" />
                    </Button>
                    <input
                      style={{ width: "50px" }}
                      className="border rounded text-center"
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = Math.max(
                          1,
                          Math.min(99, Number(e.target.value))
                        ); // Giới hạn từ 1 đến 99
                        setQuantity(value);
                      }}
                    />
                    <Button
                      variant="-"
                      style={{
                        "--bs-btn-color": "#8f8f8f",
                        "--bs-btn-fucus-color": "red",
                      }}
                      className="border"
                      onClick={() => {
                        handleMinus();
                      }}
                    >
                      <FaMinus size={10} className="" />
                    </Button>
                  </div>
                </div>
                <div className="">
                  <Button variant="green" onClick={handleAddToCart}>
                    <FaCartPlus size={15} /> <span>Thêm vào giỏ hàng</span>
                  </Button>
                  <Button variant="danger" className="" onClick={() => {}}>
                    <span className="">Mua ngay</span>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
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
                  <h5>{products.MoTa || "Tên sản phẩm không có"}</h5>
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
                      onClick={() => {}}
                    >
                      Tất cả
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="ms-2 rounded-3 d-flex align-items-center"
                      onClick={() => {}}
                    >
                      5
                      <FaStar className="ms-1 text-warning" />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="ms-2 rounded-3 d-flex align-items-center"
                      onClick={() => {}}
                    >
                      4
                      <FaStar className="ms-1 text-warning" />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="ms-2 rounded-3 d-flex align-items-center"
                      onClick={() => {}}
                    >
                      3
                      <FaStar className="ms-1 text-warning" />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="ms-2 rounded-3 d-flex align-items-center"
                      onClick={() => {}}
                    >
                      2
                      <FaStar className="ms-1 text-warning" />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="ms-2 rounded-3 d-flex align-items-center"
                      onClick={() => {}}
                    >
                      1
                      <FaStar className="ms-1 text-warning" />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="ms-2 rounded-3 d-flex align-items-center"
                      onClick={() => {}}
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
