import { clearCookiesAndRedirect } from '@/components/reuses/Cookie';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const URL = process.env.NEXT_PUBLIC_API_URL || 'https://nodejs-setup.onrender.com/api';
// console.log('check api: ', URL);

const apiClient = axios.create({ // Tạo một instance của axios với cấu hình cơ bản
    baseURL: URL, // Địa chỉ API server Node.js của bạn
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,// Đảm bảo gửi cookie cùng với các request
});

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
        mutate,
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
        const response = await error.response?.data?.error || 'Đã xảy ra lỗi trong quá trình gửi dữ liệu';
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
        const response = await error.response?.data?.error || 'Đã xảy ra lỗi trong quá trình sửa dữ liệu';
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
        const response = await error.response?.data?.error || 'Đã xảy ra lỗi trong quá trình xóa dữ liệu';
        console.error('Error deleting data:', response);
        throw error;
    }
};

export { apiClient, useGetData, postData, putData, deleteData };

// Ví Dụ Với GET Data
// import { getData } from '@/service/apiService';
// import useSWR from 'swr';

// const HomePage = () => {
// const { data, error, isLoading, mutate } = useGetData('/items');// Địa chỉ endpoint URL trên server Node.js
// if (isLoading) return <div>Loading...</div>;
// if (error) return <div>Error loading data</div>;
//   return (
// <div>
//                 <h1>Data from API</h1>
//                 {data?.map((items) => {
//                     return (
//                         <div key={items._id}>
//                             <h3>{items.username}</h3>
//                             <p>{items.email}</p>
//                             <p>{items.password}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//   );
// };

// export default HomePage;

//Ví Dụ Với POST Data

// pages/addItem.js
// import { useState } from 'react';
// import { postData } from '@/services/apiService';

// const AddItemPage = () => {
// const [formData, setFormData] = useState({
//     username: '',
//     email: ''
// });

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//     }));
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await postData('/user', formData);
//         alert('Gửi yêu cầu thành công!');
//     } catch (error) {
//         alert('Có lỗi xảy ra khi gửi yêu cầu.');
//     }
// };
// console.log('check data: ', formData);

//   return (
//     <div>
// <input type="text" name='username' required autoComplete="off"
//                                             value={formData.username}
//                                             onChange={handleChange}
//                                         />
//                   <input type="text" name='email' required autoComplete="off"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                         />
//     </div>
//   );
// };

// export default AddItemPage;


//Ví Dụ Với PUT Data

// pages/updateItem.js
// import { useState } from 'react';
// import { putData } from '../services/apiService';

// const UpdateItemPage = () => {
//   const [itemId, setItemId] = useState('');
//   const [itemName, setItemName] = useState('');

//   const handleUpdateItem = async () => {
//     try {
//       const updatedItem = await putData(`/items/${itemId}`, { name: itemName });
// mutate();//Xác nhận lại dữ liệu
//       console.log('Item updated:', updatedItem);
//     } catch (error) {
//       console.error('Error updating item:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Update Item</h1>
//       <input
//         type="text"
//         value={itemId}
//         onChange={(e) => setItemId(e.target.value)}
//         placeholder="Item ID"
//       />
//       <input
//         type="text"
//         value={itemName}
//         onChange={(e) => setItemName(e.target.value)}
//         placeholder="New Item Name"
//       />
//       <button onClick={handleUpdateItem}>Update Item</button>
//     </div>
//   );
// };

// export default UpdateItemPage;

//Ví Dụ Với DELETE Data

// pages/deleteItem.js
// import { useState } from 'react';
// import { deleteData } from '../services/apiService';

// const DeleteItemPage = () => {
//   const [itemId, setItemId] = useState('');

//   const handleDeleteItem = async () => {
//     try {
//       await deleteData(`/items/${itemId}`);
// mutate();//Xác nhận lại dữ liệu
//       console.log('Item deleted');
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Delete Item</h1>
//       <input
//         type="text"
//         value={itemId}
//         onChange={(e) => setItemId(e.target.value)}
//         placeholder="Item ID"
//       />
//       <button onClick={handleDeleteItem}>Delete Item</button>
//     </div>
//   );
// };