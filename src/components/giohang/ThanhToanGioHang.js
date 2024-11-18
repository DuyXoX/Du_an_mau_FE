import { InfoCartContext } from '@/containers/context/InFoCart';
import { postData } from '@/service/apiServive';
import React, { useContext, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import showToast from '../reuses/Toast';
import { toast } from 'react-toastify';

const ThanhToanGioHang = ({ info }) => {
    const { cart, updateData } = useContext(InfoCartContext);
    const [isAddressInputVisible, setAddressInputVisible] = useState(false);
    const [isAddressInputSDT, setAddressInputSDT] = useState(false);
    const [addressSDT, setAddressSDT] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState("");
    const [checkError, setCheckError] = useState(true);

    const totalAmount = cart?.reduce((total, item) => {
        return total + (parseInt(item.Gia.Gia) * item.SoLuong);
    }, 0);

    const handlePay = async (e) => {
        // const formData = {
        //     NguoiDungId: info.decoded?.id,
        //     TongTien: totalAmount,
        //     chiTietSanPhamList: chiTietSanPhamList
        // };

        // const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true)

        return console.log('check formData: ', info);

        try {
            const response = await postData('/donhang', formData);
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Thêm chi tiết sản phẩm mới thành công`, loading);
                    return await updateData();// Gọi mutate để làm mới dữ liệu từ API
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
    // console.log('check: ', info);

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
                                    onClick={() => handlePay(cart)}
                                // disabled={checkError}
                                >
                                    Thanh toán
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default ThanhToanGioHang;