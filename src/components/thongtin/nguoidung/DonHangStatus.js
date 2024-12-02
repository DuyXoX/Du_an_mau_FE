import Image from 'next/image';
import React from 'react';
import styles from './DonHang.module.css';

const DonHangStatus = ({ selectedStatus, statusType, retryFetchOrders, orders, error, loading }) => {
    // console.log('check: ', selectedStatus);


    return (
        <>
            {selectedStatus === "all" && (
                <div className={styles.contentContainer}>
                    <div className={styles.ordersContainer}>
                        {loading && <p className={styles.loadingText}>Loading...</p>}
                        {error && (
                            <div className={styles.errorContainer}>
                                <p className={styles.errorMessage}>Đã xảy ra lỗi: {error}</p>
                                <button className={styles.retryButton} onClick={retryFetchOrders}>
                                    Thử lại
                                </button>
                            </div>
                        )}


                        {orders.length === 0 ? (
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
                                                        <strong>Trạng Thái:</strong> {statusType[order.TrangThai]}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.orderProducts}>
                                                {order.SanPham.map((sanPham, idx) => (
                                                    <div key={idx} className={styles.productRow}>
                                                        <Image
                                                            src={`http://localhost:8000/api/${sanPham.DuongDanHinh[0]}`}
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
                                                            </div>
                                                            <div className={styles.productText2}>
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
        </>
    );
};

export default DonHangStatus;