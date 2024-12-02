import InputGroup from '@/components/inputGroup/InputGroup';
import showToast from '@/components/reuses/Toast';
import ValidateThongTinNguoiDung from '@/containers/validations/ValidateThongTinNguoiDung';
import { putData } from '@/service/apiServive';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NguoiDungThongTin = ({ Id, data, mutate }) => {
    const typeData = {
        TenDangNhap: '',
        Account: '',
        DiaChi: '',
        SoDienThoai: '',
        MatKhau: '',
        confirmPassword: ''
    }
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);
    const validate = ValidateThongTinNguoiDung;

    useEffect(() => {
        if (data) {
            setFormData(preView => ({
                ...preView,
                TenDangNhap: data.TenDangNhap,
                Account: data.Account,
                DiaChi: data.DiaChi,
                SoDienThoai: data.SoDienThoai,
            }))
        }
        // console.log('check re render');

    }, [data])

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
            <div className='pe-lg-2'>
                <InputGroup>
                    <div className="inputGroup">
                        <input type="text" name='TenDangNhap' required
                            value={formData.TenDangNhap}
                            onChange={handleChange}
                            className={formData.TenDangNhap ? 'has-value' : ''}
                        />
                        <label >Tên Đăng Nhập</label>
                        {errors.TenDangNhap &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-orange'>
                                {errors.TenDangNhap}
                            </span>
                        }
                    </div>
                    <div className="inputGroup">
                        <input type="text" name='Account' required
                            value={formData.Account}
                            onChange={handleChange}
                            className={formData.Account ? 'has-value' : ''}
                        />
                        <label>Tài khoản</label>
                        {errors.Account &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-orange'>
                                {errors.Account}
                            </span>
                        }
                    </div>
                    <div className="inputGroup">
                        <input type="text" name='DiaChi' required
                            value={formData.DiaChi}
                            onChange={handleChange}
                            className={formData.DiaChi ? 'has-value' : ''}
                        />
                        <label>Địa chỉ</label>
                        {errors.DiaChi &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-orange'>
                                {errors.DiaChi}
                            </span>
                        }
                    </div>
                    <div className="inputGroup">
                        <input type="numberphone" name='SoDienThoai' required
                            value={formData.SoDienThoai}
                            onChange={handleChange}
                            className={formData.SoDienThoai ? 'has-value' : ''}
                        />
                        <label>SĐT</label>
                        {errors.SoDienThoai &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-orange'>
                                {errors.SoDienThoai}
                            </span>
                        }
                    </div>
                </InputGroup>
            </div>
            <div>
                <Button variant='green'
                    disabled={checkError}
                    className='d-flex align-items-center'
                    onClick={() => handleSubmitEdit()}
                >
                    <FaPen className='me-2' />
                    Lưu thay đổi
                </Button>
            </div>
        </>
    );
};

export default NguoiDungThongTin;