const ValidateThongTinNguoiDung = (name, value) => {
    let error = '';
    switch (name) {
        case 'TenDangNhap':
            error = !value ? 'Vui lòng nhập tên đăng nhập của bạn' :
                value.length < 8 ? 'Tên đăng nhập của bạn không thể ít hơn 8 ký tự' :
                    value.length > 20 ? 'Tên đăng nhập của bạn không thể dài hơn 8 ký tự' : '';
            break;
        case 'Account':
            error = !value ? 'Vui lòng nhập tài khoản của bạn' :
                value.length < 8 ? 'Tài khoản phải có ít nhất 8 ký tự' :
                    value.length > 50 ? 'Tài khoản không thể dài hơn 50 ký tự' : '';
            break;
        case 'DiaChi':
            error = !value ? 'Vui lòng nhập địa chỉ của bạn' :
                value.length < 8 ? 'Địa chỉ phải có ít nhất 8 ký tự' :
                    value.length > 50 ? 'Địa chỉ không thể dài hơn 50 ký tự' : '';
            break;
        case 'SoDienThoai':
            error = !value ? 'Vui lòng nhập số điện thoại của bạn' :
                value.length < 10 ? 'Số điện thoại phải có ít nhất 10 ký tự' :
                    value.length > 10 ? 'Số điện thoại không thể dài hơn 10 ký tự' : '';
            break;
        default:
            break;
    }
    return error;
};

export default ValidateThongTinNguoiDung;