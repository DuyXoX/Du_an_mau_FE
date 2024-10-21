'use client'

import axios from 'axios';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';



const SignupLogin = () => {
    const token = Cookies.get('ss_account');
    const router = useRouter();

    const checkLogin = async (response) => {
        if (!token && window.location.pathname !== '/dang-nhap') {
            toast.warning('Bạn chưa đăng nhập!', {
                onClose: () => {
                    router.push('dang-nhap')
                }
            });
            throw new axios.Cancel('No token available'); // Hủy request hiện tại
        }
        throw response;
    };


    return {
        checkLogin,

    }
};

export default SignupLogin;