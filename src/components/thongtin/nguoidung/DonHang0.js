"use client"
import { useState, useEffect } from 'react';
import styles from './DonHang.module.css';
import { apiClient, checkLogintoken } from '@/service/apiServive';
import Image from 'next/image';
import DonHangStatus from './DonHangStatus';
import { Button, Col, Container, Placeholder, Row } from 'react-bootstrap';

const DonHang = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]); // State để lưu đơn hàng
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    // Hàm xử lý khi nhấn vào button
    const handleButtonClick = (status) => {
        setSelectedStatus(status); // Cập nhật trạng thái khi nút được nhấn
    };

    // Hàm gọi API lấy giỏ hàng và đơn hàng
    // Hàm gọi API lấy đơn hàng
    const fetchOrders = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            // Gọi checkLogintoken để lấy thông tin người dùng
            const loginResponse = await checkLogintoken();
            // console.log(loginResponse); // Log thông tin người dùng

            // Lấy NguoiDungId từ phản hồi của checkLogin
            if (loginResponse) {
                const userId = loginResponse.NguoiDungId; // Lưu NguoiDungId từ phản hồi
                setUserId(userId); // Lưu NguoiDungId vào state
                setUserInfo(loginResponse); // Lưu toàn bộ thông tin người dùng vào state

                // Gọi API lấy đơn hàng với NguoiDungId
                const orderResponse = await apiClient.get(`/donhang/${userId}`);
                // console.log("Thông tin đơn hàng:", orderResponse.data);
                setOrders(orderResponse.data); // Lưu đơn hàng vào state
            } else {
                console.log("Người dùng chưa đăng nhập."); // Thông báo nếu chưa đăng nhập
                setOrders([]); // Đặt đơn hàng trống nếu chưa đăng nhập
            }
        } catch (err) {
            console.error("Lỗi khi lấy đơn hàng:", err); // In ra lỗi chi tiết
            setError(err.message); // Thiết lập lỗi
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    useEffect(() => {
        fetchOrders(); // Gọi hàm khi component mount
    }, []);
    const retryFetchOrders = () => {
        fetchOrders(); // Hàm lấy danh sách đơn hàng
    };

    const statusColor = {
        '': "transparent", // Không có trạng thái
        "dangxu ly": "orange",
        'chogiaohang': '#94ff00',
        'hoantat': '#00b356',
        'danggiao': '#12e5e5',
        'huy': '#ff5757'
    };

    const statusType = {
        'dangxu ly': 'Đang sử lý',
        'chogiaohang': 'Chờ giao hàng',
        'danggiao': 'Đang giao',
        'hoantat': 'Hoàn tất',
        'huy': 'Đã hủy'
    }

    const filterOrdersByStatus = (status) => {
        // console.log('check: ', status);
        return orders.filter((order) => order.TrangThai === status);
    };

    // console.log('check: ', btnActive);

    return (
        <section>
            <Container fluid='xxl'>
                <Row>
                    <Col>
                        <div className='d-flex flex-wrap justify-content-between'>
                            <Button variant='outline-success'
                                style={{ width: '180px', maxWidth: '180px', '--bs-btn-active-bg': '#2a534f' }}
                                className='mb-2'
                                active={selectedStatus === 'all' ? true : false}
                                onClick={() => handleButtonClick("all")}
                            >
                                Tất Cả
                            </Button>
                            <Button variant='outline-success'
                                style={{ width: '180px', maxWidth: '180px', '--bs-btn-active-bg': '#2a534f' }}
                                className='mb-2'
                                active={selectedStatus === 'dangxu ly' ? true : false}
                                onClick={() => handleButtonClick("dangxu ly")}
                            >
                                Chờ Xác Nhận
                            </Button>
                            <Button variant='outline-success'
                                style={{ width: '180px', maxWidth: '180px', '--bs-btn-active-bg': '#2a534f' }}
                                className='mb-2'
                                active={selectedStatus === 'chogiaohang' ? true : false}
                                onClick={() => handleButtonClick("chogiaohang")}
                            >
                                Chờ Giao
                            </Button>
                            <Button variant='outline-success'
                                style={{ width: '180px', maxWidth: '180px', '--bs-btn-active-bg': '#2a534f' }}
                                className='mb-2'
                                active={selectedStatus === 'danggiao' ? true : false}
                                onClick={() => handleButtonClick("danggiao")}
                            >
                                Đang Giao
                            </Button>
                            <Button variant='outline-success'
                                style={{ width: '180px', maxWidth: '180px', '--bs-btn-active-bg': '#2a534f' }}
                                className='mb-2'
                                active={selectedStatus === 'hoantat' ? true : false}
                                onClick={() => handleButtonClick("hoantat")}
                            >
                                Hoàn Thành
                            </Button>
                            <Button variant='outline-success'
                                style={{ width: '180px', maxWidth: '180px', '--bs-btn-active-bg': '#2a534f' }}
                                className='mb-2'
                                active={selectedStatus === 'huy' ? true : false}
                                onClick={() => handleButtonClick("huy")}
                            >
                                Hủy
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className=''>
                            {selectedStatus === "all" && (
                                <div>
                                    <div >
                                        {loading &&
                                            <Placeholder as="p" animation="glow">
                                                <Placeholder xs={12} style={{ height: '5rem' }} className='rounded' />
                                            </Placeholder>}
                                        {error && (
                                            <div className={styles.errorContainer}>
                                                <p className={styles.errorMessage}>Đã xảy ra lỗi: {error}</p>
                                                <button className={styles.retryButton} onClick={retryFetchOrders}>
                                                    Thử lại
                                                </button>
                                            </div>
                                        )}

                                        {orders.length < 0 ? (
                                            <p className={styles.noOrders}>Không có đơn hàng nào.</p>
                                        ) : (
                                            <div className={styles.ordersList}>
                                                {orders.map((order, index) => (
                                                    <div key={index} className={styles.orderRow}>
                                                        <div className={styles.orderCard}>
                                                            <div className={styles.orderDetails}>
                                                                <h4 className={styles.orderTitle}>Đơn Hàng #{index + 1}</h4>
                                                                <div className={styles.orderDetails1}>
                                                                    <p className={styles.orderTotal}>
                                                                        <strong>Tổng Tiền:</strong> {order.TongTien}    VNĐ
                                                                    </p>
                                                                    <p className={styles.orderStatus}>
                                                                        <strong>Trạng Thái: </strong>
                                                                        <span style={{ backgroundColor: statusColor[order.TrangThai] }} className='p-1 fs-8 text-center text-white rounded'>
                                                                            {statusType[order.TrangThai]}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className={styles.orderProducts}>
                                                                {order.SanPham.map((sanPham, idx) => (
                                                                    <div key={idx} className={styles.productRow}>
                                                                        <Image
                                                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${sanPham.DuongDanHinh[0]}`}
                                                                            alt={sanPham.TenSanPham}
                                                                            width={70}
                                                                            height={70}
                                                                            objectFit="cover"
                                                                            className={styles.productImage}
                                                                        />
                                                                        <div className={styles.productText}>
                                                                            <div className={styles.productText1}>
                                                                                <p className={styles.productName}>
                                                                                    <strong>Sản phẩm:</strong> {sanPham.TenSanPham}
                                                                                </p>
                                                                                <p className={styles.productDetail}>
                                                                                    <strong>Loại Chi Tiết:</strong> {sanPham.LoaiChiTiet}
                                                                                </p>
                                                                                <p className={styles.productPrice}>
                                                                                    <strong>Giá:</strong> {sanPham.Gia} VNĐ
                                                                                </p>
                                                                                <p className={styles.productQuantity}>
                                                                                    <strong>Số Lượng:</strong> {sanPham.SoLuong}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Hiển thị nội dung cho mỗi trạng thái */}
                            <DonHangStatus
                                selectedStatus={selectedStatus}
                                filterOrdersByStatus={filterOrdersByStatus}
                                retryFetchOrders={retryFetchOrders}
                                orders={orders}
                                error={error}
                                loading={loading}
                                statusType={statusType}
                                statusColor={statusColor}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DonHang;