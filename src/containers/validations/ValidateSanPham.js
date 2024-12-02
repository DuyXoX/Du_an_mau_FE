const ValidateSanPham = (name, value) => {
    let error = '';
    switch (name) {
        case 'TenSanPham':
            error = !value ? 'Vui lòng nhập tên sản phẩm của bạn' :
                value.length < 8 ? 'Tên sản phẩm của bạn không thể ít hơn 8 ký tự' :
                    value.length > 20 ? 'Tên sản phẩm của bạn không thể dài hơn 8 ký tự' : '';
            break;
        case 'DonViTinhID':
            error = !value ? 'Vui lòng thêm đơn vị tính sản phẩm' : '';
            break;
        case 'LoaiSanPhamId':
            error = !value ? 'Vui lòng thêm loại sản phẩm của bạn' : '';
            break;
        case 'LoaiChiTiet':
            error = !value ? 'Vui lòng nhập loại chi tiết sản phẩm của bạn' : '';
            break;
        case 'Gia':
            error = !value ? 'Vui lòng nhập giá của bạn' : '';
            break;
        case 'SoLuongKho':
            error = !value ? 'Vui lòng nhập số lượng kho của bạn' : '';
            break;
        case 'MoTa':
            error = !value ? 'Vui lòng nhập mô tả của bạn' :
                value.length < 8 ? 'Mô tả phải có ít nhất 8 ký tự' :
                    value.length > 5000 ? 'Mô tả không thể dài hơn 5000 ký tự' : '';
            break;
        // case 'HinhAnh':
        //     error = !value ? 'Vui lòng thêm hình ảnh sản phẩm' : '';
        //     break;
        // default:
        //     break;
    }

    return error;
};

export default ValidateSanPham;