const ValidateLoaiSanPham = (name, value) => {
    let error = '';
    switch (name) {
        case 'TenLoai':
            error = !value ? 'Vui lòng nhập tên loại sản phẩm của bạn' :
                value.length < 8 ? 'Tên loại sản phẩm của bạn không thể ít hơn 8 ký tự' :
                    value.length > 20 ? 'Tên loại sản phẩm của bạn không thể dài hơn 8 ký tự' : '';
            break;
        default:
            break;
    }
    return error;
};

export default ValidateLoaiSanPham;