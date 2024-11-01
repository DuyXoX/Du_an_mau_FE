import LoaiSanPham from '@/containers/quanly/LoaiSanPham';
import React from 'react';

export async function generateMetadata() {
    return {
        title: `Loại Sản Phẩm`,
    };
}

const page = () => {
    return (
        <LoaiSanPham />
    );
};

export default page;