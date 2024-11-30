import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { FaStar, FaRegHeart, FaShoppingCart, FaHeart, } from "react-icons/fa";
import { useGetData } from '@/service/apiServive';
import { useRouter } from 'next/navigation';
import { InFoCart } from '@/containers/context/InFoCart';
import Cookies from 'js-cookie';
import AddToCart3 from './AddToCart3';
import { toast } from 'react-toastify';

const SanPhamTuongTu = () => {
    const { data } = useGetData('/sanpham')
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const ss_account = Cookies.get('ss_account');
    const account_user = Cookies.get('account_user');
    const limitedData = data ? data.slice(0, 8) : [];

    useEffect(() => {
        if (ss_account && account_user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [ss_account, account_user]);

    const handleAddToCart = () => {
        toast.warning('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!', {
            onClose: () => {
                window.location.replace('/dang-nhap');
            }
        });
    }

    // console.log('check: ', limitedData);

    return (
        <section>
            <Container fluid="xxl">
                <h4 className="mb-5 fw-bold text-green">Sản phẩm tương tự</h4>
                <Row xs={1} sm={2} lg={3} xl={4} className='gy-3'>
                    {limitedData?.map((item, idx) => (
                        <Col key={idx}>
                            <div className="">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item.HinhAnh[0]?.DuongDanHinh}`}
                                    style={{ objectFit: "cover" }}
                                    className="mb-4 w-100 shadow-custom rounded cursor"
                                    alt="Ảnh sản phẩm"
                                    width={250}
                                    height={250}
                                    onClick={() => router.push(`${item.SanPhamId}`)}
                                />
                                <div className="d-flex card-product">
                                    <Col xs={7} lg={8}>
                                        <div className="">
                                            <h6 className="text-truncate">
                                                {item.TenSanPham}
                                            </h6>
                                            <div className="price d-flex justify-content-between">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="fs-8 text-truncate text-secondary text-decoration-line-through">
                                                        {item.PhanLoai[item.PhanLoai.length - 1].Gia?.toLocaleString("vi-VN")} VNĐ
                                                    </div>
                                                    <div className="fs-8 ms-1 text-truncate">
                                                        {item.PhanLoai[0].Gia?.toLocaleString("vi-VN")} VNĐ
                                                    </div>
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
                                            {isAuthenticated ?
                                                <InFoCart>
                                                    <AddToCart3
                                                        SanPhamId={item.SanPhamId}
                                                        ChiTietSanPhamId={item.PhanLoai[0]?.ChiTietSanPhamId}
                                                    />
                                                </InFoCart>
                                                :
                                                <Button
                                                    variant="green"
                                                    style={{}}
                                                    className="border"
                                                    aria-label="Mua sản phẩm"
                                                    onClick={() => handleAddToCart()}
                                                >
                                                    <FaShoppingCart />
                                                </Button>
                                            }
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
                    ))}

                </Row>
            </Container>
        </section>
    );
};

export default SanPhamTuongTu;