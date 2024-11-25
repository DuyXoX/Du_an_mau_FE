'use client'

import InputGroup from '@/components/inputGroup/InputGroup';
import '../../components/inputGroup/InputGroup.scss';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaLock, FaPen } from 'react-icons/fa';

const NguoiDung = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    return (
        <section>
            <Container fluid='xxl'>
                <Row xs={2} style={{ '--bs-gutter-x': 'none', minHeight: '55vh' }} className='p-3 border border-3 rounded-4'>
                    <Col xs={12}>
                        <div className=''>
                            <h2 className=''>
                                Thông tin tài khoản của bạn
                            </h2>
                            <h5 className=''>
                                Quản lý thông tin để bảo mật tài khoản
                            </h5>
                        </div>
                    </Col>
                    <Col>
                        <div className='pe-2'>
                            <InputGroup>
                                <div className="inputGroup">
                                    <input type="text" name='TenDangNhap' required
                                    // value={formData.TenDangNhap}
                                    // onChange={handleChange}
                                    />
                                    <label>Tên Đăng Nhập</label>
                                    {/* {errors.TenDangNhap &&
                                            <span
                                                style={{ fontSize: '.75rem' }}
                                                className='text-orange'>
                                                {errors.TenDangNhap}
                                            </span>
                                        } */}
                                </div>
                                <div className="inputGroup">
                                    <input type="text" name='Account' required
                                    // value={formData.Account}
                                    // onChange={handleChange}
                                    />
                                    <label>Tài khoản</label>
                                    {/* {errors.Account &&
                                            <span
                                                style={{ fontSize: '.75rem' }}
                                                className='text-orange'>
                                                {errors.Account}
                                            </span>
                                        } */}
                                </div>
                                <div className="inputGroup">
                                    <input type="text" name='DiaChi' required
                                    // value={formData.DiaChi}
                                    // onChange={handleChange}
                                    />
                                    <label>Địa chỉ</label>
                                    {/* {errors.DiaChi &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.DiaChi}
                    </span>
                } */}
                                </div>
                                <div className="inputGroup">
                                    <input type="numberphone" name='SoDienThoai' required
                                    // value={formData.SoDienThoai}
                                    // onChange={handleChange}
                                    />
                                    <label>SĐT</label>
                                    {/* {errors.SoDienThoai &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.SoDienThoai}
                    </span>
                } */}
                                </div>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col>
                        <div className='ps-2'>
                            <InputGroup>
                                <div>
                                    <div className="inputGroup">
                                        <div className='position-relative'>
                                            <input type={showPassword ? "text" : "password"} name='MatKhau' required autoComplete="off"
                                            // value={formData.MatKhau}
                                            // onChange={handleChange}
                                            />
                                            <label>Mật khẩu</label>
                                            <span
                                                className="eye-icon"
                                                onClick={toggleShowPassword}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        {/* {errors.MatKhau &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.MatKhau}
                    </span>
                } */}
                                    </div>
                                    <div className="inputGroup">
                                        <div className='position-relative'>
                                            <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' required autoComplete="off"
                                            // value={formData.confirmPassword}
                                            // onChange={handleChange}
                                            />
                                            <label>Nhập lại mật khẩu</label>
                                            <span
                                                className="eye-icon"
                                                onClick={toggleShowConfirmPassword}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        {/* {errors.confirmPassword &&
                                            <span
                                                style={{ fontSize: '.75rem' }}
                                                className='text-green'>
                                                {errors.confirmPassword}
                                            </span>
                                        } */}
                                    </div>
                                </div>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className='d-flex justify-content-between'>
                            <Button variant='green'
                                className='d-flex align-items-center'
                            >
                                <FaPen className='me-2' />
                                Lưu thay đổi
                            </Button>
                            <Button variant='green'
                                className='d-flex align-items-center'
                            >
                                <FaLock className='me-2' />
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NguoiDung;