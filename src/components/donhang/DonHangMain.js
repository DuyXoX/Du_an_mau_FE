import React from 'react';
import './GioHangMain.scss';
import DonHang from '@/app/don-hang/page';
import ThanhToanGioHang from './ThanhToanGioHang';
import { Col, Container, Row } from 'react-bootstrap';

const DonHangMain = () => {
    return (
        <section>
            <Container>
                {/* <Row style={{ minHeight: '100vh' }}>
                    <Col lg={0}>
                       
                    </Col>
                    <Col lg={0}>
                        <div className=''>
                            <ThanhToanGioHang />
                        </div>
                    </Col>
                </Row> */}
                 <div className=''>
                            <DonHang/>
                        </div>
            </Container>
        </section>
    );
};

export default DonHangMain;