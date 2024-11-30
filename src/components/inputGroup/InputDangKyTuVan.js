import React from 'react';
import InputGroup from './InputGroup';
import { Button } from 'react-bootstrap';

const InputDangKyTuVan = ({ formData, errors, checkError, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <div className="inputGroup">
                    <input type="text" name='TenDangNhap' required
                        value={formData.TenDangNhap}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Họ và tên</label>
                    {errors.TenDangNhap &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.TenDangNhap}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <input type="Account" name='Account' required
                        value={formData.Account}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Email</label>
                    {errors.Account &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.Account}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <input type="tel" name='SoDienThoai' required autoComplete="off"
                        value={formData.SoDienThoai}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Số điện thoại</label>
                    {errors.SoDienThoai &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.SoDienThoai}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <textarea rows={3} type="text" name='NoiDung'
                        value={formData.NoiDung}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Nội dung</label>
                    {errors.NoiDung &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.NoiDung}
                        </span>
                    }
                </div>
            </InputGroup>
            <div className=''>
                <Button
                    type='submit'
                    className=''
                    size='lg'
                    variant='green'
                    disabled={checkError}
                >
                    Gửi yêu cầu
                </Button>
            </div>
        </form>
    );
};

export default InputDangKyTuVan;