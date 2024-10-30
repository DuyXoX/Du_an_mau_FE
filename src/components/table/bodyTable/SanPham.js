import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import TableTitle from '../TableTitle';
import UpdateModal from '@/components/modals/cruds/UpdateModal';
import DeleteModal from '@/components/modals/cruds/DeleteModal';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import { TableContext } from '@/containers/context/getdata/TableData';
import Image from 'next/image';

const SanPham = () => {
    const { datas, updateData, selectedDatas, toggleSelectedDatas } = useContext(TableContext);//Lấy data đã có trong context
    const { formTable, endpoint } = useContext(TableInfoContext);
    const [globalFilter, setGlobalFilter] = useState(null); // Bộ lọc tìm kiếm toàn cục
    const timeoutRef = useRef(null);

    // Bộ lọc tìm kiếm với độ trễ 300ms khi người dùng nhập
    const handleSearch = useCallback((searchTerm) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setGlobalFilter(searchTerm);
        }, 300);
    }, []);

    const ImageProduct = (e) => {
        return (
            <>
                <Image src={e} width={50} height={50} alt='Ảnh sản phẩm' />
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
            <Column field="TenSanPham" header="Tên Sản Phẩm" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="MoTa" header="Mô Tả" sortable style={{ maxWidth: '3rem' }} className='text-truncate'></Column>
            <Column field="Gia" header="Giá" sortable style={{ maxWidth: '8rem' }} className='text-truncate'></Column>
            <Column field="SoLuongKho" header="Số Lượng Kho" sortable style={{ maxWidth: '8rem' }} className='text-truncate'></Column>
            <Column field="LoaiSanPhamId" header="Loại" sortable style={{ maxWidth: '8rem' }} className='text-truncate'></Column>
            <Column field="HinhAnh" header="Hình" sortable body={(e) => { ImageProduct(e.value) }}></Column>
            <Column header="Tùy chọn" body={OptionEditDelete}></Column>
        </DataTable>
    );
};

export default memo(SanPham);