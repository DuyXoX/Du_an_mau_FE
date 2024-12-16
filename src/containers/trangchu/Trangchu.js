'use client'
import LoadPage from '@/components/loading/LoadPage';
import TrangChuMain from '@/components/trangchu/TrangChuMain';
import React, { Suspense } from 'react';

const Trangchu = () => {
    return (
        <Suspense fallback={<LoadPage />}>
            <TrangChuMain />
        </Suspense>
    );
};

export default Trangchu;