import DangKy from '@/containers/DangKy';
import React from 'react';

export async function generateMetadata() {
    return {
        title: `Mimimusic - Đăng ký`,
    };
}

const page = () => {
    return (
        <DangKy />
    );
};

export default page;