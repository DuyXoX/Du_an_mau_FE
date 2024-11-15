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
        ['loaisanpham', ' loại sản phẩm '],

    ]);
    const tableDatas = new Map([//Sử lý data để trả về định dạng
        ['nguoidung', 'NguoiDungId'],
        ['sanpham', 'SanPhamId'],
        ['loaisanpham', 'LoaiSanPhamId'],
    ]);
    const tableComponents = useMemo(() => ({//Sử lý data để trả về định dạng
        nguoidung: InputFormNguoiDung,
        sanpham: InputFormSanPham,
        loaisanpham: InputFormLoaiSanPham,

    }), []);

    const label = tableLabels.get(formTable) || '';
    const dataId = tableDatas.get(formTable) || '';
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
        const { name, value, files } = e.target;
        setFormData((prevData) => {
            if (name === 'HinhAnh' && files) {
                // Cập nhật formData với tất cả file ảnh
                return { ...prevData, [name]: Array.from(files) }; // Chuyển đổi FileList thành mảng
            }
            return { ...prevData, [name]: value };
        });

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
        let uploadData;
        // Kiểm tra xem formData có chứa file không
        const hasFile = Object.values(formData).some(value => Array.isArray(value) && value.length > 0);

        if (hasFile) {
            // Sử dụng FormData nếu có file
            uploadData = new FormData();
            Object.keys(formData).forEach((key) => {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(file => {
                        uploadData.append(key, file); // Thêm từng file vào FormData
                    });
                } else {
                    uploadData.append(key, formData[key]);
                }
            });
        } else {
            // Gửi dữ liệu dạng JSON nếu không có file
            uploadData = formData;
        }
        const Id = formData[dataId];
        const loading = toast.loading('Đang xử lý yêu cầu.');
        setCheckError(true);

        // return console.log('check formData: ', Id);

        try {
            const response = await putData(`${endpoint}/${Id}`, uploadData);//Lưu ý check uploadData hình ảh phải có dịnh binary
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
        const keysToNormalize = ['DonViTinhID', 'LoaiSanPhamId']; // Danh sách các thuộc tính cần xử lý
        const normalizedData = normalizeData(data, keysToNormalize);

        // Tạo một đối tượng chứa các thuộc tính cần thiết dựa trên loại dữ liệu
        const additionalData = {};

        switch (formTable) {
            case 'sanpham':
                additionalData.ChiTietSanPhamId = data.PhanLoai[0]?.ChiTietSanPhamId || '';
                additionalData.LoaiChiTiet = data.PhanLoai[0]?.LoaiChiTiet || '';
                additionalData.Gia = data.PhanLoai[0]?.Gia || '';
                additionalData.SoLuong = data.PhanLoai[0]?.SoLuong || '';
                break;
            case 'nguoidung':
                // Thêm các thuộc tính cần thiết cho người dùng nếu có
                break;
            case 'loaisanpham':
                // Thêm các thuộc tính cần thiết cho loại sản phẩm nếu có
                break;
            default:
                break;
        }

        // Cập nhật formData chỉ với các thuộc tính cần thiết
        setFormData({
            ...normalizedData,
            ...additionalData
        });
        toggleShowUpdateModal(true);
    };

    // console.log('check: ', rowData);
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
                size='xl'
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