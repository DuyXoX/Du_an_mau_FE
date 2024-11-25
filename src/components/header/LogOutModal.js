import React, { memo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { clearCookiesAndRedirect } from '../reuses/Cookie';
import showToast from '../reuses/Toast';
import { postData } from '@/service/apiServive';
import { TbLogout } from "react-icons/tb";

const LogOutModal = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [formData, setFormData] = useState({
        ss_account: ''
    });

    const handleLogout = async () => {
        setShowLogoutModal(false);
        const loading = toast.loading('Đang xử lý yêu cầu.');
        try {
            const response = await postData('/logout', formData);
            const { message, error } = response;
            // console.log('check response: ', error);

            if (response && message) {
                clearCookiesAndRedirect();
                showToast('success', message, loading)
                // console.log('check test');
                // setCheckError(true)
                return;
            }

            if (response && error) {
                showToast('error', error, loading)
                // setCheckError(true)
                return;
            }

        } catch (error) {
            toast.update(loading, { render: 'Có lỗi xảy ra khi gửi yêu cầu.', type: "error", isLoading: false, autoClose: 3000 });
            console.error('check error: ', error);
            return;
        }

        // console.log('check ss_account: ', ss_account);            
    }

    return (
        <>
            <p className='cursor cursor-hover' onClick={() => { setShowLogoutModal(true) }}>Đăng xuất</p>
            {/* <TbLogout className='fs-1 ms-1 text-white cursor' onClick={() => { setShowLogoutModal(true) }} /> */}
            <Modal
                show={showLogoutModal}
                onHide={() => setShowLogoutModal(false)}
                backdrop="static" //Ngăn chặn việc bấm ra ngoài
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn đăng xuất không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="green" onClick={() => { handleLogout() }}>
                        Đăng xuất
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default memo(LogOutModal);