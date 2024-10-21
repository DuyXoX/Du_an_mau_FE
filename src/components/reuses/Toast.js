import { toast } from 'react-toastify';

const showToast = (type, message, loading = null) => {
    if (loading) {
        // Cập nhật toast đang loading
        toast.update(loading, { render: message, type, isLoading: false, autoClose: 3000 });
    } else {
        // Tạo toast mới
        toast[type](message, { autoClose: 3000 });
    }
};
export default showToast;

// Cách sử dụng showToast:
// showToast('success', message, loading);
// showToast('success', 'Yêu cầu thành công!');
// showToast('error', 'Có lỗi xảy ra!');
// showToast('warning', 'Cảnh báo!');
// showToast('info', 'Thông tin thêm');
