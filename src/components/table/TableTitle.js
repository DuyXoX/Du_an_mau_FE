import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdSearch } from 'react-icons/io';

const TableTitle = ({ handleSearch }) => {
    // console.log('check re render');

    return (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý dữ liệu</h4>
            <div className='pe-1 border border-1 rounded-3 d-flex bg-white'>
                <Button variant='white' className=''>
                    <IoMdSearch className='fs-5' />
                </Button>
                <input type="search"
                    onInput={(e) => handleSearch(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className='form-control border border-0'
                />
            </div>
        </div>
    );
};

export default memo(TableTitle);