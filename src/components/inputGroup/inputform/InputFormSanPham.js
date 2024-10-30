import React, { useState } from 'react';
import InputGroup from '../InputGroup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './InputForm.scss';
import '../InputGroup.scss';
import { Form } from 'react-bootstrap';

const InputFormSanPham = ({ formData, errors, handleChange }) => {

    return (
        <InputGroup>
            <div className="inputGroup">
                <input type="text" name='TenSanPham' required
                    value={formData.TenSanPham}
                    onChange={handleChange}
                />
                <label>Tên Sản Phẩm</label>
                {errors.TenSanPham &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.TenSanPham}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="text" name='MoTa' required
                    value={formData.MoTa}
                    onChange={handleChange}
                />
                <label>Mô Tả</label>
                {errors.MoTa &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.MoTa}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="text" name='Gia' required
                    value={formData.Gia}
                    onChange={handleChange}
                />
                <label>Giá</label>
                {errors.Gia &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.Gia}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="number" name='SoLuongKho' required
                    value={formData.SoLuongKho}
                    onChange={handleChange}
                />
                <label>Số Lượng Kho</label>
                {errors.SoLuongKho &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.SoLuongKho}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="number" name='LoaiSanPhamId' required
                    value={formData.LoaiSanPhamId}
                    onChange={handleChange}
                />
                <label>Loại Sản Phẩm</label>
                {errors.LoaiSanPhamId &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.LoaiSanPhamId}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="text" name='HinhAnh' required
                    value={formData.HinhAnh}
                    onChange={handleChange}
                />
                <label>Hình Ảnh</label>
                {errors.HinhAnh &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.HinhAnh}
                    </span>
                }
            </div>

            {/* <div className='inputGroup'>
                <Form.Select
                    required
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-label="Chọn vai trò"
                >
                    <option value="">Chọn vai trò</option>
                    <option value="user">Người dùng</option>
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
            </div> */}

        </InputGroup>
    );
};

export default InputFormSanPham;