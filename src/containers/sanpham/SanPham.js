'use client'

import React, { useEffect, useState } from 'react';
import styles from '../../app/product/ProductCard.module.css';
import Link from 'next/link';
import { useGetData } from '@/service/apiServive';
import Image from 'next/image';
import { Button, Col, Container, Row } from 'react-bootstrap';

const SanPham = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    // const { data: categories, error: categoryError } = useGetData('/categories'); // Lấy danh sách loại sản phẩm
    const { data: categories } = useGetData('/loaisp');
    const { data: productData } = useGetData('/sanpham');


    // Hàm chuẩn hóa chuỗi (xóa dấu)
    const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const [searchResults, setSearchResults] = useState([]);

    //   const { data: productData, error } = useGetData(`/search?name=${searchTerm}`);

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
    };

    // { console.log('check: ', productData) }

    return (
        <section>
            <Container fluid='xxl'>
                <Row>
                    <Col>
                        <div className=''>
                            <div className={styles.productList}>
                                {searchResults.length > 0 ? (
                                    searchResults.map((product, index) => (
                                        <div key={product.id || index} className={styles.card}>
                                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${product.HinhAnh[0]?.DuongDanHinh}`}
                                                // style={{ maxWidth: '200px', height: '200px' }}
                                                // className='w-100 h-auto'
                                                width={180}
                                                height={180}
                                                alt={product?.TenSanPham}
                                            />
                                            <h3 className={styles.productName}>{product.TenSanPham}</h3>
                                            {/* Hiển thị chi tiết sản phẩm đầu tiên */}
                                            {product.PhanLoai && product.PhanLoai.length > 0 && (
                                                <div className={styles.productDetails}>

                                                    <div className={styles.detail}>
                                                        {/* <p>Loại Chi Tiết: {product.Gia[0].LoaiChiTiet}</p> */}
                                                        <p>Giá:
                                                            {product.PhanLoai[0]?.Gia}
                                                            VNĐ</p>
                                                        {/* <p>Số Lượng: {product.Gia[0].SoLuong}</p> */}
                                                    </div>
                                                </div>
                                            )}
                                            <p className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.MoTa }} />
                                            <Link href={`/san-pham/${product?.SanPhamId}`}
                                                className='btn btn-green'
                                            >
                                                Xem Sản Phẩm
                                            </Link>
                                        </div>


                                    ))

                                ) : (
                                    <div className={styles.kothaysanpham} >

                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className={styles.sanpham1}>
                <div className={styles.sanpham}>

                    <div className={styles.container}>
                        <div className={styles.categoryContainer}>
                            <h1 className={styles.title00}>Danh Sách Loại Sản Phẩm</h1>
                            <div className={styles.categoryList}>
                                {categories && categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <div key={category.id || index} className={styles.categoryItem}>
                                            <button
                                                className={styles.categoryButton}
                                                onClick={() => {

                                                    handleCategoryClick(category.LoaiSanPhamId); // Gọi hàm để lọc sản phẩm
                                                }}
                                            >
                                                {category.TenLoai}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </div>
                        <h1 className={styles.title}>Tìm kiếm sản phẩm</h1>
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
                            <h1 className={styles.title2}>Lọc Giá Sản Phẩm</h1>
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
                            <button className={styles.filterButton} onClick={handleFilterClick}>Lọc</button>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
};

export default SanPham;