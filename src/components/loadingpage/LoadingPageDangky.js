'use client'
import React, { useState } from 'react';
import '@/components/inputGroup/InputGroup.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import avatarform from '../../assets/imgs/avatarform.webp'
import { apiClient } from '@/service/apiServive';
import { toast } from 'react-toastify';
import InputDangKyTuVan from '../inputGroup/InputDangKyTuVan';
import loadingpage_bg from '../../assets/imgs/loadingpage/loadingpage_bg.png';
import ScrollAnimation from '../animation/ScrollAnimation';


const LoadingPageDangky = () => {
    const typeData = {
        TenDangNhap: '',
        Account: '',
        SoDienThoai: '',
        NoiDung: '',
    }
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);

    const validate = (name, value) => {
        switch (name) {
            case 'TenDangNhap':
                if (!value) {
                    return 'Vui lòng nhập tên của bạn';
                } else if (value.length < 8) {
                    return 'Tên phải có ít nhất 8 ký tự';
                } else {
                    return '';
                }
            case 'Account':
                if (!value) {
                    return 'Vui lòng nhập email của bạn';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return 'Định dạng email của bạn chưa đúng';
                } else {
                    return '';
                }
            case 'SoDienThoai':
                if (!value) {
                    return 'Vui lòng nhập SĐT của bạn';
                } else if (value.length < 10) {
                    return 'SĐT phải có ít nhất 10 số';
                } else {
                    return '';
                }
            case 'NoiDung':
                if (!value) {
                    return 'Vui lòng nhập nội dung của bạn';
                } else {
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
            return;
        }
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true);

        try {
            const response = await apiClient.post('/email', formData);
            const { message, warning, error } = response.data;
            console.log('check response: ', message);

            if (response && message) {
                toast.update(loading, { render: message, type: "success", isLoading: false, autoClose: 3000 })
                return;
            }
            if (response && warning) {
                toast.update(loading, { render: warning, type: "warning", isLoading: false, autoClose: 3000 })
                return;
            }
            if (response && error) {
                toast.update(loading, { render: error, type: "error", isLoading: false, autoClose: 3000 })
                return;
            }
        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: "error", isLoading: false, autoClose: 1000 });
            setCheckError(true)
            return;
        }
    };
    return (
        <section id="dang-ky-tu-van">
            <Container fluid='xxl'>
                <Row style={{ '--bs-gutter-x': 'none', border: '3px solid #d9d9d9', background: `url(${loadingpage_bg.src})`, backgroundRepeat: 'no-repeat' }} className='rounded-5'>
                    <Col md={6} className="">
                        <div className='px-3 px-md-5 my-5'>
                            <ScrollAnimation animationClass='animation-left'>
                                <h2 className='fw-semibold'>
                                    Hãy liên hệ với chúng tôi
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation animationClass='animation-left'>
                                <InputDangKyTuVan
                                    formData={formData}
                                    errors={errors}
                                    checkError={checkError}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            </ScrollAnimation>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <ScrollAnimation animationClass='animation-right px-3 px-md-5 my-5'>
                            <Image
                                className='img-fluid'
                                src={avatarform}
                                alt='Đăng ký tư vấn'
                            />
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoadingPageDangky;