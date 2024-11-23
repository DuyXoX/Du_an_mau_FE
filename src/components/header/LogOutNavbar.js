import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { clearCookiesAndRedirect } from '../reuses/Cookie';
import showToast from '../reuses/Toast';
import { postData } from '@/service/apiServive';
import { TbLogout } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const LogOutModal = () => {
    const [dropdown, setDropDown] = useState(false);
    const [username, setUsername] = useState('');
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
                <div className='me-4 ps-4 border-start cursor d-none d-md-inline'>
                    <h5 style={{ fontSize: '0.75rem' }} className='text-center fw-light'>
                        Người Dùng
                    </h5>
                </div>

                <div
                    style={{ padding: '1rem', borderRadius: '0.5rem', position: 'absolute', zIndex: '1', inset: '50px auto auto 0px', transform: 'translate(0px, 48px)', minWidth: '150px', backgroundColor: 'white' }}
                    className={dropdown ? 'dropdown-content' : 'dropdown-content d-none'}>

                    <h6 className='cursor cursor-hover' onClick={() => { router.push('/thong-tin/hoc-vien') }}>Thông tin cá nhân</h6>
                    <LogOutModal />
                </div>
            </div>
            {/* <div className='dropdown d-flex justify-content-center align-items-center'
                ref={dropdownRef}
                onClick={handleDropdown}
            >
                hihi
            </div>
            <FaUserCircle className='fs-1 ms-1 text-white cursor' onClick={() => { setShowLogoutModal(true) }} />
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
            </Modal> */}
        </>
    );
};

export default memo(LogOutModal);