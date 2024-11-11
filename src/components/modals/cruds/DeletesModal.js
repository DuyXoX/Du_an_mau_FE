import showToast from '@/components/reuses/Toast';
import { postData } from '@/service/apiServive';
import React, { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DeletesModal = ({ formTable, endpoint, updateData, selectedDatas, toggleSelectedDatas, showDeleteModal, toggleShowDeleteModal }) => {
    // Kiểm tra xem có bao nhiêu hàng đã chọn
    const isMultiple = Array.isArray(selectedDatas) && selectedDatas.length > 1;
    // console.log('check isMultiple: ', isMultiple);
    const tableDatas = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', 'NguoiDungId'],
        ['sanpham', 'SanPhamId'],
        ['loaisanpham', 'LoaiSanPhamId'],

    ]);
    const tableNames = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', 'TenDangNhap'],
        ['sanpham', 'TenSanPham'],
        ['loaisanpham', 'TenLoai'],


    ]);
    const dataId = tableDatas.get(formTable) || '';
    const dataName = tableNames.get(formTable) || '';

    // Lấy danh sách các Datas để gửi tới API xóa nhiều
    const IDs = selectedDatas.map((data) => data[dataId]);//Trả về ["...","..."] là đúng sau đó sử lý ở BE sau!
    // console.log('check: ', IDs);
    // console.log('check selectedDatas: ', selectedDatas[0].username);

    const tableLabels = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', ' người dùng '],
        ['sanpham', ' sản phẩm '],
    ]);

    const label = tableLabels.get(formTable) || '';

    const handleSubmitDelete = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        toggleShowDeleteModal(false);
        try {
            const response = await postData(`${endpoint}/delete`, IDs);//Nhớ dùng post vì delete ko cho gửi data
            const { message, warning, error } = response;
            // console.log('check response: ', error);

            if (response) {
                if (message) {
                    showToast('success', message, loading);
                    await toggleSelectedDatas([]);
                    return await updateData();// Gọi mutate để làm mới dữ liệu từ API
                }
                if (warning) {
                    return showToast('warning', warning, loading);
                }
                if (error) {
                    return showToast('error', error, loading);
                }
            }

        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: "error", isLoading: false, autoClose: 3000 });
            console.error('check error: ', error.message);
            return;
        }
    };

    return (
        <Modal
            show={showDeleteModal}
            onHide={() => toggleShowDeleteModal(false)}
            backdrop="static" //Ngăn chặn việc bấm ra ngoài
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {isMultiple
                        ? `Xác nhận xóa ${selectedDatas.length} ${label}`
                        : selectedDatas ? <p>Xác nhận xóa {label} <span className='text-orange'>{selectedDatas[0]?.[dataName] || ''}</span></p>
                            : ''
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isMultiple
                    ? `Bạn có chắc chắn muốn xóa ${selectedDatas.length} ${label} đã chọn không?`
                    : selectedDatas ? <p>Bạn có chắc chắn muốn xóa {label} tên <span className='text-orange'>{selectedDatas[0]?.[dataName] || ''}</span> không?</p>
                        : ''
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => toggleShowDeleteModal(false)}>
                    Hủy
                </Button>
                <Button variant="green" onClick={() => { handleSubmitDelete() }}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(DeletesModal);