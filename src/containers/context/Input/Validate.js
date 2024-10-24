'use client';
import React, { createContext, useCallback, useMemo, useState } from 'react';

const ValidateContext = createContext();

const Validate = ({ children }) => {
    const [headTitle, setHeadTitle] = useState('');

    const toggleHeadTitle = useCallback((title) => {
        setHeadTitle(title);
    }, []);

    const validate = useCallback((name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                error = !value ? 'Vui lòng nhập tên của bạn' : '';
                break;
            case 'account':
                error = !value ? 'Vui lòng nhập tài khoản của bạn' : '';
                break;
            case 'password':
                error = !value ? 'Vui lòng nhập mật khẩu của bạn' :
                    value.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự' :
                        value.length > 20 ? 'Mật khẩu không thể dài hơn 20 ký tự' : '';
                break;
            default:
                break;
        }
        return error;
    }, []);
    const value = useMemo(() => ({
        headTitle,
        toggleHeadTitle
    }), [headTitle, toggleHeadTitle]);

    return (
        <ValidateContext.Provider value={value}>
            {children}
        </ValidateContext.Provider>
    );
};

export default Validate;