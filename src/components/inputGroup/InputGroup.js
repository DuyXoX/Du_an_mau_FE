import React, { useEffect } from 'react';

const InputGroup = ({ children }) => {
    const applyHasValueClass = () => {
        const inputs = document.querySelectorAll('.inputGroup input, .inputGroup textarea, .inputGroup select');
        inputs.forEach((input) => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    };

    useEffect(() => {
        applyHasValueClass(); // Kiểm tra và áp dụng lớp khi thành phần gắn kết hoặc cập nhật

        // Thêm trình lắng nghe sự kiện cho các sự kiện làm mờ và thay đổi
        const inputs = document.querySelectorAll('.inputGroup input, .inputGroup textarea, .inputGroup select');
        inputs.forEach((input) => {
            input.addEventListener('blur', applyHasValueClass);
            input.addEventListener('change', applyHasValueClass);
        });

        // Người nghe sự kiện dọn dẹp không ngừng nghỉ
        return () => {
            inputs.forEach((input) => {
                input.removeEventListener('blur', applyHasValueClass);
                input.removeEventListener('change', applyHasValueClass);
            });
        };
    }, []); // Chỉ phụ thuộc vào gắn kết và ngắt

    return (
        <>
            {children}
        </>
    );
};

export default InputGroup;
