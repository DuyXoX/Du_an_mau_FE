'use client';

import React, { memo, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HeadeTitleContext } from '../context/HeadeTitle';
import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import TableMain from '@/components/table/TableMain';
import { TableData } from '../context/getdata/TableData';
import { TableInfo } from '../context/getdata/TableInfo';
import ValidateHocVien from '../validations/ValidateHocVien';
import LoadTable from '@/components/loading/LoadTable';
import { useGetData } from '@/service/apiServive';

const NguoiDung = () => {
    const { toggleHeadTitle } = useContext(HeadeTitleContext);
    const { data, error, isLoading, mutate } = useGetData('/user');

    const ss_account = Cookies.get('ss_account');
    const account_user = Cookies.get('account_user');
    const typeData = {
        _id: '',
        username: '',
        account: '',
        password: '',
        role: '',
    };
    const validate = ValidateHocVien;

    useEffect(() => {
        if (!ss_account || !account_user) {
            clearCookiesAndRedirect();
        }
        toggleHeadTitle('Quản Lý Thông Tin Người Dùng');
    }, [toggleHeadTitle, ss_account, account_user]);

    if (isLoading) return <LoadTable />;
    if (error) {
        console.log('check error: ', error.message);
        return <div>Đã có lỗi sảy ra!</div>;
    }
    // console.log('check');

    return (
        <TableData
            initialData={data}//Truyền data vào cho context
            mutate={mutate}//Lấy lại data mới nhất truyền vào cho context
        >
            <TableInfo
                formTable='nguoidung'
                typeData={typeData}
                validate={validate}
                endpoint={'/user'}
            >
                <TableMain />
            </TableInfo>
        </TableData>
    );
};

export default memo(NguoiDung);