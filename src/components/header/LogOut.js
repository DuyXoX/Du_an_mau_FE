import Image from 'next/image';
import React, { memo, useEffect, useRef, useState } from 'react';
import avatar from '../../assets/imgs/Screenshot 2023-07-29 172851.png';
import { useRouter } from 'next/navigation';
import LogOutModal from './LogOutModal';

const LogOut = ({ info }) => {
    const [dropdown, setDropDown] = useState(false);
    const [username, setUsername] = useState('');
    const dropdownRef = useRef(null);
    const router = useRouter();

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
        const userName = info.infoUser?.TenDangNhap;
        setUsername(userName);
        // return console.log('check contextInfo: ', userName);

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [info]);

    // console.log('check Info: ', info);
    // console.log('check username: ', username);
    // console.log('check dropdown: ', dropdown);
    // console.log('check re render');

    return (
        <div className='dropdown d-flex justify-content-center align-items-center'
            ref={dropdownRef}
            onClick={handleDropdown}
        >
            <div className='me-4 ps-4 border-start cursor d-none d-md-inline'>
                <h5 style={{ fontSize: '0.75rem' }} className='text-center fw-light'>
                    Người Dùng
                    <p className='fs-5 fw-semibold mb-0'>{username ? username : 'Tên'}</p>
                </h5>
            </div>
            <div className='cursor'>
                <Image
                    className='img-avatar rounded-pill'
                    src={avatar}
                    width={75}
                    height={75}
                    alt='ảnh người dùng'
                />
            </div>
            <div
                style={{ padding: '1rem', borderRadius: '0.5rem', position: 'absolute', zIndex: '1', inset: '50px auto auto 0px', transform: 'translate(0px, 48px)', minWidth: '150px', backgroundColor: 'white' }}
                className={dropdown ? 'dropdown-content' : 'dropdown-content d-none'}>

                <h6 className='cursor cursor-hover' onClick={() => { router.push('/thong-tin/nguoi-dung') }}>Thông tin cá nhân</h6>
                <LogOutModal />
            </div>
        </div>
    );
};

export default memo(LogOut);