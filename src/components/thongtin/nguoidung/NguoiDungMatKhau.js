import InputGroup from '@/components/inputGroup/InputGroup';
import showToast from '@/components/reuses/Toast';
import ValidateMatKhauNguoiDung from '@/containers/validations/ValidateMatKhauNguoiDung';
import { putData } from '@/service/apiServive';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaLock, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NguoiDungMatKhau = ({ Id, data, mutate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const typeData = {
        MatKhau: '',
        confirmPassword: ''
    }
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);
    const validate = ValidateMatKhauNguoiDung;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (data) {
            // const editFormData = (ss, aa) => {
            setFormData(preView => ({
                ...preView,
                MatKhau: data.MatKhau,
            }))
            // console.log('check: ', data);
            // }
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        const newErrors = {
            ...errors,
            [name]: validate(name, value, formData),
        };

        setErrors(newErrors);

        // Kiểm tra nếu không có lỗi nào thì cập nhật checkError thành false
        if (Object.values(newErrors).every((error) => error === '')) {
            setCheckError(false);
        } else {
            setCheckError(true);
        }
    };

    const handleSubmitEdit = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true);

        try {
            const response = await putData(`/user/tt/${Id}`, formData);//Lưu ý check uploadData hình ảh phải có dịnh binary
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Điều chỉnh thông tin thành công.`, loading);
                    return await mutate();// Gọi mutate để làm mới dữ liệu từ API
                }
                if (warning) {
                    return showToast('warning', warning, loading);
                }
                if (error) {
                    return showToast('error', error, loading);
                }
            }
        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: 'error', isLoading: false, autoClose: 3000 });
            console.error('check error: ', error);
            return;
        }
    };
    return (
        <>
            <div className='ps-lg-2'>
                <InputGroup>
                    <div className="inputGroup">
                        <div className='position-relative'>
                            <input type={showPassword ? "text" : "password"} name='MatKhau' required autoComplete="off"
                                value={formData.MatKhau}
                                onChange={handleChange}
                            />
                            <label>Mật khẩu</label>
                            <span
                                className="eye-icon"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.MatKhau &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-orange'>
                                {errors.MatKhau}
                            </span>
                        }
                    </div>
                    <div className="inputGroup">
                        <div className='position-relative'>
                            <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' required autoComplete="off"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <label>Nhập lại mật khẩu</label>
                            <span
                                className="eye-icon"
                                onClick={toggleShowConfirmPassword}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.confirmPassword &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-green'>
                                {errors.confirmPassword}
                            </span>
                        }
                    </div>
                </InputGroup>
            </div>
            <div className='d-flex mb-4'>
                <Button variant='green'
                    className='d-flex align-items-center ms-lg-auto'
                    disabled={checkError}
                    onClick={() => handleSubmitEdit()}
                >
                    <FaLock className='me-2' />
                    Đổi mật khẩu
                </Button>
            </div>
        </>
    );
};

export default NguoiDungMatKhau;