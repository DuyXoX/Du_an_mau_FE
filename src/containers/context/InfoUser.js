'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react';
import { jwtVerify } from '@/service/jwtAuthen';
import Cookies from 'js-cookie';
import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';

const InfoUserContext = createContext();

const InfoUser = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [info, setInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            const ss_account = Cookies.get('ss_account');
            const account_user = Cookies.get('account_user');

            if (ss_account) {
                try {
                    // console.log('check: ', ss_account);
                    const decoded = await jwtVerify(ss_account);
                    setIsAuthenticated(true);
                    setInfo({
                        decoded,
                        account_user
                    });
                    // console.log('check authen: ', infoUserAuthen.role);
                } catch (error) {
                    console.error('Error verifying JWT:', error);
                    setInfo('');
                }
            }
            else {
                return clearCookiesAndRedirect();
            }
        };

        fetchUserInfo();
    }, []);

    const value = useMemo(() => ({
        isAuthenticated,
        info
    }), [isAuthenticated, info]);

    return (
        <InfoUserContext.Provider value={value}>
            {children}
        </InfoUserContext.Provider>
    );
};

export { InfoUserContext, InfoUser };