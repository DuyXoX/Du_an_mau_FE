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
  useGetData,
} from "@/service/apiServive";
import Image from "next/image";
import Modal from 'react-modal';

const GioHang = () => {
  // const { data, loading, error, mutate } = useGetData('/cart');
  const [isAddressInputVisible, setAddressInputVisible] = useState(false);
  const [isAddressInputSDT, setAddressInputSDT] = useState(false);
  const [isAddressInputNAME, setAddressInputNAME] = useState(false);
  const [address, setAddress] = useState("");
  const [addressSDT, setAddressSDT] = useState("");
  const [addressname, setAddressNAME] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
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

  // const handleSelectAddressNAME = () => {
  //   setAddressInputNAME(true); // Hiện input nhập địa chỉ
  // };
  const handleAddressChangeNAME = (e) => {
    setAddressNAME(event.target.value);
  };
  const handleAddressConfirmNAME = async () => {
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
      if (addressname.trim() === "") {
        alert("Vui lòng nhập Tên Người Nhận.");
        return;
      }

      // Gọi API để lấy toàn bộ thông tin người dùng
      const userResponse = await apiClient.get(`/user/${nguoiDungId}`);
      const userData = userResponse.data; // Dữ liệu người dùng

      // console.log("Thông tin người dùng:", userData);

      // Cập nhật địa chỉ vào thông tin người dùng
      const updatedData = { ...userData, TenDangNhap: addressname };// Giữ nguyên thông tin cũ, chỉ cập nhật địa chỉ

      // Gọi API PUT để cập nhật toàn bộ thông tin người dùng (bao gồm địa chỉ)
      const response = await apiClient.put(`/user/${nguoiDungId}`, updatedData);

      // Xử lý thành công sau khi cập nhật
      // console.log("Cập nhật thông tin người dùng thành công:", response.data);
      setAddressInputNAME(false); // Ẩn input sau khi xác nhận

    } catch (error) {
      // console.error("Cập nhật địa chỉ thất bại:", error.message || error.response?.data);
      alert("Đã có lỗi xảy ra khi cập nhật địa chỉ.");
    }
  };

  const fetchCart = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      // Gọi checkLogintoken để lấy thông tin người dùng
      const loginResponse = await checkLogintoken();
      console.log(loginResponse); // Log thông tin người dùng

      // Lấy NguoiDungId từ phản hồi của checkLogin
      if (loginResponse) {
        const userId = loginResponse.NguoiDungId; // Lưu NguoiDungId từ phản hồi
        setUserId(userId); // Lưu NguoiDungId vào state
        setUserInfo(loginResponse.user); // Lưu toàn bộ thông tin người dùng vào state

        // Gọi API lấy giỏ hàng với NguoiDungId
        const response = await apiClient.get(`/cart?userId=${userId}`); // Gửi NguoiDungId trong yêu cầu
        console.log(response.data); // Kiểm tra cấu trúc dữ liệu


        // Kiểm tra và lấy thông tin sản phẩm từ phản hồi của API
        const cartItems = response.data || [];
        setCartItems(cartItems);
        console.log("Giỏ hàng trong render:", cartItems);

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




  const fetchUserData = async (userId) => {
    try {
      const response = await apiClient.get(`/user/${userId}`); // Gọi API lấy thông tin người dùng
      console.log(response.data); // In ra dữ liệu người dùng
      if (response.data) {
        setAddress(response.data.DiaChi); // Lưu địa chỉ vào state
        setAddressSDT(response.data.SoDienThoai);
        setAddressNAME(response.data.TenDangNhap);
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

  // Tính tổng số tiền
  useEffect(() => {
    const newTotalAmount = cartItems.reduce((total, item) => {
      return total + (parseInt(item.Gia.Gia) * item.SoLuong);
    }, 0);

    setTotalAmount(newTotalAmount);  // Cập nhật tổng tiền vào state
  }, [cartItems]);  // Chạy lại khi `cartItems` thay đổi

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast.warning('Vui lòng chọn phương thức thanh toán!');
      return; // Dừng lại nếu chưa chọn phương thức thanh toán
    }


    console.log("Bắt đầu quá trình thanh toán...");
    setLoading(true);

    try {
      // Kiểm tra trạng thái đăng nhập và lấy `NguoiDungId`
      const loginResponse = await checkLogintoken();
      console.log("Kết quả kiểm tra đăng nhập:", loginResponse);

      if (!loginResponse || !loginResponse.Account) {
        alert("Bạn chưa đăng nhập.");
        return;
      }

      const nguoiDungId = loginResponse?.NguoiDungId;
      if (!nguoiDungId) {
        alert("Không tìm thấy thông tin người dùng.");
        return;
      }

      // Lấy thông tin giỏ hàng
      const cartResponse = await apiClient.get(`/cart`);
      const cartData = cartResponse.data;

      if (!cartData || cartData.length === 0) {
        toast.warning("Giỏ hàng của bạn không có sản phẩm.");
        return;
      }

      const chiTietSanPhamList = cartData.map(item => ({
        SanPhamId: item.SanPhamId,
        ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
        SoLuong: item.SoLuong,
        Gia: item.Gia.Gia
      }));

      const tongTien = chiTietSanPhamList.reduce((total, item) => total + item.Gia * item.SoLuong, 0);

      if (tongTien <= 0) {
        toast.error("Tổng tiền không hợp lệ.");
        return;
      }
      if (paymentMethod === 'COD') {
        // Tạo đơn hàng mới ngay lập tức mà không cần thanh toán qua MoMo
        const orderData = {
          NguoiDungId: nguoiDungId,
          TongTien: tongTien,
          chiTietSanPhamList: chiTietSanPhamList,
          PhuongThucThanhToan: paymentMethod, // COD
        };

        try {
          // Gọi API tạo đơn hàng
          const response = await apiClient.post('/donhang', orderData);


          if (response.data.success) {
            toast.success(response.data.success);

            // Lấy DonHangId từ phản hồi, chú ý là bạn cần truy cập đúng trường
            const donhangId = response.data.donHang.DonHangId;  // Lấy DonHangId từ trường donHang
            console.log("DonHangId lấy được:", donhangId);

            if (!donhangId) {
              toast.error("Không thể lấy DonHangId. Vui lòng thử lại.");
              return;
            }

            // Thêm thông tin thanh toán vào hệ thống
            // const paymentStatus = 'dangxu ly'; // Trạng thái thanh toán là 'hoàn tất' cho phương thức COD

            const paymentData = {
              DonHangId: donhangId,
              PhuongThuc: paymentMethod, // COD
              // TrangThaiThanhToan: paymentStatus,  // Hoàn tất
            };

            // Gọi API thêm thanh toán
            const paymentResponse = await apiClient.post('/thanh-toan', paymentData);

            if (paymentResponse.data && paymentResponse.data.TrangThaiThanhToan === 'dangxu ly') {
              toast.success("Thanh toán đang được xử lý.");
            } else if (paymentResponse.data && paymentResponse.data.TrangThaiThanhToan === 'hoantat') {
              toast.success("Thanh toán đã hoàn tất.");
            } else {
              toast.error("Không thể ghi nhận thanh toán. Vui lòng thử lại.");
            }

            // Sau khi tạo đơn hàng thành công, xóa sản phẩm khỏi giỏ hàng
            const cartProductIds = cartData.map(item => ({
              SanPhamId: item.SanPhamId,
              ChiTietSanPhamId: item.Gia.ChiTietSanPhamId
            }));

            // Xóa các sản phẩm khỏi giỏ hàng
            for (let item of cartProductIds) {
              const deleteResponse = await deleteCartProduct(item.SanPhamId, item.ChiTietSanPhamId);
              if (deleteResponse && deleteResponse.status === 200) {
                console.log(`Đã xóa sản phẩm ${item.SanPhamId} khỏi giỏ hàng.`);
              } else {
                console.error(`Lỗi khi xóa sản phẩm ${item.SanPhamId} khỏi giỏ hàng.`);
              }
            }

            // Cập nhật lại giỏ hàng sau khi xóa
            fetchCart();

          } else {
            toast.error("Không thể tạo đơn hàng. Vui lòng thử lại.");
          }

        } catch (error) {
          console.error("Lỗi khi tạo đơn hàng hoặc thanh toán:", error);
          toast.error("Đã có lỗi xảy ra khi tạo đơn hàng hoặc thanh toán.");
        }
      }



      if (paymentMethod === 'Zalo Pay') {
        const items = cartData.map(item => ({
          SanPhamId: item.SanPhamId,
          TenSanPham: item.TenSanPham,
          Gia: item.Gia.TongTien,
          SoLuong: item.SoLuong,
        }));

        const zaloPaymentResponse = await apiClient.post('/paymentzalo', {
          amount: tongTien,
          orderId: `temp-${Date.now()}`,
          items: items,
        });

        if (zaloPaymentResponse.data.order_url) {
          // Lưu `app_trans_id` vào localStorage để sử dụng khi kiểm tra trạng thái thanh toán
          localStorage.setItem('app_trans_id', zaloPaymentResponse.data.app_trans_id);

          // Chuyển hướng người dùng đến trang thanh toán ZaloPay
          window.location.assign(zaloPaymentResponse.data.order_url);
        } else {
          toast.error("Không thể thanh toán qua ZaloPay.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      toast.error("Đã có lỗi xảy ra khi thanh toán.");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  // Hàm xác nhận thanh toán sau khi người dùng quay lại
  const handleReturnFromZaloPay = async () => {
    const appTransId = localStorage.getItem('app_trans_id');

    // Kiểm tra nếu không có app_trans_id, không làm gì cả
    if (!appTransId) {
      return;
    }

    try {
      // Kiểm tra trạng thái thanh toán
      const paymentConfirmationResponse = await apiClient.get(`/check-status-order/${appTransId}`);
      let trangThaiThanhToans = paymentConfirmationResponse.data.return_message || "Không rõ trạng thái";

      // Chuyển đổi trạng thái trả về thành "Hoàn tất" nếu là "Giao dịch thành công"
      if (trangThaiThanhToans === "Giao dịch thành công") {
        trangThaiThanhToans = "hoantat";
      }

      // Kiểm tra kết quả thanh toán
      if (paymentConfirmationResponse.data.return_code === 1 && paymentConfirmationResponse.data.sub_return_code === 1) {
        toast.success("Thanh toán thành công!");

        // Kiểm tra lại thông tin người dùng
        const loginResponse = await checkLogintoken();
        if (!loginResponse || !loginResponse.loggedIn) {
          toast.error("Bạn chưa đăng nhập.");
          return;
        }

        const nguoiDungId = loginResponse.user?.NguoiDungId;
        if (!nguoiDungId) {
          toast.error("Không tìm thấy thông tin người dùng.");
          return;
        }

        // Lấy thông tin giỏ hàng
        const cartResponse = await apiClient.get(`/cart`);
        const cartData = cartResponse.data;

        if (!cartData || cartData.length === 0) {
          toast.warning("Giỏ hàng của bạn không có sản phẩm.");
          return;
        }

        const chiTietSanPhamList = cartData.map(item => ({
          SanPhamId: item.SanPhamId,
          ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
          SoLuong: item.SoLuong,
          Gia: item.Gia.Gia
        }));

        const tongTien = chiTietSanPhamList.reduce((total, item) => total + item.Gia * item.SoLuong, 0);

        if (tongTien <= 0) {
          toast.error("Tổng tiền không hợp lệ.");
          return;
        }

        // Tạo đơn hàng mới
        const orderData = {
          NguoiDungId: nguoiDungId,
          TongTien: tongTien,
          chiTietSanPhamList: chiTietSanPhamList,
          PhuongThuc: "Zalo Pay",
        };

        const orderResponse = await apiClient.post('/donhang', orderData);

        if (orderResponse.data.success) {
          toast.success(orderResponse.data.success);

          const donhangId = orderResponse.data.donHang.DonHangId;

          // Gọi API thanh toán
          const paymentData = {
            DonHangId: donhangId,
            PhuongThuc: orderData.PhuongThuc || "Zalo Pay",
            TrangThaiThanhToan: trangThaiThanhToans // Sử dụng trạng thái đã chuyển đổi
          };

          const paymentResponses = await apiClient.post('/thanh-toan', paymentData);
          if (paymentResponses.data && paymentResponses.data.TrangThaiThanhToan === 'dangxu ly') {
            toast.success("Thanh toán đang được xử lý.");
          } else if (paymentResponses.data && paymentResponses.data.TrangThaiThanhToan === 'hoantat') {
            toast.success("Thanh toán đã hoàn tất.");
          } else {
            toast.error("Không thể ghi nhận thanh toán. Vui lòng thử lại.");
          }

          // Xóa sản phẩm khỏi giỏ hàng
          const cartProductIds = cartData.map(item => ({
            SanPhamId: item.SanPhamId,
            ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
          }));

          for (let item of cartProductIds) {
            const deleteResponse = await deleteCartProduct(item.SanPhamId, item.ChiTietSanPhamId);
            if (deleteResponse && deleteResponse.status === 200) {
              console.log(`Đã xóa sản phẩm ${item.SanPhamId} khỏi giỏ hàng.`);
            } else {
              console.error(`Lỗi khi xóa sản phẩm ${item.SanPhamId} khỏi giỏ hàng.`);
            }
          }

          // Cập nhật lại giỏ hàng sau khi xóa
          fetchCart();
        } else {
          toast.error("Không thể tạo đơn hàng. Vui lòng thử lại.");
        }
      } else {
        toast.error(`Thanh toán thất bại: ${trangThaiThanhToans}`);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xác nhận thanh toán.");
    } finally {
      // Chỉ xóa app_trans_id khi thanh toán đã có kết quả
      localStorage.removeItem('app_trans_id');
    }
  };





  useEffect(() => {
    fetchCart();
    handleReturnFromZaloPay();
    // Gọi hàm fetchCart khi component mount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // console.log('check: ', data);


  return (
    <section>
      <div className={styles.gioHang}>
        <div className={styles.productTable}>
          <h1>Giỏ Hàng</h1>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Thao tác</th>
                <th>Hình Ảnh</th>
                <th>Sản phẩm</th>
                <th>Tên Chi Tiết</th>
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
                        onClick={() => handleDeleteProduct(item.SanPhamId, item)}
                      >
                        Xóa
                      </button>
                    </td>
                    <td>
                      {item.DuongDanHinh && item.DuongDanHinh[0] ? (
                        <Image
                          src={`http://localhost:8000/api/${item.DuongDanHinh[0]}`}
                          alt={item.TenSanPham || "Không có tên sản phẩm"}
                          width={50}
                          height={50}
                        />
                      ) : (
                        "Không có hình ảnh"
                      )}
                    </td>
                    <td>{item.TenSanPham || "Không có tên sản phẩm"}</td>
                    <td>
                      {item.Gia.LoaiChiTiet || ""}
                    </td>
                    <td>
                      {item.Gia && item.Gia.Gia
                        ? `${parseInt(item.Gia.Gia).toLocaleString('vi-VN')} VNĐ/${item.TenDonVi || ""}`
                        : "Không có giá"}
                    </td>

                    <td>
                      <div className={styles.quantityControl}>
                        <span>{item.SoLuong || 0}</span>
                      </div>
                    </td>
                    <td>
                      {item.Gia && item.Gia.Gia
                        ? `${(parseInt(item.Gia.Gia) * item.SoLuong).toLocaleString('vi-VN')} VNĐ`
                        : "Không tính được tổng tiền"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.emptyCart}>
                    Giỏ hàng trống.
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
            <td>Người Nhận </td>
            <td>
              {isAddressInputNAME ? (
                <div className={styles.addressInputContainer}>
                  <input
                    type="text"
                    value={addressname}
                    onChange={handleAddressChangeNAME}
                    placeholder="Nhập Tên Người nhận"
                    className={styles.addressInput}
                  />

                  <button
                    // onClick={handleAddressConfirmNAME}
                    className={styles.confirmButton}
                  >
                    Xác nhận
                  </button>
                </div>
              ) : (
                <span
                  // onClick={handleSelectAddressNAME}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {addressname || "Người Nhận"}{" "}
                  {/* Sử dụng thông tin địa chỉ từ userInfo */}
                </span>
              )}
            </td>
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
              <td>Tổng Tiền:</td>
              <td className={styles.totalAmount}>
                <td>{totalAmount.toLocaleString("vi-VN")} VNĐ</td>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button className={styles.checkoutButton} onClick={handleOpenModal} disabled={loading}>
                  {loading ? "Đang xử lý..." : "Thanh toán"}
                </button>
              </td>
            </tr>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              contentLabel="Thông tin người nhận hàng"
              ariaHideApp={false}
              className={styles.modal} // Sử dụng custom style
              overlayClassName={styles.overlay}
            >
              <div className={styles.modalContent}>
                <h2 className={styles.modalHeader}>Thông tin người nhận hàng</h2>
                <div className={styles.infoSection}>
                  <p><strong>Tên người nhận:</strong> {addressname}</p>
                  <p><strong>Số điện thoại:</strong> {addressSDT}</p>
                  <p><strong>Địa chỉ:</strong> {address}</p>
                  <p><strong>Tổng Tiền :</strong> {totalAmount.toLocaleString("vi-VN")} VNĐ</p>
                </div>

                <h2 className={styles.modalHeader}>Phương Thức Thanh Toán</h2>
                <div className={styles.paymentMethods}>
                  <button
                    className={`${styles.paymentButton} ${paymentMethod === 'Zalo Pay' ? styles.paymentButtonActive : ''}`}
                    onClick={() => setPaymentMethod('Zalo Pay')}
                  >

                    ZaloPay
                  </button>
                  {/* <button
                className={`${styles.paymentButton} ${paymentMethod === 'momo' ? styles.paymentButtonActive : ''}`}
                onClick={() => setPaymentMethod('momo')}
            >
                MoMo
            </button> */}
                  <button
                    className={`${styles.paymentButton} ${paymentMethod === 'COD' ? styles.paymentButtonActive : ''}`}
                    onClick={() => setPaymentMethod('COD')}
                  >
                    Thanh toán khi nhận hàng (COD)
                  </button>
                </div>
                <div className={styles.modalActions}>


                  <button
                    onClick={handleCheckout}
                    className={styles.confirmButton}
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Xác nhận'}
                  </button>
                  <button onClick={handleCloseModal} className={styles.cancelButton}>Hủy</button>
                </div>
              </div>
            </Modal>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GioHang;