"use client"

import React, { useEffect, useState } from "react";
import "./SanPhamMain.scss";
import { useGetData } from "@/service/apiServive";
import HeaderSanPham from "./HeaderSanPham";
import MoTaSanPham from "./MoTaSanPham";
import SanPhamTuongTu from "./SanPhamTuongTu";

const SanPhamMain = ({ id }) => {
  const { data, isLoading, error, mutate } = useGetData(`/sanpham/${id}`)
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  // return console.log('check: ', products);

  if (isLoading) {
    return <div>Loading...</div>; // Hoặc có thể hiển thị một thông báo khác
  }
  if (error) {
    return <div className="">Sản phẩm không tồn tại...</div>
  }

  // console.log('check: ', products;

  return (
    <>
      <HeaderSanPham
        products={products}
      />
      <MoTaSanPham
        products={products}
      />
      <SanPhamTuongTu />
    </>
  );
};

export default SanPhamMain;