import React from 'react';
import './GioHangMain.scss';
import TableGioHang from '@/app/gio-hang/page';
import ThanhToanGioHang from './ThanhToanGioHang';
import { Col, Container, Row } from 'react-bootstrap';

const GioHangMain = () => {
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
          <div className="">
            <TableGioHang />
          </div>
        </Container>
      </section>
    );
};

export default GioHangMain;