import DangNhap from '@/containers/DangNhap';
import React from 'react';

export async function generateMetadata() {
    return {
        title: `Mimimusic - Đăng nhập`,
    };
}

const page = () => {
    return (
        <DangNhap />
    );
};

export default page;