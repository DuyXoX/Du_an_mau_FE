import BarChart from '@/components/chart/BarChart';
import LineChart from '@/components/chart/LineChart';
import PieChart from '@/components/chart/PieChart';
import { useGetData } from '@/service/apiServive';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const ThongKee = ({ nguoiDung, sanPham, donHang }) => {
    const hoaDonTheoTrangThai = (status) => {
        return donHang.filter(order => order.TrangThai === status);
    }

    const tongTien = hoaDonTheoTrangThai('hoantat').reduce((sum, order) => sum + parseFloat(order.TongTien), 0);

    const tongTienTheoLoai = {}; // Giả sử có thêm dữ liệu loại sản phẩm
    hoaDonTheoTrangThai('hoantat').forEach(order => {
        const loai = order.LoaiSanPham || 'Không xác định';
        tongTienTheoLoai[loai] = (tongTienTheoLoai[loai] || 0) + parseFloat(order.TongTien);
    });

    const loaiBanChayNhat = Object.entries(tongTienTheoLoai).reduce((max, [loai, tongTien]) =>
        tongTien > max.tongTien ? { loai, tongTien } : max, { loai: '', tongTien: 0 }
    );



    const sanPhamBanChay = donHang?.reduce((acc, order) => {
        // console.log('check: ', order.TrangThai);

        // order.TrangThai.forEach(sp => {
        //     acc[sp.TrangThai] = (acc[sp.TrangThai] || 0) + sp.SoLuong;
        // });
        // return acc;
    }, {});

    // const sanPhamTop = Object.entries(sanPhamBanChay).reduce((max, [ten, soLuong]) =>
    //     soLuong > max.soLuong ? { ten, soLuong } : max, { ten: '', soLuong: 0 });


    // console.log('check: ', sanPham);

    return (
        <section>
            <Container fluid>
                <div className=''>
                    <h3 className='text-green'>
                        Danh Sách Thống Kê
                    </h3>
                </div>
                <Row xs={2} sm={3} lg={6} className='g-3 mb-3'>
                    <Col>
                        <div className='p-3 text-white h-100 rounded shadow-sm bg-info'>
                            <h3 className=''>
                                {donHang.length === 0 ?
                                    0
                                    : donHang.length
                                }
                                <span className='fs-6'>
                                    {' '} Đơn hàng
                                </span>
                            </h3>
                        </div>
                    </Col>
                    <Col>
                        <div className='p-3 text-white h-100 rounded shadow-sm bg-success'>
                            <h4 className=''>
                                {donHang.length === 0 ?
                                    0
                                    : hoaDonTheoTrangThai('hoantat').length
                                }
                                <span className='fs-6'>
                                    {' '}Đơn hoàn thành
                                </span>
                            </h4>
                        </div>
                    </Col>
                    <Col>
                        <div className='p-3 text-white h-100 rounded shadow-sm bg-danger bg-opacity-75'>
                            <h4 className=''>
                                {donHang.length === 0 ?
                                    0
                                    : hoaDonTheoTrangThai('huy').length
                                }
                                <span className='fs-6'>
                                    {' '} Đơn hủy
                                </span>
                            </h4>
                        </div>
                    </Col>
                    <Col>
                        <div className='p-3 h-100 text-white rounded bg-success bg-opacity-75'>
                            <h4 className=''>
                                {nguoiDung.length === 0 ?
                                    0
                                    : nguoiDung.length
                                }
                                <span className='fs-6'>
                                    {' '} Người dùng
                                </span>
                            </h4>
                        </div>
                    </Col>
                    <Col>
                        <div className='p-3 text-white h-100 rounded shadow-sm bg-warning bg-opacity-75'>
                            <h4 className=''>
                                {sanPham?.length === 0 ?
                                    0
                                    : sanPham?.length
                                }
                                <span className='fs-6'>
                                    {' '} Sản Phẩm
                                </span>
                            </h4>
                        </div>
                    </Col>
                    <Col>
                        <div className='p-3 text-white h-100 rounded shadow-sm bg-green'>
                            <h4 className=''>
                                {donHang.length === 0 ?
                                    0
                                    : tongTien?.toLocaleString("vi-VN")
                                }
                                VNĐ
                                <span className='fs-6'>
                                    {' '} Doanh Thu
                                </span>
                            </h4>
                        </div>
                    </Col>
                </Row>

                <Row className='g-3'>
                    <Col lg>
                        <div className='p-3 h-100 rounded bg-white shadow-sm'>
                            <BarChart data={donHang} />
                        </div>
                    </Col>
                    <Col lg >
                        <div className='p-3 h-100 rounded bg-white shadow-sm'>
                            <LineChart data={donHang} />
                        </div>
                    </Col>
                    <Col xs lg={3}>
                        <div className='p-3 h-100 rounded bg-white shadow-sm'>
                            <PieChart data={donHang} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ThongKee;