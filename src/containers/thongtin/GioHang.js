'use client'

import GioHangMain from '@/components/giohang/GioHangMain';
import { checkLogin } from '@/service/apiServive';
import React, { useEffect } from 'react';
import { InFoCart } from '../context/InFoCart';
import { InfoUser } from '../context/InfoUser';

const GioHang = () => {

    // useEffect(() => {
    //     const check = async () => {
    //         await checkLogin()
    //     }
    //     check();
    // }, []);

    return (
        <InfoUser>
            <InFoCart>
                <GioHangMain />
            </InFoCart>
        </InfoUser>
    );
};

export default GioHang;