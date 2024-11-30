import React from 'react';
import InputGroup from '../InputGroup';
import './InputForm.scss';
import '../InputGroup.scss';

const InputFormChiTietSanPham = ({ formData, errors, handleChange }) => {

    // console.log('check: ', formData);

    return (
        <InputGroup>
            <div className="inputGroup">
                <input type="text" name='loaiChiTiet' required
                    value={formData.loaiChiTiet}
                    onChange={handleChange}
                />
                <label>Loại Chi Tiết</label>
                {errors.loaiChiTiet &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.loaiChiTiet}
                    </span>
                }
            </div>

            <div className="inputGroup">
                <input type="text" name='moTaChiTiet' required
                    value={formData.moTaChiTiet}
                    onChange={handleChange}
                />
                <label>Mô Tả Chi Tiết</label>
                {errors.moTaChiTiet &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.moTaChiTiet}
                    </span>
                }
            </div>

            <div className="inputGroup">
                <input type="number" name='gia' required
                    value={formData.gia}
                    onChange={handleChange}
                />
                <label>Giá</label>
                {errors.gia &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.gia}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="number" name='soLuong' required
                    value={formData.soLuong}
                    onChange={handleChange}
                />
                <label>Số Lượng Kho</label>
                {errors.soLuong &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.soLuong}
                    </span>
                }
            </div>

        </InputGroup>
    );
};

export default InputFormChiTietSanPham;