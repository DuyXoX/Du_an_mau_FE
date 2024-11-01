import React, { useState } from 'react';
import InputGroup from '../InputGroup';
import './InputForm.scss';
import '../InputGroup.scss';

const InputFormLoaiSanPham = ({ formData, errors, handleChange }) => {

    return (
        <InputGroup>
            <div className="inputGroup">
                <input type="text" name='TenLoai' required
                    value={formData.TenLoai}
                    onChange={handleChange}
                />
                <label>Tên Loại</label>
                {errors.TenLoai &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-green'>
                        {errors.TenLoai}
                    </span>
                }
            </div>
        </InputGroup>
    );
};

export default InputFormLoaiSanPham;