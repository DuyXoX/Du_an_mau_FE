'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleUp, FaFacebookMessenger } from "react-icons/fa";

const BackToTop = () => {

    const router = useRouter();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="back-to-top-container">
            {visible && (
                <button // Nút quay về đầu trang
                    style={{
                        position: 'fixed',
                        backgroundColor: '#2a534f',
                        bottom: '15vh',
                        right: '5vw',
                        zIndex: '1', //thứ tự xếp chồng lên nhau (1 nằm đè lên 0)
                        cursor: 'pointer', //thay đổi con trỏ chuột thành hình dạng pointer (ngón tay trỏ) khi di chuột qua
                    }}
                    className='p-2 rounded-pill border' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <FaAngleUp className='fs-2 text-white' />
                </button>
            )}
            {/* <button
                style={{
                    position: 'fixed',
                    backgroundColor: '#00b0ff',
                    bottom: '8vh',
                    right: '4.75vw',
                    zIndex: '1', //thứ tự xếp chồng lên nhau (1 nằm đè lên 0)
                    cursor: 'pointer', //thay đổi con trỏ chuột thành hình dạng pointer (ngón tay trỏ) khi di chuột qua
                }}
                className='p-2 rounded-pill border'
            // onClick={() => { router.push('') }}
            >
                <FaFacebookMessenger className='fs-1 text-white' />
            </button> */}
        </div>
    );
};

export default BackToTop;