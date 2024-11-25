import React from 'react';
import './InputForm.scss';
import '../InputGroup.scss';
import { Col, Placeholder, Row, Table } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { useGetData } from '@/service/apiServive';

const InputFormChiTietDonHang = (formData) => {
    const DonHangId = formData.formData?.DonHangId || 0;
    const { data } = useGetData(`/quanly/donhang/${DonHangId}`)
    const donHang = data?.donHang;
    const thongTin = formData?.formData;
    const tinhTrang = donHang && donHang[donHang.length - 1];
    const thoiGianTao = donHang && donHang[donHang.length - 2]?.ThoiGiaTao;
    const getPaymentMethod = (method) => {
        if (method === 'COD') return 'Thanh Toán Khi Nhận Hàng';
        if (method === 'Zalo Pay') return 'Ví Zalo Pay';
        return method || 'Không có dữ liệu';
    };

    // console.log('check: ', thoiGianTao);

    return (
        <>
            <Table responsive bordered hover>
                <thead className='table-success'>
                    <tr>
                        <th>STT</th>
                        <th>Hình Ảnh</th>
                        <th>Sản Phẩm</th>
                        <th>Loại Chi Tiết</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {donHang && donHang.length > 0 ?
                        donHang.map((item, idx) => (
                            (item.TenSanPham && item.Gia && item.HinhAnhSanPham && item.HinhAnhSanPham[0]) ?
                                <tr key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        {item.HinhAnhSanPham && item.HinhAnhSanPham[0] ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${item.HinhAnhSanPham[0]}`}
                                                alt={item.TenSanPham || "Không có tên sản phẩm"}
                                                width={80}
                                                height={80}
                                            />
                                        ) : (
                                            "Không có hình ảnh"
                                        )}
                                    </td>
                                    <td>{item.TenSanPham}</td>
                                    <td>{item.LoaiChiTiet}</td>
                                    <td>
                                        {parseInt(item.Gia).toLocaleString('vi-VN')} VNĐ
                                    </td>
                                    <td>{item.SoLuong}</td>
                                </tr>
                                : null
                        ))
                        :
                        <tr>
                            <td colSpan="6">
                                <Placeholder animation='glow'>
                                    <Placeholder
                                        xs={12}
                                        bg="secondary"
                                        style={{ height: '3rem' }}
                                        className='rounded'
                                    />
                                </Placeholder>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
            <Row xs={4} className='justify-content-end'>
                <Col className='border-start border-end'>
                    <div className='fs-8'>
                        <p>Đơn hàng đã dặt</p>
                        <p>Tên người dùng</p>
                        <p>Số điện thoại</p>
                        <p>Địa chỉ</p>
                        <p>Tổng tiền hàng</p>
                        <p>Phương thức thanh toán</p>
                    </div>
                </Col>
                <Col>
                    <div className='fs-8'>
                        <p>{thoiGianTao}</p>
                        <p>{thongTin?.TenDangNhap}</p>
                        <p>{thongTin?.SoDienThoai}</p>
                        <p>{thongTin?.DiaChi}</p>
                        <p>{parseInt(thongTin.TongTien).toLocaleString('vi-VN')} VNĐ</p>
                        <p>{getPaymentMethod(tinhTrang?.PhuongThuc)}</p>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default InputFormChiTietDonHang;