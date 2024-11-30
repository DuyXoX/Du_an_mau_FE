const ValidateChiTietSanPham = (name, value) => {
    let error = '';
    switch (name) {
        case 'loaiChiTiet':
            error = !value ? 'Vui lòng nhập loại chi tiết sản phẩm của bạn' : '';
            break;
        case 'moTaChiTiet':
            error = !value ? 'Vui lòng nhập mô tả chi tiết sản phẩm của bạn' : '';
            break;
        case 'gia':
            error = !value ? 'Vui lòng nhập giá của bạn' : '';
            break;
        case 'soLuongKho':
            error = !value ? 'Vui lòng nhập số lượng kho của bạn' : '';
            break;
        default:
            break;
    }
    return error;
};

export default ValidateChiTietSanPham;