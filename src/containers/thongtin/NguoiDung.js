'use client'

import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import NguoiDungMain from '@/components/thongtin/nguoidung/NguoiDungMain';
import NguoiDungLoading from '@/components/thongtin/nguoidung/NguoiDungLoading';

const NguoiDung = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const ss_account = Cookies.get('ss_account');
    const account_user = Cookies.get('account_user');

    useEffect(() => {
        if (ss_account && account_user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            clearCookiesAndRedirect();
        }
    }, [ss_account, account_user]);

    return (
        <>
            {isAuthenticated
                ?
                <NguoiDungMain

                />
                :
                <>
                    <NguoiDungLoading />
                </>
            }
        </>

    );
};

export default NguoiDung;