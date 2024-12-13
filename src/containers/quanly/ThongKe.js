'use client'

import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import ThongKee from '@/components/table/bodyTable/ThongKe';
import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { HeadeTitleContext } from '../context/HeadeTitle';
import { useGetData } from '@/service/apiServive';
import LoadThongKe from '@/components/loading/LoadThongKe';

const ThongKe = () => {
    const { data: nguoiDung, isLoading: loadNguoiDung, error: errorNguoiDung, } = useGetData('/user')
    const { data: sanPham, isLoading: loadSanPham, error: errorSanPham, } = useGetData('/v2/sanpham')
    const { data: donHang, isLoading: loadDonHang, error: errorDonHang } = useGetData('/donhangall')
    const { toggleHeadTitle } = useContext(HeadeTitleContext);
    const ss_account = Cookies.get('ss_account');

    useEffect(() => {
        if (!ss_account) {
            clearCookiesAndRedirect();
        }
        toggleHeadTitle('Quản Lý Thông Tin Thống Kê');
    }, [toggleHeadTitle, ss_account]);

    if (loadNguoiDung || loadSanPham || loadDonHang) return <LoadThongKe />;
    if (errorNguoiDung || errorSanPham || errorDonHang) return <div>Error: {error.message}</div>;



    return (
        <ThongKee
            nguoiDung={nguoiDung}
            sanPham={sanPham}
            donHang={donHang}
        />
    );
};

export default ThongKe;