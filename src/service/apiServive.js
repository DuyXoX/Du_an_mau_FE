'use client'
import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import useSWR from 'swr';


const URL = process.env.NEXT_PUBLIC_API_URL || ' http://localhost:8000/api';
// console.log('check api: ', URL);

const apiClient = axios.create({ // Tạo một instance của axios với cấu hình cơ bản
    baseURL: URL, // Địa chỉ API server Node.js của bạn
    withCredentials: true,// Đảm bảo gửi cookie cùng với các request
});

const addAuthHeader = (config) => {
    const token = Cookies.get('ss_account');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

// Helper để xử lý lỗi 401 và làm mới token
const handleAuthError = async (error) => {
    const originalRequest = error.config;
    const token = Cookies.get('ss_account');
    // if (error.response?.status === 403) {
    //     toast.warning('Bạn không có quyền truy cập!')
    // }

    if (error.response?.status === 401 && !originalRequest._retry) {
        // originalRequest._retry = true;

        // // Nếu không có token hoặc request là để refresh token thì không cố gắng refresh
        // if (!token || originalRequest.url.includes('/refreshtoken')) {
        clearCookiesAndRedirect();
        //     return Promise.reject(error);
        // }

        // try {
        //     const response = await apiClient.post('/refreshtoken');
        //     const newToken = response.data.ss_account;
        //     Cookies.set('ss_account', newToken, { secure: true, httpOnly: false, expires: 30 });
        //     apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        //     originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        //     return apiClient(originalRequest);
        // } catch (refreshError) {
        //     clearCookiesAndRedirect();
        //     return Promise.reject(refreshError);
        // }
    } else {
        clearCookiesAndRedirect();
        return Promise.reject(error);
    }
};

const checkLogin = async () => {
    const token = Cookies.get('ss_account');

    if (!token && window.location.pathname !== '/dang-nhap') {
        toast.warning('Vui lòng đăng nhập!', {
            onClose: () => {
                window.location.replace('/dang-nhap');
            }
        });
        return false; // Trả về false nếu không có token    
    }
    return true; // Trả về true nếu đã đăng nhập
}
apiClient.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));

// Interceptor để xử lý các lỗi từ server
apiClient.interceptors.response.use((response) => response, handleAuthError);

const fetcher = async (url) => {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.warning(error.response?.data, { isLoading: false, autoClose: 3000 })
            return;
        }
        console.error('Error fetching data:', error?.response);
        throw error;// Ném lỗi để SWR xử lý
    }
};

const useGetData = (endpoint) => {
    const { data, error, mutate } = useSWR(endpoint,
        fetcher,
        {//Để không gọi lại api
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    return {
        data,
        error,
        isLoading: !error && !data,
        mutate,//Dùng để lấy lại data mới nhất
    };
};

const postData = async (endpoint, data) => {
    const loggedIn = await checkLogin();
    if (!loggedIn) return; // Kiểm tra đăng nhập trước khi gửi request

    try {
        const response = await apiClient.post(endpoint, data);
        // console.log('check response post: ', response);
        return response.data;// Trả về toàn bộ phản hồi từ server
    } catch (error) {
        const response = await error.response.data.error || 'Đã xảy ra lỗi trong quá trình gửi dữ liệu';
        console.error('Error posting data:', response);
        throw error; // Ném lại lỗi nếu cần xử lý ở cấp cao hơn
    }
};

const putData = async (endpoint, data) => {
    const loggedIn = await checkLogin();
    if (!loggedIn) return;// Kiểm tra đăng nhập trước khi gửi request

    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;// Trả về toàn bộ phản hồi từ server
    } catch (error) {
        const response = await error.response.data.error || 'Đã xảy ra lỗi trong quá trình sửa dữ liệu';
        console.error('Error updating data:', response);
        throw error;
    }
};

const deleteData = async (endpoint) => {
    const loggedIn = await checkLogin();
    if (!loggedIn) return; // Kiểm tra đăng nhập trước khi gửi request

    try {
        const response = await apiClient.delete(endpoint);
        return response.data;// Trả về toàn bộ phản hồi từ server
    } catch (error) {
        const response = await error.response.data.error || 'Đã xảy ra lỗi trong quá trình xóa dữ liệu';
        console.error('Error deleting data:', response);
        throw error;
    }
};
// Hàm xóa sản phẩm trong giỏ hàng
// Hàm xóa sản phẩm trong giỏ hàng
const deleteCartProduct = async (sanPhamId, chiTietSanPhamId) => {
    try {
        const response = await axios.delete('http://localhost:8000/api/cart', {
            data: {
                SanPhamId: sanPhamId,
                ChiTietSanPhamId: chiTietSanPhamId
            },
            withCredentials: true, // Đảm bảo gửi cookie
        });

        console.log('Response từ API:', response);  // Log phản hồi từ API

        return response; // Trả về toàn bộ response từ API
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        throw error; // Ném lỗi để được bắt ở phần handleDeleteProduct
    }
};


// Hàm lấy thông tin người dùng từ token
const checkLogintoken = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/user/check-login`, {
            withCredentials: true, // Cho phép gửi cookie cùng với yêu cầu
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
    }
};





export { apiClient, useGetData, postData, putData, deleteData, checkLogin, checkLogintoken, deleteCartProduct };