import showToast from '@/components/reuses/Toast';
import { deleteData } from '@/service/apiServive';
import React, { memo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const DeleteModal = ({ typeData, endpoint, rowData, updateData }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const toggleShowDeleteModal = (e) => {
        setShowDeleteModal(e);
    };

    const handleSubmitDelete = async () => {
        const loading = toast.loading('Đang xử lý yêu cầu.');
        const ID = rowData?.ChiTietSanPhamId;
        // return console.log('check: ', rowData);
        // console.log('check: ', ID);
        toggleShowDeleteModal(false);
        try {
            const response = await deleteData(`${endpoint}/${ID}`);
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Xóa chi tiết sản phẩm thành công.`, loading);
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
            <Button variant='danger'
                style={{ fontSize: '10px', width: '20px', height: '20px' }}
                className='badge border-light rounded-circle position-absolute top-0 start-100 translate-middle'
                onClick={() => toggleShowDeleteModal(true)}
            >
                X
            </Button>
            <Modal
                show={showDeleteModal}
                onHide={() => toggleShowDeleteModal(false)}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Xác nhận xóa <span className='text-green'>{rowData?.LoaiChiTiet}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa chi tiết sản phẩm <span className='text-green'>{rowData?.LoaiChiTiet}</span> không?
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