import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import showToast from '@/components/reuses/Toast';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import { Button, Modal } from 'react-bootstrap';
import { FaPen } from "react-icons/fa";
import { toast } from 'react-toastify';
import InputFormNguoiDung from '@/components/inputGroup/inputform/InputFormNguoiDung';
import { putData } from '@/service/apiServive';
import InputFormSanPham from '@/components/inputGroup/inputform/InputFormSanPham';
import InputFormLoaiSanPham from '@/components/inputGroup/inputform/InputFormLoaiSanPham';
import InputFormChiTietSanPham from '@/components/inputGroup/inputform/InputFormChiTietSanPham';
import ValidateChiTietSanPham from '@/containers/validations/ValidateChiTietSanPham';

const UpdateModal = ({ typeData, endpoint, rowData, value, updateData, children }) => {
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const validate = ValidateChiTietSanPham;

    const handleClose = (() => {
        setFormData(typeData);
        setErrors(typeData);
        toggleShowUpdateModal(false, null);
    });

    const toggleShowUpdateModal = (e) => {
        setShowUpdateModal(e);
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

    const handleSubmitEdit = async (e) => {
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
        const Id = formData?.chiTietSanPhamId;
        setCheckError(true);

        // return console.log('check: ', Id);

        try {
            const response = await putData(`${endpoint}/${Id}`, formData);//Lưu ý check uploadData hình ảh phải có dịnh binary
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Điều chỉnh thông tin thành công.`, loading);
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
    };

    const editData = (rowData, data) => {
        const SanPhamId = rowData?.SanPhamId
        // console.log('check:', SanPhamId);
        // console.log('check:', data);

        setFormData(prevData => ({
            ...prevData,
            sanPhamId: SanPhamId, // Cập nhật chỉ SanPhamId
            chiTietSanPhamId: data.ChiTietSanPhamId,
            loaiChiTiet: data.LoaiChiTiet,
            moTaChiTiet: data.MoTaChiTiet,
            gia: data.Gia,
            soLuong: data.SoLuong,
        }));
        toggleShowUpdateModal(true);
    };

    // console.log('check: ', rowData);
    // console.log('check re render');


    return (
        <>
            {/* Thực hiện lấy data của hàng và thực hiện trức năng (logic lấy data đc thư viện PrimeReact thực hiện từ DataTable) */}
            <div style={{ fontSize: 'xx-small', backgroundColor: 'var(--bs-info)' }}
                className='p-1 rounded text-white'
                onClick={() => editData(rowData, value)}
            >
                {children}
            </div>{' '}

            <Modal
                size='xl'
                show={showUpdateModal}
                onHide={() => { handleClose() }}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <form onSubmit={handleSubmitEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-orange'>Điều chỉnh thông tin</Modal.Title>
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

export default memo(UpdateModal);