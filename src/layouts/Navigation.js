'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Container, ListGroup, Nav, Navbar } from 'react-bootstrap';
import Logo from '../assets/imgs/Screenshot 2023-07-29 172851.png';
import '../styles/Navigation.scss';
import { IoMdSearch } from 'react-icons/io';
import Cookies from 'js-cookie';
import GioHangNavigation from '@/components/giohang/GioHangNavigation';
import { InfoUser } from '@/containers/context/InfoUser';
import { InFoCart } from '@/containers/context/InFoCart';
import LogOutNavbar from '@/components/header/LogOutNavbar';
import { apiClient } from '@/service/apiServive';

const Navigation = () => {
    const [keySearch, setKeySearch] = useState('');
    const [product, setProduct] = useState([]);
    const timeoutRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdown, setDropDown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const ss_account = Cookies.get('ss_account');
    const account_user = Cookies.get('account_user');

    const handleDropdown = () => {
        setDropDown(prevState => !prevState);
    };


    useEffect(() => {
        if (ss_account && account_user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [ss_account, account_user]);

    useEffect(() => {
        if (keySearch) {
            const fetchData = async () => {
                const response = await apiClient.get(`/search/${keySearch}`);
                return setProduct(response.data);
            }
            // console.log('check re render');
            fetchData();
        }
    }, [keySearch]);

    const handleSearch = useCallback((searchTerm) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setKeySearch(searchTerm);
            // console.log('check re render');
        }, 300);
    }, [setKeySearch]);

    // console.log('check', product && product);
    // console.log('check: ', keySearch);

    return (
        <>
            <Navbar sticky='top' expand="lg" className="bg-green">
                <Container fluid='xl'>
                    <Navbar.Brand href="/" className='nav-link'>
                        <Image
                            src={Logo}
                            width={50}
                            height={50}
                            alt="Ảnh Logo"
                            priority // Ưu tiên tải hình ảnh này
                        />{' '}
                        Nông Sản
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='py-2'>
                        <Nav className="ms-auto">{/* ms-auto chuyển về End me-auto chuyển về Đầu */}
                            <Link href='/' className='nav-link'>Trang chủ</Link>
                            <Link href='/gioi-thieu' className='nav-link'>Giới thiệu</Link>
                            <Link href='/san-pham' className='nav-link'>Sản phẩm</Link>
                            {/* <Link href='/tin-tuc' className='nav-link'>Tin tức</Link> */}
                            <div className="me-lg-1 d-flex flex-wrap gap-2 align-items-center justify-content-between position-relative">
                                <div className='pe-1 w-100 border border-1 rounded-3 d-flex bg-white'>
                                    <Button variant='white' className=''>
                                        <IoMdSearch className='fs-5' />
                                    </Button>
                                    <input type="search"
                                        onChange={(e) => handleSearch(e.target.value)}
                                        ref={dropdownRef}
                                        onClick={handleDropdown}
                                        placeholder="Tìm kiếm..."
                                        className='form-control border border-0'
                                    />
                                </div>
                                <ListGroup style={{ height: '350px' }}
                                    className={`mt-2 z-1 w-100 overflow-auto position-absolute top-100 ${!dropdown && 'd-none'}`}
                                >
                                    {product.length > 0 ?
                                        product.map((item, idx) => (
                                            <ListGroup.Item key={idx}>
                                                <Link href={`/san-pham/${item.SanPhamId}`}
                                                    className='fs-8 text-black text-decoration-none d-flex'
                                                    onClick={() => setDropDown(false)}
                                                >
                                                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${item.HinhAnh[0]?.DuongDanHinh}`}
                                                        width={35}
                                                        height={35}
                                                        alt='Ảnh sản phẩm'
                                                    />
                                                    <div className='ps-1'>
                                                        <span>
                                                            {item.SanPham[0]?.LoaiChiTiet}
                                                        </span>
                                                        <br />
                                                        <span className='fw-bold text-green'>
                                                            {Number(item.SanPham[0]?.Gia).toLocaleString("vi-VN")} VNĐ
                                                        </span>
                                                    </div>
                                                </Link>
                                            </ListGroup.Item>
                                        ))
                                        :
                                        <ListGroup.Item>Không có sản phẩm nào được tìm thấy.</ListGroup.Item>
                                    }
                                </ListGroup>
                            </div>
                        </Nav>
                        {!isAuthenticated ?
                            <div className='d-flex'>
                                <Link href="/dang-nhap" className='nav-link'>Đăng nhập</Link>
                                <span className='mx-1 text-white'>/</span>
                                <Link href="/dang-ky" className='nav-link'>Đăng ký</Link>
                            </div>
                            :
                            <InfoUser>
                                <InFoCart>
                                    <div className='d-lg-flex flex-wrap gap-2 align-items-center justify-content-end'>
                                        <LogOutNavbar />
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