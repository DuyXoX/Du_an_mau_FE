import React, { memo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import showToast from '@/components/reuses/Toast';
import { toast } from 'react-toastify';
import { postData } from '@/service/apiServive';
import InputFormChiTietSanPham from '@/components/inputGroup/inputform/InputFormChiTietSanPham';
import ValidateChiTietSanPham from '@/containers/validations/ValidateChiTietSanPham';
import { IoMdAdd } from "react-icons/io";

const AddModal = ({ typeData, endpoint, rowData, updateData }) => {
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const validate = ValidateChiTietSanPham;

    const handleClose = (() => {
        setFormData(typeData);
        setErrors(typeData);
        toggleShowAddModal(null);
    });

    const toggleShowAddModal = (e) => {
        setShowAddModal(e);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        const newErrors = {
            ...errors,
            [name]: validate(name, value),
        };

        setErrors(newErrors);

        // Kiểm tra nếu không có lỗi nào thì cập nhật checkError thành false
        if (Object.values(newErrors).every((error) => error === '')) {
            setCheckError(false);
        } else {
            setCheckError(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            formErrors[key] = validate(key, formData[key]);
        });

        if (Object.values(formErrors).some((error) => error !== '')) {
            setErrors(formErrors);
            // console.log('check formErrors', formErrors);
            return;
        }
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true)

        // return console.log('check formData: ', formData);

        try {
            const response = await postData(endpoint, formData);
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Thêm chi tiết sản phẩm mới thành công`, loading);
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
            console.error('check error: ', error.message);
            return;
        }
    };

    const editData = (data) => {
        // console.log('check:', data);
        setFormData(prevData => ({
            ...prevData,
            sanPhamId: data.SanPhamId, // Cập nhật chỉ SanPhamId
            chiTietSanPhamId: data.ChiTietSanPhamId
        }));
        toggleShowAddModal(true);
    };

    // console.log('check:', formData);
    // console.log('check re render');

    return (
        <>
            <Button variant='outline-success'
                style={{ width: '50px', height: '50px' }}
                className='rounded-circle'
                onClick={() => editData(rowData)}
            >
                <IoMdAdd />
            </Button>{' '}

            <Modal
                size='xl'
                show={showAddModal}
                onHide={() => { handleClose() }}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-orange'>Thêm chi tiết sản phẩm mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputFormChiTietSanPham
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
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
            </Modal>
        </>
    );
};

export default memo(AddModal);