import { InfoCartContext } from '@/containers/context/InFoCart';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const GioHangNavigation = () => {
    const [totalQuantity, setTotalQuantity] = useState(null);
    const { cart } = useContext(InfoCartContext);

    useEffect(() => {
        if (Array.isArray(cart)) { // Kiểm tra xem cart có phải là một mảng không
            const count = cart.length; // Lấy độ dài của mảng
            setTotalQuantity(count > 0 ? count : 0); // Nếu có dữ liệu, cập nhật totalQuantity, nếu không thì 0
        }
        // console.log('check: ', cart);
        return;
    }, [cart])

    // console.log('check: ', totalQuantity);

    return (
        <>
            <Button variant='green' className="position-relative">
                <FaShoppingCart />
                {totalQuantity > 0 ?
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-light">
                        {totalQuantity}
                    </span>
                    :
                    ''
                }

            </Button>
        </>
    );
};

export default GioHangNavigation;