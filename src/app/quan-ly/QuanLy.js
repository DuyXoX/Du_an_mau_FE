'use client'
import React, { lazy, Suspense, useContext } from 'react';
import { InfoUserContext } from '@/containers/context/InfoUser';

const SidebarHeader = lazy(() => import('@/layouts/SidebarHeader'));
const SidebarNavbar = lazy(() => import('@/layouts/SidebarNavbar'));
const LoadPage = lazy(() => import('@/components/loading/LoadPage'));

const QuanLy = ({ children }) => {
    const { isAuthenticated } = useContext(InfoUserContext);
    // console.log('checck context: ', isAuthenticated);

    return (
        <Suspense fallback={<LoadPage />}>
            {isAuthenticated ?
                <>
                    <SidebarHeader />
                    <div className="d-flex">
                        <SidebarNavbar />
                        <main className="w-100">
                            {children}
                        </main>
                    </div>
                </>
                :
                <LoadPage />
            }
        </Suspense>
    );
};

export default QuanLy;