import InputFormChiTietDonHang from '@/components/inputGroup/inputform/InputFormChiTietDonHang';
import { putData, useGetData } from '@/service/apiServive';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewDonHangChiTiet = (rowData) => {
    const typeData = {
        DonHangId: '',
        TrangThai: '',
        DiaChi: '',
        SoDienThoai: '',
        TongTien: '',
        PhuongThuc: ''
    };
    const [formData, setFormData] = useState(typeData);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleClose = (() => {
        setFormData(typeData);
        toggleShowUpdateModal(false, null);
    });

    const toggleShowUpdateModal = (e) => {
        setShowUpdateModal(e);
    };

    const editData = (data) => {
        // const SanPhamId = rowData?.SanPhamId
        // console.log('check:', data);
        const chitiet = data?.rowData;
        setFormData({ ...chitiet })

        toggleShowUpdateModal(true);
    };

    // console.log('check: ', formData);

    return (
        <>
            <Button variant="outline-info"
                style={{ '--bs-btn-hover-color': 'white', '--bs-btn-active-color': 'light' }}
                className='rounded-pill'
                onClick={() => editData(rowData)}
            >
                Xem chi tiết
            </Button>{' '}

            <Modal
                size='xl'
                show={showUpdateModal}
                onHide={() => { handleClose() }}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-orange'>Thông tin chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputFormChiTietDonHang
                        formData={formData}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => { handleClose() }}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewDonHangChiTiet;