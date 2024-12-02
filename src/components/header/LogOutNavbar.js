'use client'

import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { clearCookiesAndRedirect } from '../reuses/Cookie';
import showToast from '../reuses/Toast';
import { postData } from '@/service/apiServive';
import { FaUser } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const LogOutModal = () => {
    const [dropdown, setDropDown] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [formData, setFormData] = useState({
        ss_account: ''
    });

    const handleDropdown = () => {
        setDropDown(prevState => !prevState);
    };

    // Hàm xử lý khi click ra ngoài dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropDown(false);
            return;
        }
        return;
    };
    // console.log('check: ', info);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            <div className='dropdown d-flex justify-content-center align-items-center'
                ref={dropdownRef}
                onClick={handleDropdown}
            >
                <Button variant='green'
                    className='border rounded-circle'
                >
                    <FaUser className='fs-6 text-white cursor' />
                </Button>
                <div
                    style={{ padding: '1rem', borderRadius: '0.5rem', position: 'absolute', zIndex: '1', inset: '0px auto auto 0px', transform: 'translate(0px, 48px)', minWidth: '180px', backgroundColor: 'white' }}
                    className={dropdown ? 'dropdown-content' : 'dropdown-content d-none'}>
                    <h6 className='cursor cursor-hover' onClick={() => { router.push('/thong-tin/nguoi-dung') }}>Thông tin cá nhân</h6>
                    <h6 className='cursor cursor-hover' onClick={() => { router.push('/thong-tin/don-hang') }}>Đơn hàng</h6>
                    <span className='cursor cursor-hover' onClick={() => { setShowLogoutModal(true) }}>Đăng xuất</span>
                </div>
            </div>

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