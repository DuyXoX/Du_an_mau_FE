import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import AddToCart from './AddToCart';
import Cookies from 'js-cookie';
import { InFoCart } from '@/containers/context/InFoCart';
import AddToCart2 from './AddToCart2';

const HeaderSanPham = ({ products }) => {
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [chiTietSanPhamId, setChiTietSanPhamId] = useState(null); // Thêm state để lưu ChiTietSanPhamId
    const sanPhamId = products ? products.SanPhamId : null; // Lấy ID sản phẩm nếu đã có dữ liệu
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const ss_account = Cookies.get('ss_account');
    const account_user = Cookies.get('account_user');

    useEffect(() => {
        if (ss_account && account_user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [ss_account, account_user]);

    const handlePlus = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99)); //Ko cho lớn hơn 99
    };

    const handleMinus = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); //Ko cho bé hơn 1
    };

    const handleDetailChange = (detail) => {
        setSelectedDetail(detail);
        setChiTietSanPhamId(detail.ChiTietSanPhamId); // Giả sử `detail` có trường ChiTietSanPhamId
    };

    return (
        <>
            {products &&
                <section>
                    <Container fluid="xxl">
                        <Row
                            style={{ "--bs-gutter-x": "none" }}
                            className="p-3 shadow-custom rounded bg-white"
                        >
                            <Col md={5}>
                                <div className="">
                                    {/* <Image
                                       src={`http://localhost:8000/api/${products.HinhAnh[0]?.replace(/\\/g, '/')}`} 
                                        alt={products.TenSanPham}
                                        width={280}
                                        height={280}
                                    // className="img-fluid"
                                    /> */}
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
                                    <div className="txtphanloai">
                                        <h6>
                                            Tên loại
                                            <span className='ms-2 fw-light'>
                                                {products.TenLoai || "Tên loại sản phẩm không có"}
                                            </span>
                                        </h6>
                                    </div>
                                    <div className="phanloaitxt">
                                        <div className="mb-3 fw-light d-flex flex-wrap align-items-center">
                                            Phân loại

                                            {/* {products.Gia && products.Gia.length > 0 && (
                                                <div className=""> */}
                                            {products.Gia?.map((detail, index) => {
                                                const key = detail.ChiTietSanPhamId || index; // Sử dụng index nếu không có ChiTietSanPhamId
                                                return (
                                                    <div className="me-1 radio-card" key={key}>
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
                                                                    {/* <Image
                                                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${products?.HinhAnh[0]?.DuongDanHinh}`}
                                                                        alt={`Loại Chi Tiết: ${detail.LoaiChiTiet}`}
                                                                        className="radio-image"
                                                                        width={180}
                                                                        height={180}
                                                                    /> */}
                                                                </div>
                                                                <div className="info-container">
                                                                    <h4 className="radio-title">{detail.LoaiChiTiet}</h4>
                                                                    <p className="radio-price">
                                                                        Giá: {new Intl.NumberFormat('vi-VN').format(detail.Gia)} VNĐ
                                                                    </p>
                                                                    <p className="radio-quantity">Số Lượng: {detail.SoLuong}</p>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
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
                                    {isAuthenticated ?
                                        <InFoCart>
                                            <AddToCart
                                                chiTietSanPhamId={chiTietSanPhamId}
                                                quantity={quantity}
                                                sanPhamId={sanPhamId}
                                            />
                                        </InFoCart>
                                        :
                                        <AddToCart2 />
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }
        </>
    );
};

export default HeaderSanPham;