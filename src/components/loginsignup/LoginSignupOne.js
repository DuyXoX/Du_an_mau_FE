import Image from 'next/image';
import React from 'react';
import { Col } from 'react-bootstrap';
import Logo from '@/assets/imgs/Screenshot 2023-07-29 172851.png';

const LoginSignupOne = () => {
    return (
        <Col className='d-none d-lg-block'>
            <div className='my-5 d-flex justify-content-center align-items-center'>
                <Image
                    className='w-100 h-auto'
                    src={Logo}
                    alt='Ảnh đăng nhập'
                />
            </div>
        </Col>
    );
};

export default LoginSignupOne;