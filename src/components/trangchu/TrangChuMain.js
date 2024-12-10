'use client'

import React, { useEffect } from 'react';
import './TrangChuMain.scss';
import SliderMain from '../sliders/SliderMain';
import LoadingPageMain from '../loadingpage/LoadingPageMain';
import LoadingPageTwo from '../loadingpage/LoadingPageTwo';
import LoadingPageThree from '../loadingpage/LoadingPageThree';
import LoadingPageFour from '../loadingpage/LoadingPageFour';
import LoadingPageDangky from '../loadingpage/LoadingPageDangky';
import BackToTop from '../backto/BackToTop';
import Navigation from '@/layouts/Navigation';
import Footer from '@/layouts/Footer';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const TrangChuMain = () => {
    const searchParams = useSearchParams();
    const status = searchParams?.get('status');
    const router = useRouter();

    useEffect(() => {
        if (status) {
            if (status === 'success') {
                toast.success('Đăng nhập thành công');
            } else if (status === 'failure') {
                toast.warning('Đăng nhập thất bại');
            }
            router.push('/');
        }
    }, [status, router]);

    return (
        <>
            <Navigation />
            <SliderMain />
            <LoadingPageMain />
            <LoadingPageTwo />
            <LoadingPageThree />
            <LoadingPageFour />
            <LoadingPageDangky />
            <BackToTop />
            <Footer />
        </>
    );
};

export default TrangChuMain;