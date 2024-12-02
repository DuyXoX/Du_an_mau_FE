import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import TableTitle from '../TableTitle';
import UpdateModal from '@/components/modals/cruds/UpdateModal';
import DeleteModal from '@/components/modals/cruds/DeleteModal';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import { TableContext } from '@/containers/context/getdata/TableData';
import Image from 'next/image';
import { useGetData } from '@/service/apiServive';
import ChiTietSanPham from '@/containers/quanly/ChiTietSanPham';

const SanPham = () => {
    const { datas, updateData, selectedDatas, toggleSelectedDatas } = useContext(TableContext);//Lấy data đã có trong context
    const { formTable, endpoint } = useContext(TableInfoContext);
    const [globalFilter, setGlobalFilter] = useState(null); // Bộ lọc tìm kiếm toàn cục
    const timeoutRef = useRef(null);
    const { data: LoaiSanPham, error: errLSP } = useGetData('/loaisp');

    // const { data: ChiTietSamPham, error: errCTSP } = useGetData('/chitietsp');
    // console.log('check: ', ChiTietSamPham && ChiTietSamPham);

    // Bộ lọc tìm kiếm với độ trễ 300ms khi người dùng nhập
    const handleSearch = useCallback((searchTerm) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setGlobalFilter(searchTerm);
        }, 300);
    }, []);
    const MoTaProduct = (rowData) => {
        // console.log('check: ', rowData.MoTa);
        return (
            <>
                <div>
                    {rowData?.MoTa}
                </div>
                {/* <div dangerouslySetInnerHTML={{ __html: rowData?.MoTa }} /> */}
            </>
        )
    }
    const PhanLoai = (rowData) => {
        // console.log('check: ', rowData.PhanLoai[0]?.ChiTietSanPhamId);
        return (
            <>
                <ChiTietSanPham
                    rowData={rowData}
                    updateData={updateData}
                />
            </>
        )
    }
    const TenLoai = (rowData) => {
        // console.log('check: ', rowData.LoaiSanPhamId);
        // console.log('check LoaiSanPham: ', LoaiSanPham && LoaiSanPham);

        // Tìm loại sản phẩm dựa trên LoaiSanPhamId
        const loaiSP = LoaiSanPham?.find(item => item.LoaiSanPhamId === rowData.LoaiSanPhamId);
        // Nếu tìm thấy, lấy TenLoai, nếu không thì trả về một giá trị mặc định
        const tenLoai = loaiSP ? loaiSP.TenLoai : 'Không xác định';

        return (
            <div>
                {tenLoai}
            </div>
        )
    }
    const ImageProduct = (rowData) => {
        // console.log('check: ', rowData.HinhAnh[0].DuongDanHinh);
        return (
            <>
                {rowData?.HinhAnh && rowData.HinhAnh.length > 0 && (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${rowData.HinhAnh[0].DuongDanHinh}`} // Chỉ hiển thị hình ảnh đầu tiên
                        width={80}
                        height={80}
                        alt='Ảnh sản phẩm'
                    />
                )}
            </>
        )
    }

    // Thực hiện lấy data của hàng và thực hiện trức năng (logic lấy data đc thư viện PrimeReact thực hiện từ DataTable)
    const OptionEditDelete = useCallback((rowData) => {
        return (<>
            <UpdateModal
                formTable={formTable}
                rowData={rowData}
                endpoint={endpoint}
                updateData={updateData}
            />
            <DeleteModal
                formTable={formTable}
                rowData={rowData}
                endpoint={endpoint}
                updateData={updateData}
            />
        </>)
    }, [formTable, endpoint, updateData]);
    // console.log('check: ', datas);

    return (
        <>
            <DataTable
                resizableColumns
                value={datas}
                selection={selectedDatas}
                onSelectionChange={(e) => toggleSelectedDatas(e.value)} // Cập nhật giá trị khi chọn dòng
                dataKey="SanPhamId" //Key dử liệu
                paginator //Phân trang
                rows={10} //Số hàng mặc định
                rowsPerPageOptions={[5, 10, 25]}
                globalFilter={globalFilter} //Lọc tìm
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Hiển thị {first} đến {last} của {totalRecords} dữ liệu"
                header={<TableTitle handleSearch={handleSearch} />}
            >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="SanPhamId" header="ID" sortable style={{ maxWidth: '3rem' }} className="text-truncate"></Column>
                <Column field="HinhAnh" header="Hình" sortable body={ImageProduct}></Column>
                <Column field="TenSanPham" header="Tên Sản Phẩm" sortable style={{ maxWidth: '8rem' }}></Column>
                <Column field="MoTa" header="Mô Tả" sortable style={{ maxWidth: '3rem' }} className='text-truncate' body={MoTaProduct}></Column>
                <Column field="PhanLoai" header="Phân Loại" sortable style={{ maxWidth: '8rem' }} className='text-truncate' body={PhanLoai}></Column>
                <Column field="LoaiSanPhamId" header="Loại" sortable style={{ maxWidth: '8rem' }} className='text-truncate' body={TenLoai}></Column>
                <Column header="Tùy chọn" body={OptionEditDelete}></Column>
            </DataTable>
        </>
    );
};

export default memo(SanPham);