
import SanPhamMain from '@/components/sanpham/SanPhamMain';
import ThongTinSanPham from '@/containers/sanpham/ThongTinSanPham';
import React from 'react';

const page = ({ params }) => {
    return (
        <ThongTinSanPham id={params?.id} />
    );
};

export default page;