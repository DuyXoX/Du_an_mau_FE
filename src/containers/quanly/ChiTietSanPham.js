'use client';

import React, { memo } from 'react';
import AddModal from '@/components/modals/cruds/chitietsanpham/AddModal';
import UpdatechiTietSanPhamModal from '@/components/modals/cruds/chitietsanpham/UpdateModal';
import DeleteChiTietSanPhamModal from '@/components/modals/cruds/chitietsanpham/DeleteModal';

const ChiTietSamPham = ({ rowData, updateData }) => {
    const typeData = {
        sanPhamId: '',
        chiTietSanPhamId: '',
        loaiChiTiet: '',
        moTaChiTiet: '',
        gia: '',
        soLuong: ''
    };
    const endpoint = '/chitietsanpham';
    // console.log('check', data);

    return (
        <div className='d-flex flex-wrap'>
            <AddModal
                typeData={typeData}
                rowData={rowData}
                endpoint={endpoint}
                updateData={updateData}
            />
            {rowData?.PhanLoai?.map((value, idx) => {
                return (
                    <div key={idx} className='m-2 position-relative'>
                        <UpdatechiTietSanPhamModal
                            typeData={typeData}
                            rowData={rowData}
                            value={value}
                            endpoint={endpoint}
                            updateData={updateData}
                        >
                            <span className=''>
                                {value.LoaiChiTiet}
                            </span>
                            <br />
                            <span className=''>
                                Giá: {value.Gia}
                            </span>
                            <br />
                            <span className=''>
                                Kho: {value?.SoLuong}
                            </span>
                        </UpdatechiTietSanPhamModal>
                        <DeleteChiTietSanPhamModal
                            typeData={typeData}
                            rowData={value}
                            endpoint={endpoint}
                            updateData={updateData}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default memo(ChiTietSamPham);