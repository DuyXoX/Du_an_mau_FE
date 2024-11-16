import React, { useState } from 'react';

const ThanhToanGioHang = () => {
    const [isAddressInputVisible, setAddressInputVisible] = useState(false);
    const [isAddressInputSDT, setAddressInputSDT] = useState(false);
    const [addressSDT, setAddressSDT] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState("");


    const handleSelectAddressSDT = () => {
        setAddressInputSDT(true); // Hiện input nhập địa chỉ
    };
    const handleAddressChangeSDT = (e) => {
        setAddressSDT(event.target.value);
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

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (parseInt(item.Gia.Gia) * item.SoLuong);
    }, 0);

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

    return (
        <table className=''>
            <tbody>
                <tr>
                    <td>
                        <h2>Thanh Toán</h2>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Tạm tính:</td>
                    {/* <td>{totalAmount.toLocaleString("vi-VN")} VNĐ</td> */}
                </tr>
                <tr>
                    <td>Địa Chỉ Giao hàng:</td>
                    <td>
                        {isAddressInputVisible ? (
                            <div className=''>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={handleAddressChange}
                                    placeholder="Nhập địa chỉ của bạn"
                                    className=''
                                />

                                <button
                                    onClick={handleAddressConfirm}
                                    className=''
                                >
                                    Xác nhận
                                </button>
                            </div>
                        ) : (
                            <span
                                onClick={handleSelectAddress}
                                style={{ cursor: "pointer", color: "blue" }}
                            >
                                {address || "Chọn Địa Chỉ"}{" "}
                                {/* Sử dụng thông tin địa chỉ từ userInfo */}
                            </span>
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Số Điện Thoại</td>
                    <td>
                        {isAddressInputSDT ? (
                            <div className=''>
                                <input
                                    type="text"
                                    value={addressSDT}
                                    onChange={handleAddressChangeSDT}
                                    placeholder="Nhập Số Điện Thoại của bạn"
                                    className=''
                                />

                                <button
                                    onClick={handleAddressConfirmSDT}
                                    className=''
                                >
                                    Xác nhận
                                </button>
                            </div>
                        ) : (
                            <span
                                onClick={handleSelectAddressSDT}
                                style={{ cursor: "pointer", color: "blue" }}
                            >
                                {addressSDT || "Chọn Số Điện Thoại"}{" "}
                                {/* Sử dụng thông tin địa chỉ từ userInfo */}
                            </span>
                        )}
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Tổng tiền:</strong>
                    </td>
                    <td>{totalAmount.toLocaleString("vi-VN")} VNĐ</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        {/* <button className={styles.checkoutButton} onClick={handleCheckout} disabled={loading}>
{loading ? "Đang xử lý..." : "Thanh toán"}
</button> */}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ThanhToanGioHang;