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
const DonHang = () => {
    const { toggleHeadTitle } = useContext(HeadeTitleContext);
    const { data, error, isLoading, mutate } = useGetData('/donhangall');

    const ss_account = Cookies.get('ss_account');
    const typeData = {
        DonHangId: '',
        TrangThai: '',
        DiaChi: '',
        SoDienThoai: '',
        TongTien: ''
    };
    const validate = ValidateHocVien;

    useEffect(() => {
        if (!ss_account) {
            clearCookiesAndRedirect();
        }
        toggleHeadTitle('Quản Lý Thông Tin Đơn Hàng');
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
                formTable='donhang'
                typeData={typeData}
                validate={validate}
                endpoint={'/donhangall'}
            >
                <TableMain />
            </TableInfo>
        </TableData>
    );
};

export default memo(DonHang);