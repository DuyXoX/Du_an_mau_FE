import React from 'react';
import { Button } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import showToast from '../reuses/Toast';

const LoginSignupThree = () => {

    const loginGoogle = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
            // console.log('check NEXT_PUBLIC_API_URL: ', process.env.NEXT_PUBLIC_API_URL);
        } catch (error) {
            showToast('error', 'Đăng nhập thất bại.', loading);
            console.log('Error authen Google: ', error.message);
            return;
        }
    };

    return (
        <div className='d-flex justify-content-center'>
            <Button
                style={{ minWidth: '150px' }}
                className='me-3'
                variant='light'
                onClick={() => loginGoogle()}
            >
                <FcGoogle className='fs-3 me-2' />
                Google
            </Button>
        </div>
    );
};

export default LoginSignupThree;