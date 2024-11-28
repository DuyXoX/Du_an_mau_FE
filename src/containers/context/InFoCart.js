'use client'

import { useGetData } from '@/service/apiServive';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
const InfoCartContext = createContext();

const InFoCart = ({ children }) => {
    const { data, loading, error, mutate } = useGetData('/cart');
    const [cart, setCart] = useState([]);

    const updateData = useCallback(async () => {
        const newData = await mutate(); // Cập nhật lại dữ liệu từ SWR
        setCart(newData);
    }, [mutate]);

    useEffect(() => {
        setCart(data);
    }, [data]);

    const value = useMemo(() => ({
        cart,
        updateData,
    }), [cart, updateData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error:</p>;
    // console.log('check: ', cart);

    return (
        <InfoCartContext.Provider value={value}>
            {children}
        </InfoCartContext.Provider>
    );
};

export { InfoCartContext, InFoCart };