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
import { Button, Form } from 'react-bootstrap';
import showToast from '@/components/reuses/Toast';
import { toast } from 'react-toastify';
import { putData } from '@/service/apiServive';

const DonHang = () => {
    const { datas, updateData, selectedDatas, toggleSelectedDatas } = useContext(TableContext);//Lấy data đã có trong context
    const timeoutRef = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null); // Bộ lọc tìm kiếm toàn cục
    const [statusMap, setStatusMap] = useState({}); // Thêm state để lưu trạng thái cho từng hàng
    const [showUpdateStatus, setShowUpdateStatus] = useState(null); // Thêm state để lưu ID của hàng đang được cập nhật

    const statusColor = {
        '': "transparent", // Không có trạng thái
        "dangxu ly": "orange",
        'chogiaohang': '#94ff00',
        'hoantat': '#00b356',
        'danggiao': '#12e5e5',
        'huy': '#ff5757'
    };

    const statusType = {
        'dangxu ly': 'Đang sử lý',
        'chogiaohang': 'Chờ giao hàng',
        'danggiao': 'Đang giao',
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
    const viewChiTiet = useCallback((rowData) => {
        return (<>
            <ViewDonHangChiTiet
                rowData={rowData}
            />
        </>)
    }, []);
    // console.log('check: ', statusMap);

    const statusTemplate = (rowData) => {
        const isEditing = showUpdateStatus === rowData.DonHangId; // Kiểm tra xem hàng này có đang được chỉnh sửa không

        return (
            <>
                {isEditing ? (
                    <>
                        <Form.Select size="sm"
                            className='p-1'
                            value={statusMap[rowData.DonHangId] || ''}
                            onChange={(e) => setStatusMap({ ...statusMap, [rowData.DonHangId]: e.target.value })}
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="dangxu ly">Đang xử lý</option>
                            <option value="chogiaohang">Chờ giao hàng</option>
                            <option value="danggiao">Đang giao</option>
                            <option value="hoantat">Hoàn tất</option>
                            <option value="huy">Hủy</option>
                        </Form.Select>
                        <div className='pt-2 d-flex justify-content-evenly'>
                            <Button variant='green'
                                size='sm'
                                onClick={() => handleSubmit(rowData.DonHangId)} // Gọi hàm cập nhật với ID của đơn hàng
                            >
                                Cập nhật
                            </Button>
                            <Button variant='danger'
                                size='sm'
                                onClick={() => setShowUpdateStatus(false)}
                            >
                                Hủy
                            </Button>
                        </div>
                    </>
                ) : (
                    <div
                        style={{ backgroundColor: statusColor[rowData?.TrangThai] || "transparent" }}
                        className='text-center text-white rounded'
                        onClick={() => {
                            setShowUpdateStatus(rowData.DonHangId); // Lưu ID của hàng đang được chỉnh sửa
                            setStatusMap({ ...statusMap, [rowData.DonHangId]: rowData.TrangThai }); // Gán giá trị hiện tại vào statusMap
                        }}
                    >
                        {statusType[rowData?.TrangThai] || "Chưa xác định"}
                    </div>
                )}
            </>
        );
    };

    const handleSubmit = async (donHangId) => {
        const loading = toast.loading('Đang xử lý yêu cầu.');

        const formData = {
            DonHangId: donHangId,
            TrangThai: statusMap[donHangId],
        };
        // return console.log('check: ', donHangId);
        try {
            const response = await putData(`/donhang/${donHangId}`, formData);
            const { message, warning, error } = response;

            if (response) {
                if (message) {
                    showToast('success', `Điều chỉnh trạng thái đơn hàng thành công.`, loading);
                    await updateData();// Gọi mutate để làm mới dữ liệu từ API
                    return setShowUpdateStatus(false)
                }
                if (warning) {
                    return showToast('warning', warning, loading);
                }
                if (error) {
                    return showToast('error', error, loading);
                }
            }
        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: 'error', isLoading: false, autoClose: 3000 });
            console.error('check error: ', error);
            return;
        }
    }

    // console.log('check: ', updateStatus);


    return (
        <DataTable
            resizableColumns
            value={datas}
            dataKey="DonHangId" //Key dử liệu
            paginator //Phân trang
            rows={10} //Số hàng mặc định
            rowsPerPageOptions={[5, 10, 25]}
            globalFilter={globalFilter} //Lọc tìm
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Hiển thị {first} đến {last} của {totalRecords} dữ liệu"
            header={<TableTitle handleSearch={handleSearch} />}
        >
            <Column field="DonHangId" header="ID" sortable style={{ maxWidth: '3rem' }}></Column>
            <Column field="TenDangNhap" header="Tên Người Dùng" sortable style={{ maxWidth: '8rem' }} className="text-truncate"></Column>
            <Column field="DiaChi" header="Địa Chỉ" sortable style={{ maxWidth: '8rem' }} className="text-truncate"></Column>
            <Column field="SoDienThoai" header="Số Điện Thoại" sortable style={{ maxWidth: '8rem' }} className="text-truncate"></Column>
            <Column field="TongTien" header="Tổng Tiền" sortable style={{ maxWidth: '5rem' }} className="text-truncate"></Column>
            <Column field="TrangThai" header="Trạng Thái" sortable style={{ maxWidth: '6rem' }} body={statusTemplate}></Column>
            <Column header="Tùy chọn" body={viewChiTiet}></Column>
        </DataTable>
    );
};

export default memo(DonHang);