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

    return (
        <InputGroup>
            <div className="inputGroup">
                <input type="text" name='username' required
                    value={formData.username}
                    onChange={handleChange}
                />
                <label>Họ và tên</label>
                {errors.username &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.username}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="account" name='account' required
                    value={formData.account}
                    onChange={handleChange}
                />
                <label>Email</label>
                {errors.account &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.account}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"} name='password' required autoComplete="off"
                        value={formData.password}
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
                {errors.password &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.password}
                    </span>
                }
            </div>

            <div className='inputGroup'>
                <Form.Select
                    required
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-label="Chọn vai trò"
                >
                    <option value="">Chọn vai trò</option>
                    <option value="user">Học viên</option>
                    <option value="quanly">Quản lý</option>
                    <option value="admin">Admin</option>
                </Form.Select>
                {errors.role &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.role}
                    </span>
                }
            </div>

        </InputGroup>
    );
};

export default InputFormNguoiDung;