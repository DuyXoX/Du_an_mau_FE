import React, { useEffect } from 'react';

const InputGroup = ({ children }) => {
    useEffect(() => {
        const inputs = document.querySelectorAll('.inputGroup input, .inputGroup textarea, .inputGroup select');

        inputs.forEach((input) => {
            // Xử lý cho input và textarea với sự kiện blur
            if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                input.addEventListener('blur', () => {
                    if (input.value) {
                        input.classList.add('has-value');
                    } else {
                        input.classList.remove('has-value');
                    }
                });
            }

            // Xử lý cho select với sự kiện change
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    if (input.value) {
                        input.classList.add('has-value');
                    } else {
                        input.classList.remove('has-value');
                    }
                });
            }
        });

        // Cleanup sự kiện khi component unmount
        return () => {
            inputs.forEach((input) => {
                input.removeEventListener('blur', null);
                input.removeEventListener('change', null);
            });
        };
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default InputGroup;
