import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import showToast from '@/components/reuses/Toast';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';
import { Button, Modal } from 'react-bootstrap';
import { FaPen } from "react-icons/fa";
import { toast } from 'react-toastify';
import InputFormNguoiDung from '@/components/inputGroup/inputform/InputFormNguoiDung';
import { putData } from '@/service/apiServive';

const UpdateModal = ({ formTable, endpoint, rowData, updateData }) => {
    // console.log('check formTable: ', formTable);
    const { typeData, validate } = useContext(TableInfoContext);
    const [formData, setFormData] = useState(typeData);
    const [errors, setErrors] = useState(typeData);
    const [checkError, setCheckError] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const tableLabels = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', ' người dùng '],
        ['sanpham', ' sản phẩm '],
    ]);
    const tableComponents = useMemo(() => ({//Sử lý data để trả về định dạng
        hocvien: InputFormNguoiDung,
    }), []);

    const label = tableLabels.get(formTable) || '';
    const ComponentToRender = tableComponents[formTable] || null;

    const handleClose = (() => {
        setFormData(typeData);
        setErrors(typeData);
        toggleShowUpdateModal(false, null);
    });

    const toggleShowUpdateModal = (e) => {
        setShowUpdateModal(e);
    };

    const handleChange = useCallback((e) => {
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
    }, [errors, validate, setFormData]);

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
        const userId = formData._id;
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true);

        // console.log('check formData: ', userId);

        try {
            const response = await putData(`${endpoint}/${userId}`, formData);
            // const response = await postData('/user', formData);
            const { message, warning, error } = response;
            // console.log('check response: ', response);

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
    };

    const normalizeData = (data, keys) => {//Sửa lỗi selection khi input báo đỏ
        const normalizedData = { ...data };
        keys.forEach(key => {
            if (Array.isArray(normalizedData[key])) {
                normalizedData[key] = normalizedData[key][0] || ''; // Lấy giá trị đầu tiên nếu là mảng
            }
        });
        return normalizedData;
    };

    const editData = (data) => {
        // console.log('check data: ', data);
        const keysToNormalize = ['role', 'expertise']; // Danh sách các thuộc tính cần xử lý
        const normalizedData = normalizeData(data, keysToNormalize);
        setFormData(normalizedData);
        toggleShowUpdateModal(true)
    };
    // console.log('check re render');


    return (
        <>
            {/* Thực hiện lấy data của hàng và thực hiện trức năng (logic lấy data đc thư viện PrimeReact thực hiện từ DataTable) */}
            <Button variant="outline-info"
                style={{ '--bs-btn-hover-color': 'white', '--bs-btn-active-color': 'light' }}
                className='rounded-pill'
                onClick={() => editData(rowData)}
            >
                <FaPen />
            </Button>{' '}

            <Modal
                show={showUpdateModal}
                onHide={() => { handleClose() }}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <form onSubmit={handleSubmitEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-orange'>Điều chỉnh thông tin {label}</Modal.Title>
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
                            variant="orange">
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default memo(UpdateModal);