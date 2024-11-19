"use client"
import { useState, useEffect } from 'react';
import styles from './DonHang.module.css';
import {apiClient , checkLogintoken} from '@/service/apiServive';
import Image from 'next/image';
const DonHang = () => {
    const [selectedStatus, setSelectedStatus] = useState('Tất Cả');
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
      console.log(loginResponse); // Log thông tin người dùng

      // Lấy NguoiDungId từ phản hồi của checkLogin
      if (loginResponse.loggedIn) {
        const userId = loginResponse.user.NguoiDungId; // Lưu NguoiDungId từ phản hồi
        setUserId(userId); // Lưu NguoiDungId vào state
        setUserInfo(loginResponse.user); // Lưu toàn bộ thông tin người dùng vào state

        // Gọi API lấy đơn hàng với NguoiDungId
        const orderResponse = await apiClient.get(`/donhang/${userId}`);
        console.log("Thông tin đơn hàng:", orderResponse.data);
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
  
  const filterOrdersByStatus = (status) => {
    return orders.filter((order) => order.TrangThai === status);
  };
  
  const filteredOrdersDangXuLy = filterOrdersByStatus('dangxu ly');
  const filteredOrdersChoGiaoHang = filterOrdersByStatus('Chờ Giao Hàng');
  const filteredOrdersDangGiao = filterOrdersByStatus('Đang Giao');
  const filteredOrdersHoanThanh = filterOrdersByStatus('Hoàn Thành');
  const filteredOrdersHuy = filterOrdersByStatus('Hủy');
    return (
      <div className={styles.DonHang}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleButtonClick("Tất Cả")}
          >
            Tất Cả
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick("Chờ Xác Nhận")}
          >
            Chờ Xác Nhận
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick("Chờ Giao")}
          >
            Chờ Giao
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick("Đang Giao")}
          >
            Đang Giao
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick("Hoàn Thành")}
          >
            Hoàn Thành
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick("Hủy")}
          >
            Hủy
          </button>
        </div>

        {/* Hiển thị nội dung cho mỗi trạng thái */}
{selectedStatus === "Tất Cả" && (
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
                    <strong>Tổng Tiền:</strong> {order.TongTien}    VND
                  </p>
                  <p className={styles.orderStatus}>
                    <strong>Trạng Thái:</strong> {order.TrangThai}
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
                          <strong>Giá:</strong> {sanPham.Gia} VND
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

{selectedStatus === "Chờ Xác Nhận" && (
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

      {filteredOrdersDangXuLy.length === 0 ? (
        <p className={styles.noOrders}>Không có đơn hàng nào chờ xác nhận.</p>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrdersDangXuLy.map((order, index) => {
            const {
              TrangThai,
              TongTien,
            } = order;

            return (
              <div key={index} className={styles.orderRow}>
                <div className={styles.orderCard}>
                  <div className={styles.orderDetails}>
                    <h4 className={styles.orderTitle}>Đơn Hàng #{index + 1}</h4>
                    <div className={styles.orderDetails1}>
                      <p className={styles.orderTotal}>
                        <strong>Tổng Tiền:</strong> {TongTien} VND
                      </p>
                      <p className={styles.orderStatus}>
                        <strong>Trạng Thái:</strong> {TrangThai}
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
                          <strong>Giá:</strong> {sanPham.Gia} VND
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
            );
          })}
        </div>
      )}
    </div>
  </div>
)}

{selectedStatus === "Chờ Giao" && (
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

      {filteredOrdersChoGiaoHang.length === 0 ? (
        <p className={styles.noOrders}>Không có đơn hàng nào đang Chờ Giao.</p>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrdersChoGiaoHang.map((order, index) => {
            const {
              TrangThai,
              TongTien,
            } = order;

            return (
              <div key={index} className={styles.orderRow}>
                <div className={styles.orderCard}>
                  <div className={styles.orderDetails}>
                    <h4 className={styles.orderTitle}>Đơn Hàng #{index + 1}</h4>
                    <div className={styles.orderDetails1}>
                      <p className={styles.orderTotal}>
                        <strong>Tổng Tiền:</strong> {TongTien} VND
                      </p>
                      <p className={styles.orderStatus}>
                        <strong>Trạng Thái:</strong> {TrangThai}
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
                          <strong>Giá:</strong> {sanPham.Gia} VND
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
            );
          })}
        </div>
      )}
    </div>
  </div>
)}

{selectedStatus === "Đang Giao" && (
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

      {filteredOrdersDangGiao.length === 0 ? (
        <p className={styles.noOrders}>Không có đơn hàng nào đang xử lý.</p>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrdersDangGiao.map((order, index) => {
            const {
              TrangThai,
              TongTien,
            } = order;

            return (
              <div key={index} className={styles.orderRow}>
                <div className={styles.orderCard}>
                  <div className={styles.orderDetails}>
                    <h4 className={styles.orderTitle}>Đơn Hàng #{index + 1}</h4>
                    <div className={styles.orderDetails1}>
                      <p className={styles.orderTotal}>
                        <strong>Tổng Tiền:</strong> {TongTien} VND
                      </p>
                      <p className={styles.orderStatus}>
                        <strong>Trạng Thái:</strong> {TrangThai}
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
                          <strong>Giá:</strong> {sanPham.Gia} VND
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
            );
          })}
        </div>
      )}
    </div>
  </div>
)}

{selectedStatus === "Hoàn Thành" && (
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

      {filteredOrdersHoanThanh.length === 0 ? (
        <p className={styles.noOrders}>Không có đơn hàng nào Hoàn Thành.</p>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrdersHoanThanh.map((order, index) => {
            const {
              TrangThai,
              TongTien,
            } = order;

            return (
              <div key={index} className={styles.orderRow}>
                <div className={styles.orderCard}>
                  <div className={styles.orderDetails}>
                    <h4 className={styles.orderTitle}>Đơn Hàng #{index + 1}</h4>
                    <div className={styles.orderDetails1}>
                      <p className={styles.orderTotal}>
                        <strong>Tổng Tiền:</strong> {TongTien} VND
                      </p>
                      <p className={styles.orderStatus}>
                        <strong>Trạng Thái:</strong> {TrangThai}
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
                          <strong>Giá:</strong> {sanPham.Gia} VND
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
            );
          })}
        </div>
      )}
    </div>
  </div>
)}

{selectedStatus === "Hủy" && (
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

      {filteredOrdersHuy.length === 0 ? (
        <p className={styles.noOrders}>Không có đơn hàng nào Hủy.</p>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrdersHuy.map((order, index) => {
            const {
              TrangThai,
              TongTien,
            } = order;

            return (
              <div key={index} className={styles.orderRow}>
                <div className={styles.orderCard}>
                  <div className={styles.orderDetails}>
                    <h4 className={styles.orderTitle}>Đơn Hàng #{index + 1}</h4>
                    <div className={styles.orderDetails1}>
                      <p className={styles.orderTotal}>
                        <strong>Tổng Tiền:</strong> {TongTien} VND
                      </p>
                      <p className={styles.orderStatus}>
                        <strong>Trạng Thái:</strong> {TrangThai}
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
                          <strong>Giá:</strong> {sanPham.Gia} VND
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
            );
          })}
        </div>
      )}
    </div>
  </div>
)}

      </div>
    );
};

export default DonHang;
