'use client'
import React, { useContext } from 'react';
import '../styles/SidebarNavbar.scss';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Link from 'next/link';
import { FaUser, FaUserTie, FaRegCalendarAlt, FaMusic, FaBook, FaHeadset, FaBell } from "react-icons/fa";
import { HambergerContext } from '@/containers/context/SidebarHamberger';
import { GiGrandPiano } from "react-icons/gi";


const SidebarNavbar = () => {
    const collapsed = useContext(HambergerContext);

    // Tùy chỉnh màu cách thuộc tính
    const menuItemStyles = {
        color: '#f3fffe',
        fontSize: '25px',
        transition: 'color 0.5s ease',
        '&:hover': {
            color: 'white',
            backgroundColor: '#285954',
        },
    };

    return (
        <>
            <Sidebar
                collapsed={collapsed.hamberger}
                // collapsedWidth='79px'//Kích thước thu nhỏ
                width='350px'
                // transitionDuration={300}//Tốc độ đóng mở
                backgroundColor='#2a534f'
            >
                <Menu style={{ height: '100vh' }}
                    menuItemStyles={{
                        button: ({ level }) => {
                            if (level === 0)
                                return {
                                    ...menuItemStyles,
                                };
                        },
                    }}
                >
                    {/* suffix={<FaUser /> Sử dụng để giảo ngược vị trí icon về cuối*/}
                    <MenuItem icon={<FaUser />} component={<Link href="nguoi-dung" />}> Người dùng</MenuItem>
                    <MenuItem icon={<FaUserTie />} component={<Link href="san-pham" />}> Sản phẩm</MenuItem>
                    <MenuItem icon={<FaUserTie />} component={<Link href="loai-san-pham" />}> Loại Sản phẩm</MenuItem>
                    <MenuItem icon={<FaRegCalendarAlt />} component={<Link href="hoa-don" />}> Hóa đơn</MenuItem>
                    <MenuItem icon={<FaRegCalendarAlt />} component={<Link href="don-hang" />}> Đơn Hàng</MenuItem>
                    <MenuItem icon={<FaBell />} component={<Link href="thong-bao" />}> Thông Báo</MenuItem>
                </Menu>
            </Sidebar>
        </>
    );
};

export default SidebarNavbar;