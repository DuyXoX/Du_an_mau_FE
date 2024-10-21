import React from 'react';
import './TrangChuMain.scss';
import SliderMain from '../sliders/SliderMain';
import LoadingPageMain from '../loadingpage/LoadingPageMain';
import LoadingPageTwo from '../loadingpage/LoadingPageTwo';
import LoadingPageThree from '../loadingpage/LoadingPageThree';
import LoadingPageFour from '../loadingpage/LoadingPageFour';
import LoadingPageDangky from '../loadingpage/LoadingPageDangky';
import BackToTop from '../backto/BackToTop';

const TrangChuMain = () => {
    return (
        <>
            <SliderMain />
            <LoadingPageMain />
            <LoadingPageTwo />
            <LoadingPageThree />
            <LoadingPageFour />
            <LoadingPageDangky />
            <BackToTop />
        </>
    );
};

export default TrangChuMain;