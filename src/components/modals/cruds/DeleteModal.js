import showToast from '@/components/reuses/Toast';
import { deleteData } from '@/service/apiServive';
import React, { memo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const DeleteModal = ({ formTable, rowData, endpoint, updateData }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const tableLabels = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', ' người dùng '],
        ['sanpham', ' sản phẩm '],
    ]);
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

    const label = tableLabels.get(formTable) || '';
    const dataId = tableDatas.get(formTable) || '';
    const dataName = tableNames.get(formTable) || '';

    const toggleShowDeleteModal = (e) => {
        setShowDeleteModal(e);
    };

    const handleSubmitDelete = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        const ID = rowData[dataId];
        // console.log('check: ', ID);
        toggleShowDeleteModal(false);
        try {
            const response = await deleteData(`${endpoint}/${ID}`);
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Xóa ${label} thành công.`, loading);
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
            console.error('check error: ', error);
            return;
        }
    }

    // console.log('check re render');

    return (
        <>
            <Button variant="outline-danger"
                className='rounded-pill'
                onClick={() => toggleShowDeleteModal(true)}
            >
                <FaRegTrashAlt />
            </Button>
            <Modal
                show={showDeleteModal}
                onHide={() => toggleShowDeleteModal(false)}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Xác nhận xóa <span className='text-green'>{rowData?.[dataName]}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa {label} tên <span className='text-green'>{rowData?.[dataName]}</span> không?
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
        </>
    );
};

export default memo(DeleteModal);