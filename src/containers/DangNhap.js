'use client'
import LoginSignup from '@/components/loginsignup/LoginSignup';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { setCookie } from '@/components/reuses/Cookie';
import showToast from '@/components/reuses/Toast';
import { postData } from '@/service/apiServive';

const DangNhap = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(true);
    const router = useRouter();
    const ss_account = Cookies.get('ss_account');

    useEffect(() => {
        if (ss_account) {
            router.push('/thong-tin/nguoi-dung');
            return;
        }
    }, [router, ss_account]);

    const [formData, setFormData] = useState({
        Account: '',
        MatKhau: '',
    });

    const [errors, setErrors] = useState({
        Account: '',
        MatKhau: '',
    });

    const [checkError, setCheckError] = useState(true);

    const validate = (name, value) => {
        switch (name) {
            case 'Account':
                if (!value) {
                    return 'Vui lòng nhập tài khoản của bạn';
                } else if (value.length < 8) {
                    return 'Tài khoản phải có ít nhất 8 ký tự';
                } else if (value.length > 50) {
                    return 'Tài khoản không thể dài hơn 50 ký tự';
                } else {
                    return '';
                }
            case 'MatKhau':
                if (!value) {
                    return 'Vui lòng nhập mật khẩu của bạn';
                } else if (value.length < 8) {
                    return 'Mật khẩu phải có ít nhất 8 ký tự';
                } else if (value.length > 20) {
                    return 'Mật khẩu không thể dài hơn 20 ký tự';
                }
                else {
                    return '';
                }
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        const newErrors = {
            ...errors,
            [name]: validate(name, value),
        };

        setErrors(newErrors);

        // Kiểm tra nếu không có lỗi nào thì cập nhật checkError thành false
        if (Object.values(newErrors).every((error) => error === '')) {
            setCheckError(false);
        } else {
            setCheckError(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            formErrors[key] = validate(key, formData[key]);
        });

        if (Object.values(formErrors).some((error) => error !== '')) {
            setErrors(formErrors);
            // console.log('check formErrors', formErrors);
            return;
        }
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true)

        try {
            const response = await postData('/login', formData);
            const { message, warning, error, ss_account, account_user, address_user } = response;

            // console.log('check response: ', ss_account);

            if (response && message) {
                setCookie('ss_account', ss_account);
                setCookie('account_user', account_user);

                showToast('success', message, loading);
                setTimeout(() => {
                    return window.location.replace('/')
                }, 2000);
            }
            if (response && warning) {
                showToast('warning', warning, loading);
                return;
            }
            if (response && error) {
                showToast('error', error, loading);
                return;
            }

        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: "error", isLoading: false, autoClose: 3000 });
            console.error('check error: ', error.message);
            return;
        }
    };

    // console.log('check errors: ', errors);
    // console.log('check Error: ', checkError);
    // console.log('check isAuthenticated: ', isAuthenticated);

    return (
        <>
            {/* {!isAuthenticated && */}
            <LoginSignup
                login={true}
                formData={formData}
                errors={errors}
                checkError={checkError}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            {/* } */}
        </>
    );
};

export default DangNhap;