'use client'

import GioHangMain from '@/components/giohang/GioHangMain';
import { checkLogin } from '@/service/apiServive';
import React, { useEffect } from 'react';

const GioHang = () => {

    // useEffect(() => {
    //     const check = async () => {
    //         await checkLogin()
    //     }
    //     check();
    // }, []);

    return (
        <GioHangMain />
    );
};

export default GioHang;