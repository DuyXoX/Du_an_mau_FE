const ValidateMatKhauNguoiDung = (name, value, formData) => {
    let error = '';
    switch (name) {
        case 'MatKhau':
            error = !value ? 'Vui lòng nhập mật khẩu của bạn' :
                value.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự' :
                    value.length > 20 ? 'Mật khẩu không thể dài hơn 20 ký tự' : '';
            break;
        case 'confirmPassword':
            error = !value ? 'Vui lòng nhập mật khẩu của bạn' :
                value.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự' :
                    value.length > 20 ? 'Mật khẩu không thể dài hơn 20 ký tự' :
                        value !== formData.MatKhau ? 'Mật khẩu xác thực phải giống nhau' : '';
            break;
        default:
            break;
    }
    return error;
};

export default ValidateMatKhauNguoiDung;