import React, { useCallback, useContext, useRef, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { Button, Placeholder, Table } from 'react-bootstrap';
import { InfoCartContext } from '@/containers/context/InFoCart';
import { putData } from '@/service/apiServive';
import DeleteModal from './modal/DeleteModal';

const TableGioHang = () => {
    const { cart, updateData } = useContext(InfoCartContext);
    const [quantities, setQuantities] = useState({});
    const timeoutRef = useRef();

    const handlePlus = (item) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setQuantities((prevQuantities) => {
                const newQuantity = Math.min((prevQuantities[item.SanPhamId] || item.SoLuong) + 1, 99);
                handleSubmitEdit({ ...item, SoLuong: newQuantity }); // Gọi handleSubmitEdit với số lượng mới
                return {
                    ...prevQuantities,
                    [item.SanPhamId]: newQuantity,
                };
            });
        }, 300);
    }

    const handleMinus = (item) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setQuantities((prevQuantities) => {
                const newQuantity = Math.max((prevQuantities[item.SanPhamId] || item.SoLuong) - 1, 1);
                handleSubmitEdit({ ...item, SoLuong: newQuantity }); // Gọi handleSubmitEdit với số lượng mới
                return {
                    ...prevQuantities,
                    [item.SanPhamId]: newQuantity,
                };
            });
        }, 300);
    }

    const handleSubmitEdit = async (item) => {
        const updatedQuantity = quantities[item.SanPhamId] || item.SoLuong; // Lấy số lượng mới từ state
        const sanphamToUpdate = {
            SanPhamId: item.SanPhamId,
            ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
            SoLuong: updatedQuantity,
        };
        // return console.log('check: ', sanphamToUpdate);

        try {
            await putData('/cart', sanphamToUpdate);
            return await updateData();// Gọi mutate để làm mới dữ liệu từ API

        } catch (error) {
            console.error('Error: ', error.message);
            return;
        }
    }

    // console.log('check: ', quantities);

    return (
        <>
            <h2 className='text-green mb-5'>Giỏ Hàng</h2>
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
                                    <Image className='rounded'
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
                                                const newValue = Math.max(1, Math.min(99, e.target.value)); // Giới hạn số lượng từ 1 đến 99
                                                setQuantities(prev => ({
                                                    ...prev,
                                                    [item.SanPhamId]: newValue
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
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <DeleteModal
                                            item={item}
                                            updateData={updateData}
                                        />
                                    </div>
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
        </>
    );
};

export default TableGioHang;