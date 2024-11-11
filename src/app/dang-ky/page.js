import DangKy from '@/containers/DangKy';
import Footer from '@/layouts/Footer';
import Navigation from '@/layouts/Navigation';
import React from 'react';

export async function generateMetadata() {
    return {
        title: `Mimimusic - Đăng ký`,
    };
}

const page = () => {
    return (
        <>
            <Navigation />
            <DangKy />
            <Footer />
        </>
    );
};

export default page;