
import SanPhamMain from '@/components/sanpham/SanPhamMain';
import React from 'react';

const page = ({ params }) => {
    return (
        <SanPhamMain id={params?.id} />
    );
};

export default page;