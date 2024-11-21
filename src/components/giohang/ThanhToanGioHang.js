import { InfoCartContext } from '@/containers/context/InFoCart';
import { postData, putData, useGetData } from '@/service/apiServive';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import showToast from '../reuses/Toast';
import { toast } from 'react-toastify';

const ThanhToanGioHang = ({ info }) => {
    const { data, isLoading, error, mutate } = useGetData(`/user/${info.decoded?.id}`);
    const { cart, updateData } = useContext(InfoCartContext);
    const [isAddressInputVisible, setAddressInputVisible] = useState(false);
    const [isAddressInputSDT, setAddressInputSDT] = useState(false);
    const [formData, setFormData] = useState({});
    const [typePay, setTypePay] = useState('');
    const [SDT, setSDT] = useState("");
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

    const handleSelectAddressSDT = () => {
        setAddressInputSDT(true); // Hiện input nhập địa chỉ
    };

    const toogleSDT = (e) => {
        setSDT(e.target.value);
    };

    const handleUpdateSDT = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setAddressInputSDT(false);

        try {
            const response = await putData('/user/update/sdt', { SoDienThoai: SDT });
            const { message, warning, error } = response;

            if (response) {
                if (message) {
                    showToast('success', `Điều chỉnh thông tin thành công.`, loading);
                    return await mutate();// Gọi mutate để làm mới dữ liệu từ API
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
            console.error('check error: ', error);
            return;
        }
    };

    // Nhập địa chỉ
    const handleSelectAddress = () => {
        setAddressInputVisible(true); // Hiện input nhập địa chỉ
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAddressConfirm = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setAddressInputVisible(false);

        try {
            const response = await putData('/user/update/diachi', { DiaChi: address });
            const { message, warning, error } = response;

            if (response) {
                if (message) {
                    showToast('success', `Điều chỉnh thông tin thành công.`, loading);
                    return await mutate();// Gọi mutate để làm mới dữ liệu từ API
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
            console.error('check error: ', error);
            return;
        }
    };
    // console.log('check: ', address);

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
                            {data?.DiaChi}
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
                                    className='ps-1 text-primary cursor'
                                >
                                    Thay đổi
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Số Điện Thoại</td>
                        <td>
                            {data?.SoDienThoai}
                            {isAddressInputSDT ? (
                                <div className=''>
                                    <input
                                        type="number"
                                        value={SDT}
                                        onChange={toogleSDT}
                                        placeholder="Nhập Số Điện Thoại của bạn"
                                        className=''
                                    />

                                    <Button variant='green'
                                        onClick={handleUpdateSDT}
                                        className=''
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            ) : (
                                <span
                                    onClick={handleSelectAddressSDT}
                                    className='ps-1 text-primary cursor'
                                >
                                    Thay đổi
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
                                    {data?.TenDangNhap}
                                </h5>
                                <p>
                                    {data?.SoDienThoai}
                                </p>
                                <p>
                                    {data?.DiaChi}
                                </p>
                                <strong>
                                    {totalAmount?.toLocaleString("vi-VN")} VNĐ
                                </strong>
                                <div className='mt-2 d-flex'>
                                    <div style={{ backgroundColor: '' }}
                                        className={`p-2 me-1 cursor border rounded ${typePay === 'zalopay' ? 'text-white bold bg-info' : ''}`}
                                        onClick={() => { toogleTypePay('zalopay') }}
                                    >
                                        ZaloPay
                                    </div>
                                    <div style={{ backgroundColor: '' }}
                                        className={`p-2 me-1 cursor border rounded ${typePay === 'cod' ? 'bold border-success' : ''}`}
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