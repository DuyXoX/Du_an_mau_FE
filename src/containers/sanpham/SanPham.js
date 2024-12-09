'use client'

import React, { useEffect, useState } from 'react';
import styles from '../../app/product/ProductCard.module.css';
import Link from 'next/link';
import { useGetData } from '@/service/apiServive';
import Image from 'next/image';
import { Button, Col, Container, Placeholder, Row } from 'react-bootstrap';

const SanPham = () => {
    const { data: categories } = useGetData('/loaisp');
    const { data: productData } = useGetData('/sanpham');
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [btnActive, setBtnAcvite] = useState('');

    // Hàm chuẩn hóa chuỗi (xóa dấu)
    const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Kiểm tra nếu dữ liệu sản phẩm đã được lấy
        if (productData) {
            setSearchResults(productData); // Cập nhật kết quả tìm kiếm với dữ liệu lấy được
        }
    }, [productData]);

    // Hàm xử lý khi nhấn nút "Lọc"
    const handleFilterClick = () => {
        let filteredProducts = productData;

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase()); // Chuẩn hóa từ khóa tìm kiếm
            filteredProducts = filteredProducts.filter(product =>
                removeDiacritics(product.TenSanPham.toLowerCase()).includes(normalizedSearchTerm) // Lọc sản phẩm theo tên
            );
        }
        // Lọc theo loại sản phẩm đã chọn
        if (selectedCategoryId) {
            filteredProducts = filteredProducts.filter(product => product.LoaiSanPhamId === selectedCategoryId);
        }
        // Lọc theo giá
        if (minPrice) {
            filteredProducts = filteredProducts.filter(product => product.Gia >= minPrice);
        }
        if (maxPrice) {
            filteredProducts = filteredProducts.filter(product => product.Gia <= maxPrice);
        }
        // Cập nhật kết quả tìm kiếm
        setSearchResults(filteredProducts);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId); // Cập nhật ID loại sản phẩm đã chọn
        handleFilterClick(); // Gọi hàm lọc sản phẩm ngay lập tức
        setBtnAcvite(categoryId);
    };

    // { console.log('check: ', searchResults) }

    return (
        <section>
            <Container fluid='xxl'>
                <Row>
                    <Col xs={12} md={9} className='order-1'>
                        <Row xs={1} sm={3} lg={4} className='g-3'>
                            {searchResults.length > 0 ? (
                                searchResults.map((product, idx) => (
                                    <Col key={idx}>
                                        <div className="rounded shadow-sm bg-white">
                                            <div className="ratio ratio-1x1">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${product.HinhAnh[0]?.DuongDanHinh}`}
                                                    className="object-fit-cover rounded-top"
                                                    alt={product?.TenSanPham}
                                                    width={250}
                                                    height={250}
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h5 className='text-truncate'>{product.TenSanPham}</h5>
                                                {product.PhanLoai?.length > 0 && (
                                                    <p>
                                                        Giá:
                                                        {product.PhanLoai[0]?.Gia}
                                                        VNĐ
                                                    </p>
                                                )}
                                                <p className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.MoTa }} />
                                                <Link href={`/san-pham/${product?.SanPhamId}`} className="btn btn-green mt-auto">
                                                    Xem Sản Phẩm
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : !productData ?
                                Array(8).fill(null).map((_, idx) => (
                                    <Col key={idx}>
                                        <div className="h-100 rounded shadow-sm bg-white">
                                            <Placeholder as="p" animation="glow" >
                                                <Placeholder xs={12}
                                                    style={{ height: '200px' }}
                                                    className='rounded-top'
                                                />
                                            </Placeholder>
                                            <Placeholder as="div" animation="glow" >
                                                <Placeholder xs={8}
                                                    style={{ height: '1.5rem' }}
                                                    className='rounded'
                                                />
                                            </Placeholder>
                                            <Placeholder as="p" animation="glow" >
                                                <Placeholder xs={6}
                                                    className='rounded'
                                                />
                                            </Placeholder>
                                        </div>
                                    </Col>
                                ))
                                :
                                <Col>
                                    <div className="text-center">Không có sản phẩm nào</div>
                                </Col>
                            }
                        </Row>
                    </Col>

                    <Col xs={3} className='order-0 d-none d-md-block'>
                        <div className='p-3 rounded shadow-sm bg-white'>
                            <div className=''>
                                <h4 className='fw-bold text-truncate'>Danh Sách Loại Sản Phẩm</h4>
                                <div className=''>
                                    {categories && categories.length > 0 ? (
                                        categories.map((category, idx) => (
                                            <div key={idx}>
                                                <Button variant='outline-success'
                                                    style={{ '--bs-btn-active-bg': '#2a534f' }}
                                                    className='mb-2 w-100 categoryButton'
                                                    active={btnActive === category.LoaiSanPhamId ? true : false}
                                                    onClick={() => handleCategoryClick(category.LoaiSanPhamId)}
                                                >
                                                    {category.TenLoai}
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                            <h2 className={styles.title}>Tìm kiếm sản phẩm</h2>
                            <div className={styles.searchSection}>
                                <div className={styles.searchInputContainer}>
                                    <input
                                        type="text"
                                        placeholder="Tìm sản phẩm..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                    <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35M12 4a8 8 0 108 8 8.01 8.01 0 00-8-8z" />
                                    </svg>
                                </div>
                                <h4 className={styles.title2}>Lọc Giá Sản Phẩm</h4>
                                <div className={styles.priceFilter}>

                                    <input
                                        type="number"
                                        placeholder="Giá tối thiểu"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className={styles.priceInput}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Giá tối đa"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className={styles.priceInput}
                                    />
                                </div>
                                <Button variant='green'
                                    className=''
                                    onClick={handleFilterClick}
                                >
                                    Lọc
                                </Button>
                                <Button variant='outline-success'
                                    className=''
                                    onClick={() => setSearchResults(productData)}
                                >
                                    Bỏ Lọc
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </section>
    );
};

export default SanPham;