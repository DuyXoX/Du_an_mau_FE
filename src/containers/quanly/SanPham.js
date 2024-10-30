'use client';

import React, { memo, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HeadeTitleContext } from '../context/HeadeTitle';
import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import TableMain from '@/components/table/TableMain';
import ValidateHocVien from '../validations/ValidateNguoiDung';
import LoadTable from '@/components/loading/LoadTable';
import { useGetData } from '@/service/apiServive';
import { TableData } from '../context/getdata/TableData';
import { TableInfo } from '../context/getdata/TableInfo';
import ValidateSanPham from '../validations/ValidateSanPham';

const SanPham = () => {
    const { toggleHeadTitle } = useContext(HeadeTitleContext);
    const { data, error, isLoading, mutate } = useGetData('/sanpham');

    const ss_account = Cookies.get('ss_account');
    const typeData = {
        SanPhamId: '',
        TenSanPham: '',
        MoTa: '',
        Gia: '',
        SoLuongKho: '',
        ThoiGianTao: '',
        ThoiGianCapNhat: '',
        LoaiSanPhamId: '',
        HinhAnh: ''
    };
    const validate = ValidateSanPham;

    useEffect(() => {
        if (!ss_account) {
            clearCookiesAndRedirect();
        }
        toggleHeadTitle('Quản Lý Thông Tin Sản Phẩm');
    }, [toggleHeadTitle, ss_account]);

    if (isLoading) return <LoadTable />;
    if (error) {
        console.log('check error: ', error.message);
        return <div>Đã có lỗi sảy ra!</div>;
    }
    // console.log('check', data);

    return (
        <TableData
            initialData={data}//Truyền data vào cho context
            mutate={mutate}//Lấy lại data mới nhất truyền vào cho context
        >
            <TableInfo
                formTable='sanpham'
                typeData={typeData}
                validate={validate}
                endpoint={'/sanpham'}
            >
                <TableMain />
            </TableInfo>
        </TableData>
    );
};

export default memo(SanPham);