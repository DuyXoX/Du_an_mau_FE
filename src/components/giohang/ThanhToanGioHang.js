import { InfoCartContext } from '@/containers/context/InFoCart';
import { postData } from '@/service/apiServive';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import showToast from '../reuses/Toast';
import { toast } from 'react-toastify';

const ThanhToanGioHang = ({ info }) => {
    const { cart, updateData } = useContext(InfoCartContext);
    const [isAddressInputVisible, setAddressInputVisible] = useState(false);
    const [isAddressInputSDT, setAddressInputSDT] = useState(false);
    const [formData, setFormData] = useState({});
    const [typePay, setTypePay] = useState('');
    const [addressSDT, setAddressSDT] = useState("");
    const [address, setAddress] = useState("");
    const [checkError, setCheckError] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        if (cart && cart.length > 0) {
            setCheckError(false);
        } else {
            setCheckError(true)
        }

    }, [cart])

    const totalAmount = cart?.reduce((total, item) => {
        return total + (parseInt(item.Gia.Gia) * item.SoLuong);
    }, 0);

    const handleClose = (() => {
        setFormData({});
        setShowAddModal(false);
        setCheckError(false);
    });

    const toogleTypePay = (e) => {
        setTypePay(e);
        setCheckError(false);
    }

    const toggleShowAddModal = (e) => {
        const chiTietSanPhamList = cart.map(item => ({
            ChiTietSanPhamId: item.Gia.ChiTietSanPhamId, // Lấy ChiTietSanPhamId từ Gia
            Gia: item.Gia.Gia, // Lấy Gia từ Gia
            SanPhamId: item.SanPhamId, // Lấy SanPhamId
            SoLuong: item.SoLuong // Lấy SoLuong
        }));

        setFormData(preData => ({
            ...preData,
            NguoiDungId: info.decoded?.id,
            TongTien: totalAmount,
            PhuongThucThanhToan: typePay,
            chiTietSanPhamList: chiTietSanPhamList
        }))
        setShowAddModal(true);
    };

    const handlePay = async () => {
        let res;
        const loading = toast.loading('Đang xử lý yêu cầu.');
        if (!typePay) {
            showToast('warning', 'Vui lòng chọn phương thức thanh toán.', loading);
            return setCheckError(true);
        }
        setCheckError(true);

        // return console.log('check formData: ', formData);

        try {
            const response = await postData('/donhang', formData);
            const { message, warning, error } = response;

            // return console.log('check response: ', response);
            const paymentData = {
                DonHangId: response.donHang?.DonHangId,
                PhuongThuc: typePay,
            };
            if (response) {
                if (message) {
                    if (typePay === 'cod') {
                        res = await postData('/thanh-toan', paymentData);
                    }
                    if (typePay === 'zalopay') {
                        const items = cart.map(item => ({
                            SanPhamId: item.SanPhamId,
                            TenSanPham: item.TenSanPham,
                            Gia: item.Gia.Gia,
                            SoLuong: item.SoLuong,
                        }));

                        res = await postData('/paymentzalo', {
                            amount: totalAmount,
                            orderId: `temp-${Date.now()}`,
                            items: items,
                        });

                        if (res.order_url) {
                            // Lưu `app_trans_id` vào localStorage để sử dụng khi kiểm tra trạng thái thanh toán
                            localStorage.setItem('app_trans_id', res.app_trans_id);

                            // Chuyển hướng người dùng đến trang thanh toán ZaloPay
                            return window.location.assign(res.order_url);
                        } else {
                            return showToast('warning', "Không thể thanh toán qua ZaloPay.", loading);
                        }
                    }
                    if (res && res.message) {
                        handleClose();
                        showToast('success', message, loading);
                        return await updateData();// Gọi mutate để làm mới dữ liệu từ API
                    }
                    return showToast('warning', 'Thanh toán thất bại.', loading);
                }
                if (warning) {
                    return showToast('warning', warning, loading);
                }
                if (error) {
                    return showToast('error', error, loading);
                }
            }
        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: 'error', isLoading: false, autoClose: 3000 });
            console.error('check error: ', error.message);
            return;
        }
    }
    // console.log('check: ', cart);

    const handleSelectAddressSDT = () => {
        setAddressInputSDT(true); // Hiện input nhập địa chỉ
    };
    const handleAddressChangeSDT = (e) => {
        setAddressSDT(e.target.value);
    };
    const handleAddressConfirmSDT = async () => {
        try {
            // Kiểm tra trạng thái đăng nhập và lấy NguoiDungId
            const loginResponse = await checkLogintoken(); // Gọi checkLogintoken để lấy thông tin người dùng
            if (!loginResponse.loggedIn) {
                alert("Bạn chưa đăng nhập.");
                return;
            }

            const nguoiDungId = loginResponse.user.NguoiDungId; // Lấy NguoiDungId từ phản hồi
            if (!nguoiDungId) {
                alert("Không tìm thấy thông tin người dùng.");
                return;
            }

            // Kiểm tra địa chỉ người dùng nhập vào
            if (addressSDT.trim() === "") {
                alert("Vui lòng nhập địa chỉ.");
                return;
            }

            // Gọi API để lấy toàn bộ thông tin người dùng
            const userResponse = await apiClient.get(`/user/${nguoiDungId}`);
            const userData = userResponse.data; // Dữ liệu người dùng

            // console.log("Thông tin người dùng:", userData);

            // Cập nhật địa chỉ vào thông tin người dùng
            const updatedData = { ...userData, SoDienThoai: addressSDT }; // Giữ nguyên thông tin cũ, chỉ cập nhật địa chỉ

            // Gọi API PUT để cập nhật toàn bộ thông tin người dùng (bao gồm địa chỉ)
            const response = await apiClient.put(`/user/${nguoiDungId}`, updatedData);

            // Xử lý thành công sau khi cập nhật
            // console.log("Cập nhật thông tin người dùng thành công:", response.data);
            setAddressInputSDT(false); // Ẩn input sau khi xác nhận

        } catch (error) {
            // console.error("Cập nhật địa chỉ thất bại:", error.message || error.response?.data);
            alert("Đã có lỗi xảy ra khi cập nhật địa chỉ.");
        }
    };

    // Nhập địa chỉ
    const handleSelectAddress = () => {
        setAddressInputVisible(true); // Hiện input nhập địa chỉ
    };

    const handleAddressChange = (e) => {
        setAddress(event.target.value);
    };

    const handleAddressConfirm = async () => {
        try {
            // Kiểm tra trạng thái đăng nhập và lấy NguoiDungId
            const loginResponse = await checkLogintoken(); // Gọi checkLogintoken để lấy thông tin người dùng
            if (!loginResponse.loggedIn) {
                alert("Bạn chưa đăng nhập.");
                return;
            }

            const nguoiDungId = loginResponse.user.NguoiDungId; // Lấy NguoiDungId từ phản hồi
            if (!nguoiDungId) {
                alert("Không tìm thấy thông tin người dùng.");
                return;
            }

            // Kiểm tra địa chỉ người dùng nhập vào
            if (address.trim() === "") {
                alert("Vui lòng nhập địa chỉ.");
                return;
            }

            // Gọi API để lấy toàn bộ thông tin người dùng
            const userResponse = await apiClient.get(`/user/${nguoiDungId}`);
            const userData = userResponse.data; // Dữ liệu người dùng

            console.log("Thông tin người dùng:", userData);

            // Cập nhật địa chỉ vào thông tin người dùng
            const updatedData = { ...userData, DiaChi: address }; // Giữ nguyên thông tin cũ, chỉ cập nhật địa chỉ

            // Gọi API PUT để cập nhật toàn bộ thông tin người dùng (bao gồm địa chỉ)
            const response = await apiClient.put(`/user/${nguoiDungId}`, updatedData);

            // Xử lý thành công sau khi cập nhật
            console.log("Cập nhật thông tin người dùng thành công:", response.data);
            setAddressInputVisible(false); // Ẩn input sau khi xác nhận

        } catch (error) {
            console.error("Cập nhật địa chỉ thất bại:", error.message || error.response?.data);
            alert("Đã có lỗi xảy ra khi cập nhật địa chỉ.");
        }
    };
    // console.log('check: ', totalAmount);

    return (
        <>
            <h2 className='text-green mb-5'>Thanh Toán</h2>
            <Table bordered>
                <tbody>
                    <tr>
                        <td>Tạm tính:</td>
                        <td>{totalAmount?.toLocaleString("vi-VN")} VNĐ</td>
                    </tr>
                    <tr>
                        <td>Địa Chỉ Giao hàng:</td>
                        <td>
                            {info.infoUser?.DiaChi}
                            {isAddressInputVisible ? (
                                <div>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={handleAddressChange}
                                        placeholder="Nhập địa chỉ của bạn"
                                        className=''
                                    />

                                    <Button variant='green'
                                        onClick={handleAddressConfirm}
                                        className=''
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            ) : (
                                <span
                                    onClick={handleSelectAddress}
                                    style={{ cursor: "pointer", color: "blue" }}
                                >
                                    {address || "Thay đổi"}{" "}
                                    {/* Sử dụng thông tin địa chỉ từ userInfo */}
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Số Điện Thoại</td>
                        <td>
                            {info.infoUser?.SoDienThoai}
                            {isAddressInputSDT ? (
                                <div className=''>
                                    <input
                                        type="text"
                                        value={addressSDT}
                                        onChange={handleAddressChangeSDT}
                                        placeholder="Nhập Số Điện Thoại của bạn"
                                        className=''
                                    />

                                    <Button variant='green'
                                        onClick={handleAddressConfirmSDT}
                                        className=''
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            ) : (
                                <span
                                    onClick={handleSelectAddressSDT}
                                    style={{ cursor: "pointer", color: "blue" }}
                                >
                                    {addressSDT || "Thay đổi"}{" "}
                                    {/* Sử dụng thông tin địa chỉ từ userInfo */}
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Tổng tiền:</strong>
                        </td>
                        <td>{totalAmount?.toLocaleString("vi-VN")} VNĐ</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >
                            <div className='d-flex justify-content-center'>
                                <Button variant='green'
                                    onClick={() => toggleShowAddModal()}
                                    disabled={checkError}
                                >
                                    Thanh toán
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal
                size='lg'
                show={showAddModal}
                onHide={() => { handleClose() }}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-orange'>Thông tin chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={6} className=''>
                            <div className=''>
                                <h5>
                                    Tên người nhận:
                                </h5>
                                <p>
                                    Số điện thoại:
                                </p>
                                <p>
                                    Địa chỉ:
                                </p>
                                <p className='bold'>
                                    Tổng Tiền:
                                </p>
                                <p>
                                    Phương thức thanh toán:
                                </p>
                            </div>
                        </Col>
                        <Col xs={6} className=''>
                            <div className=''>
                                <h5>
                                    {info.infoUser?.TenDangNhap}
                                </h5>
                                <p>
                                    {info.infoUser?.SoDienThoai}
                                </p>
                                <p>
                                    {info.infoUser?.DiaChi}
                                </p>
                                <strong>
                                    {totalAmount?.toLocaleString("vi-VN")} VNĐ
                                </strong>
                                <div className='mt-2 d-flex'>
                                    <div style={{ backgroundColor: '' }}
                                        className={`p-2 me-1 cursor border rounded ${typePay === 'zalopay' ? 'border-success' : ''}`}
                                        onClick={() => { toogleTypePay('zalopay') }}
                                    >
                                        ZaloPay
                                    </div>
                                    <div style={{ backgroundColor: '' }}
                                        className={`p-2 me-1 cursor border rounded ${typePay === 'cod' ? 'border-success' : ''}`}
                                        onClick={() => { toogleTypePay('cod') }}
                                    >
                                        Thanh toán khi nhận hàng
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => { handleClose() }}>
                        Hủy
                    </Button>
                    <Button
                        type='submit'
                        disabled={checkError}
                        variant="green"
                        onClick={() => handlePay()}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ThanhToanGioHang;