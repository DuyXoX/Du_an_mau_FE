'use client'

import React, { memo, useState, useEffect } from 'react';
import styles from './DonHang.module.css';
import { useGetData, apiClient } from '@/service/apiServive';
import Image from "next/image";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const DonHangT = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const { data: orders, error, isLoading } = useGetData('/donhangall');
    const [orderDetails, setOrderDetails] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState({ PhuongThuc: '', TrangThaiThanhToan: '' });
    const [DonHangId, setDonHangId] = useState();
    const [status, setStatus] = useState('');  // Để lưu trạng thái hiện tại
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Mở modal
    // Hàm mở modal và gọi API
    const openModal = (DonHangId) => {
        setDonHangId(DonHangId); // Lưu DonHangId vào state
        setIsModalOpen(true); // Mở modal
        fetchOrderDetails(DonHangId);
    };
    // Hàm chuyển đổi phương thức thanh toán
    const getPaymentMethod = (method) => {
        if (method === 'COD') return 'Thanh Toán Khi Nhận Hàng';
        return method || 'Không có dữ liệu';
    };
    // Đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Hàm cập nhật trạng thái khi người dùng thay đổi dropdown
    const handleStatusChange = (e) => {
        setStatus(e.target.value);  // Cập nhật giá trị trong state
    };
    // Hàm gọi API lấy danh sách đơn hàng
    const fetchOrders = async () => {
        setIsLoading(true);  // Bắt đầu loading
        try {
            const response = await apiClient.get('/donhangall');  // Gọi API lấy tất cả đơn hàng
            if (response.data) {
                setOrders(response.data);  // Lưu dữ liệu đơn hàng vào state
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        } finally {
            setIsLoading(false);  // Kết thúc loading
        }
    };
    // Hàm lấy chi tiết đơn hàng
    // Hàm gọi API lấy chi tiết đơn hàng
    const fetchOrderDetails = async (DonHangId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/quanly/donhang/${DonHangId}`);
            if (!response.ok) {
                console.error(`Lỗi HTTP: ${response.status} - ${response.statusText}`);
                return;
            }
            const data = await response.json();
            if (data.success) {
                const paymentInfo = data.donHang[data.donHang.length - 1];
                setPaymentInfo(paymentInfo);
                setOrderDetails(data.donHang);
            } else {
                console.error(data.message || 'Không tìm thấy đơn hàng');
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        }
    };


    // Khi load lần đầu, lấy thông tin đơn hàng
    useEffect(() => {
        fetchOrders();

    }, []);

    // Hàm xác nhận và cập nhật trạng thái
    const handleConfirmClick = async () => {
        if (!status) {
            alert('Vui lòng chọn trạng thái đơn hàng');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/donhang/${DonHangId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ TrangThai: status }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Trạng thái đơn hàng đã được cập nhật:', data);
                toast.success('Cập nhật trạng thái thành công!');

                // Set reloadData thành true để gọi lại API và làm mới dữ liệu
                fetchOrders();
            } else {
                const errorData = await response.json();
                console.error('Lỗi khi cập nhật trạng thái:', errorData);
                toast.warning('Cập nhật trạng thái không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            toast.warning('Đã xảy ra lỗi khi cập nhật trạng thái');
        }
    };


    if (error) return <p>Có lỗi xảy ra khi lấy dữ liệu đơn hàng: {error}</p>;
    if (!orders.length) return <p>Không có đơn hàng nào</p>;

    return (
        <div className={styles.containerOrderManagement}>
            <h2 className={styles.headingOrderManagement}>Quản Lý Đơn Hàng</h2>
            <table className={styles.tableOrderList}>
                <thead>
                    <tr>
                        <th className={styles.tableHeaderCell}> ID</th>
                        <th className={styles.tableHeaderCell}>Tên Người Dùng</th>
                        <th className={styles.tableHeaderCell}>Địa chỉ</th>
                        <th className={styles.tableHeaderCell}>Số điện thoại</th>
                        <th className={styles.tableHeaderCell}>Tổng tiền</th>
                        <th className={styles.tableHeaderCell}>Trạng Thái</th>
                        <th className={styles.tableHeaderCell}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order.DonHangId} className={index % 2 === 0 ? styles.tableRowEven : ''}>
                                <td className={styles.tableDataCell}>{order.DonHangId}</td>
                                <td className={styles.tableDataCell}>{order.TenDangNhap}</td>
                                <td className={styles.tableDataCell}>{order.DiaChi}</td>
                                <td className={styles.tableDataCell}>{order.SoDienThoai}</td>
                                <td className={styles.tableDataCell}>
                                    {order.TongTien.toLocaleString()} VND
                                </td>
                                <td className={styles.tableDataCell}>{order.TrangThai}</td>
                                <td className={styles.tableDataCell}>
                                    <button
                                        className={styles.buttonOrderView}
                                        onClick={() => openModal(order.DonHangId)}
                                    >
                                        Xem chi tiết
                                    </button>
                                    {/* <button className={styles.buttonOrderDelete}>Xóa</button> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className={styles.tableDataCell}>Không có đơn hàng nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Chi tiết đơn hàng"
                overlayClassName={styles.modalOverlay}  // Overlay style class
                className={styles.modalContent}  // Content style class
            >
                <h2>Chi tiết đơn hàng</h2>

                <div className={styles.modalBody}>
                    <div className={styles.tableWrapper}>
                        <div className={styles.pay}>
                            <h5>Phương Thức Thanh Toán</h5>
                            <p>{getPaymentMethod(paymentInfo?.PhuongThuc)}</p>

                            <h5>Trạng Thái</h5>
                            <p>{paymentInfo?.TrangThaiThanhToan || 'Không có dữ liệu'}</p>
                        </div>
                        <table className={styles.orderTable}>

                            <thead>
                                <tr>
                                    <th>Hình Ảnh</th>
                                    <th>Sản phẩm</th>
                                    <th>Loại chi tiết</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(orderDetails) && orderDetails.length > 0 ? (
                                    orderDetails.map((item) => (
                                        (item.TenSanPham && item.Gia && item.HinhAnhSanPham && item.HinhAnhSanPham[0]) ? (
                                            <tr key={`${item.SanPhamId}`}>
                                                <td>
                                                    {item.HinhAnhSanPham && item.HinhAnhSanPham[0] ? (
                                                        <Image
                                                            src={`http://localhost:8000/api/${item.HinhAnhSanPham[0]}`}
                                                            alt={item.TenSanPham || "Không có tên sản phẩm"}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    ) : (
                                                        "Không có hình ảnh"
                                                    )}
                                                </td>
                                                <td>{item.TenSanPham}</td>
                                                <td>{item.LoaiChiTiet || "Không có loại chi tiết"}</td>
                                                <td>{item.Gia} VND</td>
                                                <td>{item.SoLuong || 0}</td>

                                            </tr>
                                        ) : null
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>Không có sản phẩm nào trong đơn hàng.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.modalActions}>
                        <button className={styles.closeModal} onClick={closeModal}>Đóng</button>
                        <div className={styles.statusContainer}>
                            <h5>Chọn Trạng Thái Đơn Hàng</h5>
                            <select
                                className={styles.statusSelect}
                                value={status}
                                onChange={handleStatusChange}
                            >
                                <option value="dangxu ly">Đang Xử Lý</option>
                                <option value="Chờ Giao Hàng">Chờ Giao Hàng</option>
                                <option value="Đang Giao">Đang Giao</option>
                                <option value="Hoàn Thành">Hoàn Thành</option>
                                <option value="Hủy">Hủy</option>
                            </select>


                        </div>
                        <button
                            className={styles.confirmButton}
                            onClick={handleConfirmClick}
                        >
                            Xác Nhận
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default DonHangT;