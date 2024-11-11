import React, { useState } from 'react';
import InputGroup from '../InputGroup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './InputForm.scss';
import '../InputGroup.scss';
import { Form } from 'react-bootstrap';

const InputFormNguoiDung = ({ formData, errors, handleChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // console.log('check: ', formData);

    return (
        <InputGroup>
            <div className="inputGroup">
                <input type="text" name='TenDangNhap' required
                    value={formData.TenDangNhap}
                    onChange={handleChange}
                />
                <label>Tên Đăng Nhập</label>
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
                <input type="text" name='DiaChi' required
                    value={formData.DiaChi}
                    onChange={handleChange}
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

            <div className='inputGroup'>
                <Form.Select
                    required
                    name="VaiTro"
                    value={formData.VaiTro}
                    onChange={handleChange}
                    aria-label="Chọn vai trò"
                >
                    <option value="">Chọn vai trò</option>
                    <option value="user">Người dùng</option>
                    <option value="quanly">Quản lý</option>
                    <option value="admin">Admin</option>
                </Form.Select>
                {errors.VaiTro &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.VaiTro}
                    </span>
                }
            </div>

        </InputGroup>
    );
};

export default InputFormNguoiDung;