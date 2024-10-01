'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
// import Logo from '../assets/imgs/logo-mimimusic.png';
import '../styles/Navigation.scss';
import Cookies from 'js-cookie';

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const ss_account = Cookies.get('ss_account');

    useEffect(() => {
        if (ss_account) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [ss_account]);

    // console.log('check isAuthenticated', isAuthenticated);

    return (
        <>
            <Navbar expand="lg" className="">
                <Container fluid='xl'>
                    <Navbar.Brand href="/" className='text-orange'>
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
                            <Link href="/" className='nav-link me-3 text-orange'>Trang chủ</Link>
                            {isAuthenticated === null ?
                                <></>
                                : !isAuthenticated ?
                                    <>
                                        <Link href="dang-nhap" className='nav-link me-3'>Đăng nhập</Link>
                                        <Link href="dang-ky" className='nav-link '>Đăng ký</Link>
                                    </>
                                    :
                                    <Link href="thong-tin/hoc-vien" className='nav-link '>Thông tin cá nhân</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;