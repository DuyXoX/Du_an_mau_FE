import React from 'react';
import '@/components/inputGroup/InputGroup.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useGetData } from '@/service/apiServive';
import { jwtVerify } from '@/service/jwtAuthen';
import Cookies from 'js-cookie';
import NguoiDungThongTin from './NguoiDungThongTin';
import NguoiDungMatKhau from './NguoiDungMatKhau';

const NguoiDungMain = () => {
    const ss_account = Cookies.get('ss_account');
    const Id = jwtVerify(ss_account)?.id;
    const { data, mutate } = useGetData(`/user/${Id}`);

    // console.log('check: ', Id);

    return (
        <section>
            <Container fluid='xxl'>
                <Row xs={2} style={{ '--bs-gutter-x': 'none', minHeight: '55vh' }} className='p-3 border border-3 rounded-4'>
                    <Col xs={12}>
                        <div className=''>
                            <h2 className=''>
                                Thông tin tài khoản của bạn
                            </h2>
                            <h5 className=''>
                                Quản lý thông tin để bảo mật tài khoản
                            </h5>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='h-100'>
                            <NguoiDungThongTin
                                Id={Id}
                                data={data}
                                mutate={mutate}
                            />
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='h-100 d-flex flex-column justify-content-between'>
                            <NguoiDungMatKhau
                                Id={Id}
                                data={data}
                                mutate={mutate}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NguoiDungMain;