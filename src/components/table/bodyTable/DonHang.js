import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import TableTitle from '../TableTitle';
import UpdateModal from '@/components/modals/cruds/UpdateModal';
import DeleteModal from '@/components/modals/cruds/DeleteModal';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import { TableContext } from '@/containers/context/getdata/TableData';
import Image from 'next/image';
import ViewDonHangChiTiet from '@/components/modals/cruds/chitietdonhang/ViewDonHangChiTiet';

const DonHang = () => {
    const { datas, updateData, selectedDatas, toggleSelectedDatas } = useContext(TableContext);//Lấy data đã có trong context
    const { formTable, endpoint } = useContext(TableInfoContext);
    const [globalFilter, setGlobalFilter] = useState(null); // Bộ lọc tìm kiếm toàn cục
    const timeoutRef = useRef(null);

    const statusColor = {
        '': "transparent", // Không có trạng thái
        "dangxu ly": "orange",
        'hoantat': '#00b356',
        'huy': '#ff5757'
    };

    const statusType = {
        'dangxu ly': 'Đang sử lý',
        'hoantat': 'Hoàn tất',
        'huy': 'Đã hủy'
    }

    // Bộ lọc tìm kiếm với độ trễ 300ms khi người dùng nhập
    const handleSearch = useCallback((searchTerm) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setGlobalFilter(searchTerm);
        }, 300);
    }, []);

    const status = (rowData) => {
        const color = statusColor[rowData?.TrangThai] || "transparent"; // Mặc định là trong suốt nếu không có trạng thái
        return (
            <div style={{ backgroundColor: color }} className='text-center text-white rounded'>
                {statusType[rowData?.TrangThai] || "Chưa xác định"}
            </div>
        );
    }

    // Thực hiện lấy data của hàng và thực hiện trức năng (logic lấy data đc thư viện PrimeReact thực hiện từ DataTable)
    const OptionEditDelete = useCallback((rowData) => {
        return (<>
            <ViewDonHangChiTiet
                rowData={rowData}
            />
        </>)
    }, []);
    // console.log('check: ', datas);


    return (
        <DataTable
            resizableColumns
            value={datas}
            selection={selectedDatas}
            onSelectionChange={(e) => toggleSelectedDatas(e.value)} // Cập nhật giá trị khi chọn dòng
            dataKey="DonHangId" //Key dử liệu
            paginator //Phân trang
            rows={10} //Số hàng mặc định
            rowsPerPageOptions={[5, 10, 25]}
            globalFilter={globalFilter} //Lọc tìm
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Hiển thị {first} đến {last} của {totalRecords} dữ liệu"
            header={<TableTitle handleSearch={handleSearch} />}
        >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column field="DonHangId" header="ID" sortable style={{ maxWidth: '3rem' }}></Column>
            <Column field="TenDangNhap" header="Tên Người Dùng" sortable style={{ maxWidth: '8rem' }} className="text-truncate"></Column>
            <Column field="DiaChi" header="Địa Chỉ" sortable style={{ maxWidth: '8rem' }} className="text-truncate"></Column>
            <Column field="SoDienThoai" header="Số Điện Thoại" sortable style={{ maxWidth: '8rem' }} className="text-truncate"></Column>
            <Column field="TongTien" header="Tổng Tiền" sortable style={{ maxWidth: '5rem' }} className="text-truncate"></Column>
            <Column field="TrangThai" header="Trạng Thái" sortable style={{ maxWidth: '5rem' }} body={status}></Column>
            <Column header="Tùy chọn" body={OptionEditDelete}></Column>
        </DataTable>
    );
};

export default memo(DonHang);