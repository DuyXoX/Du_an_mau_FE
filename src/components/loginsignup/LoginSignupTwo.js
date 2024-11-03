import React, { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputGroup from '@/components/inputGroup/InputGroup';
import { Button } from 'react-bootstrap';

const LoginSignupTwo = ({ login, formData, errors, checkError, handleChange, handleSubmit }) => {
    // console.log('check Error: ', checkError);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                {!login &&
                    <div className="inputGroup">
                        <input type="text" name='TenDangNhap' required
                            value={formData.TenDangNhap}
                            onChange={handleChange}
                        />
                        <label>Tên Đăng Nhập</label>
                        {errors.TenDangNhap &&
                            <span
                                style={{ fontSize: '.75rem' }}
                                className='text-green'>
                                {errors.TenDangNhap}
                            </span>
                        }
                    </div>
                }
                <div className="inputGroup">
                    <input type="text" name='Account' required
                        value={formData.Account}
                        onChange={handleChange}
                    />
                    <label>Tài Khoản</label>
                    {errors.Account &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className='text-green'>
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
                            className='text-green'>
                            {errors.MatKhau}
                        </span>
                    }
                </div>
                {!login &&
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
                }
            </InputGroup>

            <div style={{ fontSize: '10px' }} className='d-flex justify-content-between'>
                {login ?
                    <Link
                        className='text-green nav-link'
                        href={'/dang-ky'}
                    >
                        Đăng ký tài khoản mới.
                    </Link>
                    :
                    <Link
                        className='text-green nav-link'
                        href={'/dang-nhap'}
                    >
                        Đăng nhập tài khoản.
                    </Link>
                }
                <Link
                    className='text-green nav-link'
                    href={'/quen-mat-khau'}
                >
                    Quên mật khẩu?
                </Link>
            </div>

            <div className='d-flex justify-content-center'>
                {login ?
                    <Button
                        type='submit'
                        style={{ minWidth: '150px' }}
                        className='p-2 mt-5'
                        variant='green'
                        disabled={checkError}
                    >
                        Đăng nhập
                    </Button>
                    :
                    <Button
                        type='submit'
                        style={{ minWidth: '150px' }}
                        className='p-2 mt-5'
                        variant='green'
                        disabled={checkError}
                    >
                        Đăng ký
                    </Button>
                }
            </div>

        </form>
    );
};

export default LoginSignupTwo;