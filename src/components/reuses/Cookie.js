'use client'
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const setCookie = (name, value) => {
    Cookies.set(name, value, {
        secure: false, //Chỉ cho phép truy cập từ (https).
        sameSite: 'strict',
        httpOnly: false,
        expires: 1 / 24,//Thời gian 1h
    });
};

const clearCookiesAndRedirect = () => {
    Cookies.remove('ss_account', { path: '/' });
    Cookies.remove('account_user', { path: '/' });

    if (window.location.pathname !== '/dang-nhap') {
        toast.warning('Vui lòng đăng nhập lại.', {
            onClose: () => {
                window.location.replace('/dang-nhap')
            }
        });
    };

};

export { setCookie, clearCookiesAndRedirect };