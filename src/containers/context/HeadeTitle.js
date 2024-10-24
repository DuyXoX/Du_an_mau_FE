'use client';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const HeadeTitleContext = createContext();

const HeadeTitle = ({ children }) => {
    const [headTitle, setHeadTitle] = useState('');

    const toggleHeadTitle = useCallback((title) => {
        setHeadTitle(title);
    }, []);

    const value = useMemo(() => ({
        headTitle,
        toggleHeadTitle
    }), [headTitle, toggleHeadTitle]);


    return (
        <HeadeTitleContext.Provider value={value}>
            {children}
        </HeadeTitleContext.Provider>
    );
};

export { HeadeTitleContext, HeadeTitle };