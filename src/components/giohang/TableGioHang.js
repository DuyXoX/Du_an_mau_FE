import React, { useContext, useState } from 'react';
import { FaMinus, FaPen, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import { Button, Placeholder, Table } from 'react-bootstrap';
import { InfoCartContext } from '@/containers/context/InFoCart';
import { deleteData, putData } from '@/service/apiServive';
import showToast from '../reuses/Toast';
import { toast } from 'react-toastify';

const TableGioHang = () => {
    const { cart, updateData } = useContext(InfoCartContext);
    const [quantities, setQuantities] = useState({});

    const handlePlus = (item) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.SanPhamId]: Math.min((prevQuantities[item.SanPhamId] || item.SoLuong) + 1, 99),
        }));
    };

    const handleMinus = (item) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.SanPhamId]: Math.max((prevQuantities[item.SanPhamId] || item.SoLuong) - 1, 1),
        }));
    };

    const handleSubmitEdit = async (item) => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        const updatedQuantity = quantities[item.SanPhamId] || item.SoLuong; // Lấy số lượng mới từ state
        const sanphamToUpdate = {
            SanPhamId: item.SanPhamId,
            ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
            SoLuong: updatedQuantity,
        };
        // return console.log('check: ', sanphamToUpdate);

        try {
            const response = await putData('/cart', sanphamToUpdate);
            const { message, warning, error } = response;
            // return console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', message, loading);
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
            console.error('Error: ', error.message);
            return;
        }
    }

    const handleDelete = async (item) => {
        const sanphamToUpdate = {
            SanPhamId: item.SanPhamId,
            ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
        };
        try {
            await deleteData(`/${sanphamToUpdate.SanPhamId}/${sanphamToUpdate.ChiTietSanPhamId}`, sanphamToUpdate);
            await updateData();
        } catch (error) {
            console.error('Error: ', error.message);
            return;
        }
    }
    // console.log('check: ', quantities);

    return (
        <>
            <div className=''>
                <h1 className='text-green'>Giỏ Hàng</h1>
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hình Ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tạm Tính</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart ?
                            cart.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.DuongDanHinh[0]}`}
                                            alt={cart[0]?.TenSanPham}
                                            width={80}
                                            height={80}
                                        />
                                    </td>
                                    <td>{item.TenSanPham}</td>
                                    <td>
                                        {parseInt(item.Gia.Gia).toLocaleString('vi-VN')} VNĐ /{' '}
                                        {item.TenDonVi} - {item.Gia.LoaiChiTiet}
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <Button
                                                variant="+"
                                                style={{ "--bs-btn-color": "#8f8f8f" }}
                                                className="border"
                                                onClick={() => handlePlus(item)}
                                            >
                                                <FaPlus size={10} className="" />
                                            </Button>
                                            <input
                                                style={{ width: "50px" }}
                                                className="border rounded text-center"
                                                type="number"
                                                value={quantities[item.SanPhamId] || item.SoLuong}
                                                onChange={(e) => {
                                                    const value = Math.max(
                                                        1,
                                                        Math.min(99, Number(e.target.value))
                                                    ); // Giới hạn từ 1 đến 99
                                                    setQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        [item.SanPhamId]: value,
                                                    }));
                                                }}
                                            />
                                            <Button
                                                variant="-"
                                                style={{ "--bs-btn-color": "#8f8f8f", "--bs-btn-fucus-color": "red" }}
                                                className="border"
                                                onClick={() => handleMinus(item)}
                                            >
                                                <FaMinus size={10} className="" />
                                            </Button>
                                        </div>
                                        <div className='pt-1 d-flex justify-content-center'>
                                            <Button variant='green'
                                                onClick={() => handleSubmitEdit(item)}
                                            >
                                                Xác nhận
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        {(parseInt(item.Gia.Gia) * item.SoLuong).toLocaleString('vi-VN')} VNĐ
                                    </td>
                                    <td className='d-flex'>
                                        <Button variant="outline-info"
                                            style={{ '--bs-btn-hover-color': 'white', '--bs-btn-active-color': 'light' }}
                                            className='me-1 rounded-pill'
                                        >
                                            <FaPen />
                                        </Button>
                                        <Button variant="outline-danger"
                                            className='rounded-pill'
                                            onClick={() => handleDelete(item)}
                                        >
                                            <FaRegTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan="7">
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
            </div>
        </>
    );
};

export default TableGioHang;