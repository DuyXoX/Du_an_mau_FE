import React from 'react';
import InputGroup from './InputGroup';
import { Button } from 'react-bootstrap';

const InputDangKyTuVan = ({ formData, errors, checkError, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <div className="inputGroup">
                    <input type="text" name='username' required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Họ và tên</label>
                    {errors.username &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.username}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <input type="email" name='email' required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Email</label>
                    {errors.email &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.email}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <input type="text" name='facebook' required autoComplete="off"
                        value={formData.facebook}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Facebook</label>
                    {errors.facebook &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.facebook}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <input type="tel" name='phonenumber' required autoComplete="off"
                        value={formData.phonenumber}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Số điện thoại</label>
                    {errors.phonenumber &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.phonenumber}
                        </span>
                    }
                </div>
                <div className="inputGroup">
                    <textarea rows={3} type="text" name='content'
                        value={formData.content}
                        onChange={handleChange}
                    />
                    <label className='bg-transparent'>Nội dung</label>
                    {errors.content &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className=''>
                            {errors.content}
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