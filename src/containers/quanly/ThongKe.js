'use client'

import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import ThongKee from '@/components/table/bodyTable/ThongKe';
import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { HeadeTitleContext } from '../context/HeadeTitle';

const ThongKe = () => {
    const { toggleHeadTitle } = useContext(HeadeTitleContext);
    const ss_account = Cookies.get('ss_account');

    useEffect(() => {
        if (!ss_account) {
            clearCookiesAndRedirect();
        }
        toggleHeadTitle('Quản Lý Thông Tin Thống Kê');
    }, [toggleHeadTitle, ss_account]);

    return (
        <ThongKee />
    );
};

export default ThongKe;