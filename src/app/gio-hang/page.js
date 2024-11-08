// import DangNhap from '@/containers/DangNhap';
"use client";
import React, { useEffect, useState } from "react";
import styles from "./giohang.module.css"; // Import CSS module (nếu có)
import { toast } from 'react-toastify';
import {
  apiClient,
  deleteCartProduct,
  checkLogintoken,
putData,
  deleteData,
} from "@/service/apiServive";

const GioHang = () => {
  // Khởi tạo state cho số lượng sản phẩm

  const [quantity, setQuantity] = useState(1);
  const [isAddressInputVisible, setAddressInputVisible] = useState(false);
  const [isAddressInputSDT, setAddressInputSDT] = useState(false);
  const [address, setAddress] = useState("");
  const [addressSDT, setAddressSDT] = useState("");
  const [someState, setSomeState] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Khai báo userId và setUserId
  const [userInfo, setUserInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  // số lượng giỏ hàng
  const handleIncrease = (sanPhamId, chiTietSanPhamId) => {
    setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.SanPhamId === sanPhamId && item.Gia.ChiTietSanPhamId === chiTietSanPhamId
                ? { ...item, SoLuong: item.SoLuong + 1 }
                : item
        )
    );
};


const handleDecrease = (sanPhamId, chiTietSanPhamId) => {
    setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.SanPhamId === sanPhamId && item.Gia.ChiTietSanPhamId === chiTietSanPhamId && item.SoLuong > 1
                ? { ...item, SoLuong: item.SoLuong - 1 }
                : item
        )
    );
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
        const userResponse = await apiClient.get(`/users/${nguoiDungId}`);
        const userData = userResponse.data; // Dữ liệu người dùng

        console.log("Thông tin người dùng:", userData);

        // Cập nhật địa chỉ vào thông tin người dùng
        const updatedData = { ...userData, DiaChi: address }; // Giữ nguyên thông tin cũ, chỉ cập nhật địa chỉ

        // Gọi API PUT để cập nhật toàn bộ thông tin người dùng (bao gồm địa chỉ)
        const response = await apiClient.put(`/users/${nguoiDungId}`, updatedData);

        // Xử lý thành công sau khi cập nhật
        console.log("Cập nhật thông tin người dùng thành công:", response.data);
        setAddressInputVisible(false); // Ẩn input sau khi xác nhận

    } catch (error) {
        console.error("Cập nhật địa chỉ thất bại:", error.message || error.response?.data);
        alert("Đã có lỗi xảy ra khi cập nhật địa chỉ.");
    }
};




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
        const userResponse = await apiClient.get(`/users/${nguoiDungId}`);
        const userData = userResponse.data; // Dữ liệu người dùng

        // console.log("Thông tin người dùng:", userData);

        // Cập nhật địa chỉ vào thông tin người dùng
        const updatedData = { ...userData, SoDienThoai: addressSDT }; // Giữ nguyên thông tin cũ, chỉ cập nhật địa chỉ

        // Gọi API PUT để cập nhật toàn bộ thông tin người dùng (bao gồm địa chỉ)
        const response = await apiClient.put(`/users/${nguoiDungId}`, updatedData);

        // Xử lý thành công sau khi cập nhật
        // console.log("Cập nhật thông tin người dùng thành công:", response.data);
        setAddressInputSDT(false); // Ẩn input sau khi xác nhận

    } catch (error) {
        // console.error("Cập nhật địa chỉ thất bại:", error.message || error.response?.data);
        alert("Đã có lỗi xảy ra khi cập nhật địa chỉ.");
    }
};
  // lấy dữ liệu giỏ hàng
  // Lấy dữ liệu giỏ hàng
  // Hàm lấy dữ liệu người dùng
  //   const fetchUserData = async (userId) => {
  //     try {
  //         const response = await apiClient.get(`/users/${userId}`); // Gọi API lấy thông tin người dùng
  //         console.log(response.data); // In ra dữ liệu người dùng
  //         if (response.data) {
  //             setAddress(response.data.DiaChi); // Lưu địa chỉ vào state
  //         }
  //         return response.data; // Trả về dữ liệu người dùng
  //     } catch (error) {
  //         console.error('Lỗi khi lấy thông tin người dùng:', error);
  //         return null; // Trả về null nếu có lỗi
  //     }
  // };

  // Hàm lấy dữ liệu giỏ hàng
  const fetchCart = async () => {
    setLoading(true); // Bắt đầu loading
    try {
        // Gọi checkLogintoken để lấy thông tin người dùng
        const loginResponse = await checkLogintoken();
        console.log(loginResponse); // Log thông tin người dùng

        // Lấy NguoiDungId từ phản hồi của checkLogin
        if (loginResponse.loggedIn) {
            const userId = loginResponse.user.NguoiDungId; // Lưu NguoiDungId từ phản hồi
            setUserId(userId); // Lưu NguoiDungId vào state
            setUserInfo(loginResponse.user); // Lưu toàn bộ thông tin người dùng vào state

            // Gọi API lấy giỏ hàng với NguoiDungId
            const response = await apiClient.get(`/cart?userId=${userId}`); // Gửi NguoiDungId trong yêu cầu
            console.log(response.data); // Kiểm tra cấu trúc dữ liệu

            // Kiểm tra và lấy thông tin sản phẩm từ phản hồi của API
            const cartItems = response.data.cart || [];
            setCartItems(cartItems);

            // Thiết lập một state riêng để lưu chi tiết từng sản phẩm nếu cần
            const productDetails = cartItems.map(item => ({
                sanPhamId: item.SanPhamId,
                chiTietSanPhamId: item.ChiTietSanPhamId,
                soLuong: item.SoLuong,
                gia: item.Gia,
                tenSanPham: item.TenSanPham,
                // Thêm các trường khác của sản phẩm ở đây nếu có
            }));

            setProductDetails(productDetails); // Lưu vào state productDetails

            // Gọi fetchUserData để lấy thông tin người dùng
            const userData = await fetchUserData(userId); // Lấy dữ liệu người dùng
            if (userData) {
                console.log("Dữ liệu người dùng:", userData); // Log dữ liệu người dùng
            }
        } else {
            console.log("Người dùng chưa đăng nhập."); // Thông báo nếu chưa đăng nhập
            setCartItems([]); // Đặt giỏ hàng trống nếu chưa đăng nhập
        }
    } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err); // In ra lỗi chi tiết
        setError(err.message); // Thiết lập lỗi
    } finally {
        setLoading(false); // Kết thúc loading
    }
};


  useEffect(() => {
    fetchCart(); // Gọi hàm fetchCart khi component mount
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`); // Gọi API lấy thông tin người dùng
      console.log(response.data); // In ra dữ liệu người dùng
      if (response.data) {
        setAddress(response.data.DiaChi); // Lưu địa chỉ vào state
        setAddressSDT(response.data.SoDienThoai);
      }
      return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      return null; // Trả về null nếu có lỗi
    }
  };
  const handleDeleteProduct = async (sanPhamId, item) => {
    const loginResponse = await checkLogintoken();
    console.log(loginResponse);
    
    if (!item || !item.Gia) {
      console.log("Dữ liệu không hợp lệ: item hoặc item.Gia không tồn tại.");
      return;
    }
  
    // Lấy ChiTietSanPhamId từ item.Gia
    const chiTietSanPhamId = item.Gia.ChiTietSanPhamId;
  
    if (!chiTietSanPhamId || !sanPhamId) {
      console.log("SanPhamId hoặc ChiTietSanPhamId không hợp lệ.");
      return;
    }
  
    // Log thông tin sản phẩm cần xóa
    console.log("Thông tin sản phẩm muốn xóa:");
    console.log("SanPhamId:", sanPhamId);
    console.log("ChiTietSanPhamId:", chiTietSanPhamId);
    console.log("Tên sản phẩm:", item.TenSanPham); // Đảm bảo `TenSanPham` tồn tại trong `item`
  
    // Xác nhận xóa sản phẩm
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
    );
  
    if (confirmDelete) {
      try {
        // Gọi hàm xóa sản phẩm từ API
        const response = await deleteCartProduct(sanPhamId, chiTietSanPhamId);
  
        // Kiểm tra kết quả trả về từ API
        if (response && response.status === 200 && response.data.message === 'Sản phẩm đã được xóa khỏi giỏ hàng.') {
          toast.success(response.data.message);  // Thông báo thành công
          fetchCart(); // Cập nhật lại giỏ hàng sau khi xóa
        } else {
          console.log("Không thể xóa sản phẩm khỏi giỏ hàng.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    } else {
      console.log("Người dùng đã hủy yêu cầu xóa.");
    }
  };
  
  
  
  
  
  
  
  
  
  
  

  // Tính tổng số tiền từ các mặt hàng trong giỏ hàng
// Tính tổng số tiền
const totalAmount = cartItems.reduce((total, item) => {
  return total + (parseInt(item.Gia.Gia) * item.SoLuong);
}, 0);


const handleCheckout = async () => {
  setLoading(true); // Bắt đầu loading

  try {
      // Kiểm tra trạng thái đăng nhập và lấy NguoiDungId từ checkLogintoken
      const loginResponse = await checkLogintoken();
      if (!loginResponse.loggedIn) {
          alert("Bạn chưa đăng nhập.");
          return;
      }

      const nguoiDungId = loginResponse.user.NguoiDungId;
      if (!nguoiDungId) {
          alert("Không tìm thấy thông tin người dùng.");
          return;
      }

      // Gọi API lấy thông tin giỏ hàng
      const cartResponse = await apiClient.get(`/cart`);
      const cartData = cartResponse.data.cart;

      // Kiểm tra nếu giỏ hàng trống
      if (!cartData || cartData.length === 0) {
        toast.warning("Giỏ hàng của bạn không có sản phẩm.");
        return;
      }

      // Tạo danh sách chi tiết sản phẩm từ giỏ hàng
      const chiTietSanPhamList = cartData.map(item => ({
          SanPhamId: item.SanPhamId,
          ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
          SoLuong: item.SoLuong,
          Gia: item.Gia.Gia
      }));

      // Tổng tiền của đơn hàng
      const tongTien = chiTietSanPhamList.reduce((total, item) => total + item.Gia * item.SoLuong, 0);

      // Đối tượng đơn hàng
      const orderData = {
          NguoiDungId: nguoiDungId,
          TongTien: tongTien,
          chiTietSanPhamList: chiTietSanPhamList
      };

      console.log("Dữ liệu gửi đi để tạo đơn hàng:", orderData);

      // Gửi yêu cầu tạo đơn hàng
      const response = await apiClient.post('/donhang', orderData);

      if (response.data.success) {
        toast.success(response.data.success); // Hiển thị thông báo thành công
 // Sau khi thanh toán thành công, xóa sản phẩm khỏi giỏ hàng
 const cartProductIds = cartData.map(item => ({
  SanPhamId: item.SanPhamId,
  ChiTietSanPhamId: item.Gia.ChiTietSanPhamId
}));

// Gọi API để xóa sản phẩm khỏi giỏ hàng
for (let item of cartProductIds) {
  const deleteResponse = await deleteCartProduct(item.SanPhamId, item.ChiTietSanPhamId);
  if (deleteResponse && deleteResponse.status === 200) {
      console.log(`Đã xóa sản phẩm ${item.SanPhamId} khỏi giỏ hàng.`);
  }
}

// Cập nhật lại giỏ hàng sau khi xóa
fetchCart(); 
       
      } else if (response.data.warning) {
        toast.warning(response.data.warning); // Hiển thị cảnh báo nếu có
      }
  } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      toast.error("Đã có lỗi xảy ra khi thanh toán."); // Hiển thị lỗi
  } finally {
      setLoading(false); // Kết thúc trạng thái loading
  }
};














  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    // <Navigation>
    <div className={styles.gioHang}>
    <div className={styles.productTable}>
    <h1>Giỏ Hàng</h1>
    <table className={styles.cartTable}>
        <thead>
            <tr>
                <th>Thao tác</th>
                <th>Hình Ảnh</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tạm Tính</th>
            </tr>
        </thead>
        <tbody>
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <tr key={`${item.SanPhamId}-${index}`}>
                                <td>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => handleDeleteProduct(item.SanPhamId , item)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                                <td>
                                    <img
                                        src={`http://localhost:8000/${item.DuongDanHinh[0]}`}
                                        alt={item.TenSanPham}
                                        className={styles.productImage}
                                    />
                                </td>
                                <td>{item.TenSanPham}</td>
                                <td>
                                    {parseInt(item.Gia.Gia).toLocaleString('vi-VN')} VNĐ /{' '}
                                    {item.TenDonVi} - {item.Gia.LoaiChiTiet}
                                </td>
                                <td>
                                    <div className={styles.quantityControl}>
                                    {/* <button onClick={() => handleDecrease(item.SanPhamId, item.Gia.ChiTietSanPhamId)}>
    -
</button> */}

                                        <span>{item.SoLuong}</span>
                                        {/* <button onClick={() => handleIncrease(item.SanPhamId, item.Gia.ChiTietSanPhamId)}>
    +
</button> */}

                                    </div>
                                </td>
                                <td>
                                    {(parseInt(item.Gia.Gia) * item.SoLuong).toLocaleString('vi-VN')} VNĐ
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className={styles.emptyCart}>
                               
                            </td>
                        </tr>
                    )}
                </tbody>
    </table>
</div>

      <table className={styles.summaryTable}>
        <tbody>
          <tr>
            <td>
              <h2>Thanh Toán</h2>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tạm tính:</td>
            <td>{totalAmount.toLocaleString("vi-VN")} VNĐ</td>
          </tr>
          <tr>
            <td>Địa Chỉ Giao hàng:</td>
            <td>
              {isAddressInputVisible ? (
                <div className={styles.addressInputContainer}>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Nhập địa chỉ của bạn"
                    className={styles.addressInput}
                  />

                  <button
                    onClick={handleAddressConfirm}
                    className={styles.confirmButton}
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
                <div className={styles.addressInputContainer}>
                  <input
                    type="text"
                    value={addressSDT}
                    onChange={handleAddressChangeSDT}
                    placeholder="Nhập Số Điện Thoại của bạn"
                    className={styles.addressInput}
                  />

                  <button
                    onClick={handleAddressConfirmSDT}
                    className={styles.confirmButton}
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
            <button className={styles.checkoutButton} onClick={handleCheckout} disabled={loading}>
            {loading ? "Đang xử lý..." : "Thanh toán"}
        </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    // </Navigation>
  );
};

export default GioHang;
