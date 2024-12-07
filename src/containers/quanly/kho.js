'use client';

import React from 'react';
import { useGetData } from "@/service/apiServive";

const Kho = ({}) => {
    const { data, isLoading, error } = useGetData('/chitietsp'); // Gọi API



    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error.message}</p>;


    return (
        
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
          height: '100%', // Chiều cao toàn màn hình
         
        }}
      >
        <div
          style={{
            backgroundColor: 'white', // Màu nền bên trong (nếu cần)
            width:'1100px',
            padding: '20px', // Khoảng cách giữa bảng và viền ngoài
            borderRadius: '8px', // Góc bo tròn (tuỳ chọn)
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng (tuỳ chọn)
            textAlign:'center',
          }}
        >
      <table className="table table-bordered">
    <thead>
        <tr>
            <th>#</th>
           
            <th>Tên Sản Phẩm</th>
         
            <th>Giá</th>
            <th>Số lượng</th>
          
        </tr>
    </thead>
    <tbody>
        {data?.data?.map((item, index) => (
            <tr key={item.ChiTietSanPhamId}>
                <td>{index + 1}</td>
             
                <td>{item.LoaiChiTiet || 'Không xác định'}</td>
                <td>{Number(item.Gia).toLocaleString()} VND</td>
                <td>{item.SoLuong}.{item.SanPham?.DonViTinh?.TenDonVi}</td>
              
            </tr>
        ))}
    </tbody>
</table>

        </div>
      </div>
      
      
      
      
    );
};

export default (Kho);