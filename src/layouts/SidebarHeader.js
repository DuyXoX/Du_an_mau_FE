'use client'
import Image from 'next/image';
import React, { useContext } from 'react';
import { Col, Container, Dropdown, Navbar, Row } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { HambergerContext } from '@/containers/context/SidebarHamberger';
import Logo from '../assets/imgs/Screenshot 2023-07-29 172851.png';
import '../styles/SidebarHeader.scss';

import { memo } from 'react';
import { HeadeTitleContext } from '@/containers/context/HeadeTitle';
import LogOut from '@/components/header/LogOut';
import { InfoUserContext } from '@/containers/context/InfoUser';


const SidebarHeader = () => {
    const { info } = useContext(InfoUserContext);
    const context = useContext(HambergerContext);
    const { headTitle } = useContext(HeadeTitleContext);

    // console.log('check: ', context);
    // console.log('check contextInfo: ', context.info);

    return (
        <header>
            <div className='d-flex'>
                <Container
                    style={{ width: !context.hamberger ? '349px' : '79px', minWidth: !context.hamberger ? '349px' : '79px', transition: 'all 0.3s' }}
                    className='logo bg-green d-flex align-items-center'>
                    <Navbar.Brand href="/" className='fs-3 text-white'>
                        <Image
                            src={Logo}
                            width={50}
                            height={50}
                            alt="Ảnh Logo"
                            className='rounded-pill'
                            priority // Ưu tiên tải hình ảnh này
                        />
                        <span className='d-none d-xl-inline'>
                            {!context.hamberger ? 'Nông Sản' : ''}
                        </span>
                    </Navbar.Brand>
                </Container>
                <Container fluid>
                    <Row className='py-3 bg-light justify-content-between align-items-center'>
                        <Col sm={8} className='col-hamberger'>
                            <div className='d-flex align-items-center'>
                                <div className=''>
                                    <label className="buttons__burger me-4">
                                        <input onClick={() => { context.toggleHamberger() }} type="checkbox" id="burger" />
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </label>
                                </div>
                                <div className=''>
                                    <h3 className='mb-0 fw-semibold d-none d-sm-block'>{headTitle}</h3>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4} className='col-hamberger'>
                            <div className='d-flex justify-content-end align-items-center'>
                                <Dropdown className=''>
                                    <Dropdown.Toggle className='p-2 me-4 rounded-pill' variant='light' id="dropdown-basic">
                                        <FaBell className='ic-bell fs-3 text-body-tertiary' />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="">Hiện không có thông báo nào</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <LogOut
                                    info={info}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </header>
    );
};

export default memo(SidebarHeader);