import { InfoCartContext } from '@/containers/context/InFoCart';
import { postData } from '@/service/apiServive';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import showToast from '../reuses/Toast';

const AddToCart3 = ({ SanPhamId, ChiTietSanPhamId }) => {
    const { updateData } = useContext(InfoCartContext);

    const handleAddToCart = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');

        const formData = {
            SanPhamId, // ID sản phẩm
            SoLuong: 1, // Số lượng được chọn
            ChiTietSanPhamId, // Sử dụng ChiTietSanPhamId từ state
        }
        // console.log('check: ', response);
        if (!ChiTietSanPhamId) return showToast('warning', 'Vui lòng chọn loại sản phẩm', loading);

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
        <Button
            variant="green"
            style={{}}
            className="border"
            aria-label="Mua sản phẩm"
            onClick={() => handleAddToCart()}
        >
            <FaShoppingCart />
        </Button>
    );
};

export default AddToCart3;