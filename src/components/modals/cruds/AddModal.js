import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import showToast from '@/components/reuses/Toast';
import { toast } from 'react-toastify';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import InputFormNguoiDung from '@/components/inputGroup/inputform/InputFormNguoiDung';
import { postData } from '@/service/apiServive';
import InputFormSanPham from '@/components/inputGroup/inputform/InputFormSanPham';

const AddModal = ({ formTable, endpoint, updateData, showAddModal, toggleShowAddModal }) => {
    const { typeData, validate } = useContext(TableInfoContext);
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);

    const tableLabels = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', ' người dùng '],
        ['sanpham', ' sản phẩm '],
    ]);
    const tableComponents = useMemo(() => ({//Sử lý data để trả về định dạng
        nguoidung: InputFormNguoiDung,
        sanpham: InputFormSanPham,
    }), []);

    const label = tableLabels.get(formTable) || '';
    const ComponentToRender = tableComponents[formTable] || null;

    const handleClose = (() => {
        setFormData(typeData);
        setErrors(typeData);
        toggleShowAddModal(null);
    });

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => {
            if (name === 'HinhAnh' && files) {
                // Cập nhật formData với file ảnh duy nhất
                return { ...prevData, [name]: files[0] };
            }
            return { ...prevData, [name]: value };
        });
        // setFormData((prevData) => ({
        //     ...prevData,
        //     [name]: value,
        // }));

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
    }, [errors, validate, setFormData]);

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

        // console.log('check formData: ', formData);
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true);

        // Tạo FormData và thêm từng trường vào
        const uploadData = new FormData();
        Object.keys(formData).forEach((key) => {
            uploadData.append(key, formData[key]);
        });
        // console.log("Upload Data:", Array.from(uploadData.entries()));

        try {
            const response = await postData(endpoint, uploadData);
            const { message, warning, error } = response;
            // console.log('check response: ', response);

            if (response) {
                if (message) {
                    showToast('success', `Thêm ${label} mới thành công`, loading);
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
    // console.log('check re render');

    return (
        <Modal
            show={showAddModal}
            onHide={() => { handleClose() }}
            backdrop="static" //Ngăn chặn việc bấm ra ngoài
        >
            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-orange'>
                        Thêm {label} mới
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ComponentToRender ?
                        <ComponentToRender
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />
                        : null}
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
    );
};

export default memo(AddModal);