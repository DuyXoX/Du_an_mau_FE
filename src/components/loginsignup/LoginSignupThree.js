import React from 'react';
import { Button } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import showToast from '../reuses/Toast';

const LoginSignupThree = () => {

    const loginGoogle = () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        try {
            window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/google';
            // console.log('check NEXT_PUBLIC_API_URL: ', process.env.NEXT_PUBLIC_API_URL);

            setTimeout(() => {
                const ss_account = Cookies.get('ss_account');
                if (ss_account) {
                    return showToast('success', 'Đăng nhập thành công.', loading);
                }
                return showToast('warning', 'Đăng nhập thất bại.', loading);

            }, 2000);
        } catch (error) {
            showToast('error', 'Đăng nhập thất bại.', loading);
            console.log('Error authen Google: ', error.message);
            return;
        }
    };

    const loginFacebook = () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        try {
            window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/facebook';
            // console.log('check NEXT_PUBLIC_API_URL: ', process.env.NEXT_PUBLIC_API_URL);
            setTimeout(() => {
                const ss_account = Cookies.get('ss_account');
                if (ss_account) {
                    return showToast('success', 'Đăng nhập thành công.', loading);
                }
                return showToast('warning', 'Đăng nhập thất bại.', loading);

            }, 2000);

        } catch (error) {
            showToast('error', 'Đăng nhập thất bại.', loading);
            console.log('Error authen Google: ', error.message);
            return;
        }
        // console.log('submit facebook');
    };

    return (
        <div className='d-flex justify-content-center'>
            <Button
                style={{ minWidth: '150px' }}
                className='me-3'
                variant='light'
                onClick={() => { loginGoogle() }}
            >
                <FcGoogle className='fs-3 me-2' />
                Google
            </Button>
            <Button
                style={{ minWidth: '150px' }}
                className=''
                variant='primary'
                onClick={() => { loginFacebook() }}
            >
                <FaFacebookF className='fs-4 me-2' />
                Facebook
            </Button>
        </div>
    );
};

export default LoginSignupThree;