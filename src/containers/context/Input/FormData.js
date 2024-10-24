'use client';
import React, { createContext, useCallback, useMemo, useState } from 'react';

const FormDataContext = createContext();

const FormData = ({ children }) => {
    const [formData, setFormData] = useState({});

    // toggleFormData chỉ cập nhật formData khi có sự thay đổi thực sự
    const toggleFormData = useCallback((updateFn) => {
        // Kiểm tra nếu updateFn là một hàm
        if (typeof updateFn !== 'function') {
            console.error('updateFn phải là một hàm!');
            return;
        }

        setFormData((prevData) => {
            const updatedData = updateFn(prevData); // Gọi hàm updateFn truyền từ bên ngoài
            // console.log('check', updatedData);

            // So sánh dữ liệu mới và cũ để tránh cập nhật không cần thiết
            if (JSON.stringify(updatedData) !== JSON.stringify(prevData)) {
                return updatedData;
            }

            return prevData; // Không cập nhật nếu không có thay đổi
        });
    }, []);


    const value = useMemo(() => ({
        formData,
        toggleFormData
    }), [formData, toggleFormData]);

    return (
        <FormDataContext.Provider value={value}>
            {children}
        </FormDataContext.Provider>
    );
};

export { FormData, FormDataContext };