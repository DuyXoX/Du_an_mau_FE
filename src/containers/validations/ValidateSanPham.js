const ValidateSanPham = (name, value) => {
    let error = '';
    switch (name) {
        case 'TenSanPham':
            error = !value ? 'Vui lòng nhập tên sản phẩm của bạn' :
                value.length < 8 ? 'Tên sản phẩm của bạn không thể ít hơn 8 ký tự' :
                    value.length > 20 ? 'Tên sản phẩm của bạn không thể dài hơn 8 ký tự' : '';
            break;
        case 'MoTa':
            error = !value ? 'Vui lòng nhập mô tả của bạn' :
                value.length < 8 ? 'Mô tả phải có ít nhất 8 ký tự' :
                    value.length > 500 ? 'Mô tả không thể dài hơn 500 ký tự' : '';
            break;
        case 'Gia':
            error = !value ? 'Vui lòng nhập giá của bạn' : '';
            break;
        case 'SoLuongKho':
            error = !value ? 'Vui lòng nhập số lượng kho của bạn' : '';
            break;
        case 'LoaiSanPhamId':
            error = !value ? 'Vui lòng nhập loại sản phẩm của bạn' : '';
            break;
        case 'HinhAnh':
            error = !value ? 'Vui lòng nhập mật khẩu của bạn' : '';
            break;
        default:
            break;
    }
    return error;
};

export default ValidateSanPham;