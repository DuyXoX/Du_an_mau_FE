import React, { useContext } from 'react';
import './GioHangMain.scss';
import TableGioHang from './TableGioHang';
import ThanhToanGioHang from './ThanhToanGioHang';
import { Col, Container, Row } from 'react-bootstrap';
import { InfoUserContext } from '@/containers/context/InfoUser';

const GioHangMain = () => {
    const { isAuthenticated, info } = useContext(InfoUserContext);
    // console.log('check: ', info);

    return (
        <section>
            <Container>
                <Row style={{ minHeight: '55vh' }}>
                    {isAuthenticated ?
                        <>
                            <Col xs={12}>
                                <div className=''>
                                    <TableGioHang />
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className=''>
                                    <ThanhToanGioHang info={info} />
                                </div>
                            </Col>
                        </>
                        :
                        ''
                    }

                </Row>
            </Container>
        </section>
    );
};

export default GioHangMain;