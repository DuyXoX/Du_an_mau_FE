import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import showToast from '../reuses/Toast';
import { InfoCartContext } from '@/containers/context/InFoCart';
import { postData } from '@/service/apiServive';

const AddToCart = ({ sanPhamId, quantity, chiTietSanPhamId }) => {
    const { updateData } = useContext(InfoCartContext);

    const handleAddToCart = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');

        const formData = {
            SanPhamId: sanPhamId, // ID sản phẩm
            SoLuong: quantity, // Số lượng được chọn
            ChiTietSanPhamId: chiTietSanPhamId, // Sử dụng ChiTietSanPhamId từ state
        }
        // console.log('check: ', response);
        if (!chiTietSanPhamId) return showToast('warning', 'Vui lòng chọn loại sản phẩm', loading);

        try {
            const response = await postData("/cart", formData);
            const { message, warning, error } = response;
            // console.log('check: ', response);

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
            toast.update(loading, { render: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', type: 'warning', isLoading: false, autoClose: 3000 });
            console.error('check error: ', error.message);
            return;
        }
    };

    return (
        <div className="mb-2">
            <Button variant="green" onClick={() => handleAddToCart()}>
                <FaCartPlus size={15} /> <span>Thêm vào giỏ hàng</span>
            </Button>
            {/* <Button variant="danger" className="" onClick={() => { }}>
                    <span className="">Mua ngay</span>
                </Button> */}
        </div>
    );
};

export default AddToCart;