import { deleteData } from '@/service/apiServive';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';

const DeleteModal = ({ item, updateData }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const toggleShowDeleteModal = (e) => {
        setShowDeleteModal(e);
    };

    const handleDelete = async (item) => {
        const sanphamToUpdate = {
            SanPhamId: item.SanPhamId,
            ChiTietSanPhamId: item.Gia.ChiTietSanPhamId,
        };

        try {
            await deleteData(`/${sanphamToUpdate.SanPhamId}/${sanphamToUpdate.ChiTietSanPhamId}`, sanphamToUpdate);
            await updateData();
            return toggleShowDeleteModal(false);
        } catch (error) {
            console.error('Error: ', error.message);
            return;
        }
    }
    // return console.log('check: ', item);

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
                        Xác nhận xóa <span className='text-green'>{item?.TenSanPham}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm <span className='text-green'>{item?.TenSanPham}</span> ra khỏi giỏ hàng không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => toggleShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="green" onClick={() => { handleDelete(item) }}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default DeleteModal;