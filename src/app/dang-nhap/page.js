import DangNhap from '@/containers/DangNhap';
import Footer from '@/layouts/Footer';
import Navigation from '@/layouts/Navigation';
import React from 'react';

export async function generateMetadata() {
    return {
        title: `Nông sản - Đăng nhập`,
    };
}

const page = () => {
    return (
        <>
            <Navigation />
            <DangNhap />
            <Footer />
        </>
    );
};

export default page;