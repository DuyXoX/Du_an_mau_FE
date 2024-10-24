const ValidateHocVien = (name, value) => {
    let error = '';
    switch (name) {
        case 'username':
            error = !value ? 'Vui lòng nhập tên của bạn' :
                value.length < 8 ? 'Tên của bạn không thể ít hơn 8 ký tự' :
                    value.length > 20 ? 'Tên của bạn không thể dài hơn 8 ký tự' : '';
            break;
        case 'account':
            error = !value ? 'Vui lòng nhập tài khoản của bạn' :
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 'Định dạng email của bạn chưa đúng' :
                    value.length > 50 ? 'Email không thể dài hơn 50 ký tự' : '';
            break;
        case 'password':
            error = !value ? 'Vui lòng nhập mật khẩu của bạn' :
                value.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự' :
                    value.length > 20 ? 'Mật khẩu không thể dài hơn 20 ký tự' : '';
            break;
        case 'role':
            error = !value ? 'Vui lòng nhập quyền hạn' : '';
            break;
        default:
            break;
    }
    return error;
};

export default ValidateHocVien;