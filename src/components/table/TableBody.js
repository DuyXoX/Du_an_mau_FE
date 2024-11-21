import React, { useContext, useMemo } from 'react';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import NguoiDung from './bodyTable/NguoiDung';
import SanPham from './bodyTable/SanPham';
import LoaiSanPham from './bodyTable/LoaiSanPham';
import DonHang from './bodyTable/DonHang';


const TableBody = () => {
    const { formTable } = useContext(TableInfoContext);
    const tableComponents = useMemo(() => ({//Sử lý data để trả về định dạng
        nguoidung: NguoiDung,
        sanpham: SanPham,
        loaisanpham: LoaiSanPham,
        donhang: DonHang
    }), []);

    const ComponentToRender = tableComponents[formTable] || null;

    // Định dạng số tiền hiển thị
    // const formatCurrency = (value) => {
    //     return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    // };

    // Định dạng giá trị tiền tệ
    // const priceBodyTemplate = (rowData) => formatCurrency(rowData.price);

    // Định dạng rating
    // const ratingBodyTemplate = (rowData) => <Rating value={rowData.rating} readOnly cancel={false} />;
    // Định dạng trạng thái
    // const statusBodyTemplate = (rowData) => <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)} />;

    // Định nghĩa mức độ nghiêm trọng của trạng thái
    // const getSeverity = (data) => {
    // switch (data.inventoryStatus) {
    //     case 'INSTOCK':
    //         return 'success';
    //     case 'LOWSTOCK':
    //         return 'warning';
    //     case 'OUTOFSTOCK':
    //         return 'danger';
    //     default:
    //         return null;
    // }
    // };

    const i = 0;
    // console.log('check re render');

    return (
        <>
            {ComponentToRender ? <ComponentToRender /> : null}
        </>
    );
};

export default TableBody;