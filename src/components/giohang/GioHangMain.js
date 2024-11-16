import React from 'react';
import './GioHangMain.scss';
import TableGioHang from './TableGioHang';
import ThanhToanGioHang from './ThanhToanGioHang';
import { Col, Container, Row } from 'react-bootstrap';

const GioHangMain = () => {
    return (
        <section>
            <Container>
                <Row style={{ minHeight: '55vh' }}>
                    <Col lg={8}>
                        <div className=''>
                            <TableGioHang />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className=''>
                            <ThanhToanGioHang />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default GioHangMain;