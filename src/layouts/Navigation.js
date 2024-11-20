'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
// import Logo from '../assets/imgs/logo-mimimusic.png';
import '../styles/Navigation.scss';
import { IoMdSearch } from 'react-icons/io';
import Cookies from 'js-cookie';
import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import GioHangNavigation from '@/components/giohang/GioHangNavigation';
import LogOutModal from '@/components/header/LogOutModal';
import { InfoUser } from '@/containers/context/InfoUser';
import { InFoCart } from '@/containers/context/InFoCart';

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const ss_account = Cookies.get('ss_account');
    const account_user = Cookies.get('account_user');

    useEffect(() => {
        if (ss_account && account_user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [ss_account, account_user]);

    // console.log('check isAuthenticated', isAuthenticated);

    const handleLogout = () => {
        clearCookiesAndRedirect()
    };

    return (
        <>
            <Navbar sticky='top' expand="lg" className="bg-green">
                <Container fluid='xl'>
                    <Navbar.Brand href="/" className='nav-link'>
                        {/* <Image
                            src={Logo}
                            width={50}
                            height={50}
                            alt="Ảnh Logo"
                            priority // Ưu tiên tải hình ảnh này
                        /> */}
                        Dự án
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">{/* ms-auto chuyển về End me-auto chuyển về Đầu */}
                            <Link href='/' className='nav-link'>Trang chủ</Link>
                            <Link href='/gioi-thieu' className='nav-link'>Giới thiệu</Link>
                            <Link href='/san-pham' className='nav-link'>Sản phẩm</Link>
                            <Link href='/' className='nav-link'>Tin tức</Link>
                            <Link href='/' className='nav-link'>Hoạt động</Link>
                            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                                <div className='pe-1 w-100 border border-1 rounded-3 d-flex bg-white'>
                                    <Button variant='white' className=''>
                                        <IoMdSearch className='fs-5' />
                                    </Button>
                                    <input type="search"
                                        // onInput={(e) => handleSearch(e.target.value)}
                                        placeholder="Tìm kiếm..."
                                        className='form-control border border-0'
                                    />
                                </div>
                            </div>
                            {/* <Link href='/gio-hang' className='nav-link'>Giỏ Hàng </Link> */}

                        </Nav>

                        {isAuthenticated === null ?
                            <></>
                            : !isAuthenticated ?
                                <div className='pt-2 d-flex'>
                                    <Link href="/dang-nhap" className='nav-link'>Đăng nhập</Link>
                                    <span className='mx-1 text-white'>/</span>
                                    <Link href="/dang-ky" className='nav-link'>Đăng ký</Link>
                                </div>
                                :
                                <InfoUser>
                                    <InFoCart>
                                        <div className='py-3 d-lg-flex flex-wrap gap-2 align-items-center justify-content-end'>
                                            <LogOutModal />
                                            <Link href='/thong-tin/gio-hang' className='nav-link'>
                                                <GioHangNavigation />
                                            </Link>
                                        </div>
                                    </InFoCart>
                                </InfoUser>

                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;