'use client'
import TrangChuMain from '@/components/trangchu/TrangChuMain';
import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Trangchu = () => {
    const showToast = () => {
        toast.success("Operation was successful!", {
            autoClose: 5000, // Thời gian tự động đóng (ms)
        });
    };
    return (
        <>
            <Button onClick={() => { showToast() }}>SHow Toast</Button>
            <TrangChuMain />
        </>
    );
};

export default Trangchu;