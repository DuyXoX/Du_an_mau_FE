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
<<<<<<< HEAD
    const [formData, setFormData] = useState(typeData);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleClose = (() => {
        setFormData(typeData);
=======
    const id = rowData.rowData?.DonHangId
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const handleClose = (() => {
        setFormData(typeData);
        setErrors(typeData);
>>>>>>> origin/main
        toggleShowUpdateModal(false, null);
    });

    const toggleShowUpdateModal = (e) => {
        setShowUpdateModal(e);
    };

<<<<<<< HEAD
=======
    const handleSubmit = async (e) => {

        try {
            const response = putData(`/donhang/${id}`, formData);
            const { message, warning, error } = response;
            if (response) {
                if (message) {
                    showToast('success', `Điều chỉnh thông tin ${label} thành công.`, loading);
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
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: 'error', isLoading: false, autoClose: 3000 });
            console.error('check error: ', error);
            return;
        }
    }

>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
                <form onSubmit={handleSubmit}>
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
                            Hủy
                        </Button>
                        <Button
                            type='submit'
                            disabled={checkError}
                            variant="green">
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </form>
>>>>>>> origin/main
            </Modal>
        </>
    );
};

export default ViewDonHangChiTiet;