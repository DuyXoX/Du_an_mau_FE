'use client'
import LoginSignup from '@/components/loginsignup/LoginSignup';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { apiClient } from '@/service/apiServive';

const DangKy = () => {
    const router = useRouter();
    const ss_account = Cookies.get('ss_account');

    useEffect(() => {
        if (ss_account) {
            router.push('/thong-tin/nguoi-dung');
            return;
        }
    }, [router, ss_account]);

    const [formData, setFormData] = useState({
        TenDangNhap: '',
        Account: '',
        MatKhau: '',
        NhapLaiMatKhau: ''
    });

    const [errors, setErrors] = useState({
        TenDangNhap: '',
        Account: '',
        MatKhau: '',
        NhapLaiMatKhau: ''
    });

    const [checkError, setCheckError] = useState(true);

    const validate = (name, value) => {
        switch (name) {
            case 'TenDangNhap':
                if (!value) {
                    return 'Vui lòng nhập tên của bạn';
                } else if (value.length < 8) {
                    return 'Tên của bạn không thể ít hơn 8 ký tự';
                } else if (value.length > 20) {
                    return 'Tên của bạn không thể dài hơn 8 ký tự';
                } else {
                    return '';
                }
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
            case 'confirmPassword':
                if (!value) {
                    return 'Vui lòng nhập lại mật khẩu của bạn';
                } else if (value.length < 8) {
                    return 'Mật khẩu phải có ít nhất 8 ký tự';
                }
                else if (value.length > 20) {
                    return 'Mật khẩu không thể dài hơn 20 ký tự';
                }
                else if (value !== formData.MatKhau) {
                    return 'Mật khẩu xác thực phải giống nhau';
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

        try {
            const response = await apiClient.post('/signup', formData);
            const { message, warning, error } = response.data;

            // console.log('check response: ', response);

            if (response && message) {
                toast.update(loading, { render: message, type: "success", isLoading: false, autoClose: 3000 })
                setCheckError(true)
                return;
            }
            if (response && warning) {
                toast.update(loading, { render: warning, type: "warning", isLoading: false, autoClose: 3000 })
                setCheckError(true)
                return;
            }
            if (response && error) {
                toast.update(loading, { render: error, type: "error", isLoading: false, autoClose: 3000 })
                setCheckError(true)
                return;
            }

        } catch (error) {
            // console.log('check error: ', error);
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: "error", isLoading: false, autoClose: 3000 });
            setCheckError(true)
            return;
        }
    };

    // console.log('check errors: ', errors);
    // console.log('check Error: ', checkError);

    return (
        <>
            <LoginSignup
                login={false}
                formData={formData}
                errors={errors}
                checkError={checkError}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default DangKy;