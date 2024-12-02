import React from 'react';
import { Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddToCart2 = () => {
    const handleAddToCart = () => {
        toast.warning('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!', {
            onClose: () => {
                window.location.replace('/dang-nhap');
            }
        });
    }

    return (
        <Button variant="green" className='mb-2' onClick={() => handleAddToCart()}>
            <FaCartPlus size={15} /> <span>Thêm vào giỏ hàng</span>
        </Button>
    );
};

export default AddToCart2;