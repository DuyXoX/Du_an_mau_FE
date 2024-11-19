import { InfoCartContext } from '@/containers/context/InFoCart';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";

const donhangNavigation = () => {
    const [totalQuantity, setTotalQuantity] = useState(null);
    const { cart, updateData } = useContext(InfoCartContext);

    // useEffect(() => {
    //     const count = cart?.length;
    //     count && setTotalQuantity(count)
    //     // console.log('check: ', cart);
    //     return;
    // }, [cart])

    // console.log('check: ', totalQuantity);

    return (
        <>
            <Button variant='green' className="position-relative">
                <FaUser />
                {/* {totalQuantity ?
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-light">
                        {totalQuantity}
                    </span>
                    :
                    ''
                } */}

            </Button>
        </>
    );
};

export default donhangNavigation;