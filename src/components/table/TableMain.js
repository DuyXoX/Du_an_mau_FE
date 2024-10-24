'use client'

import React, { memo, useContext } from 'react';
import './TableMain.scss';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Col, Container, Row } from 'react-bootstrap';
import TableBody from './TableBody';
import { HambergerContext } from '@/containers/context/SidebarHamberger';
import TableHeader from './TableHeader';

const TableMain = () => {
    const { hamberger } = useContext(HambergerContext);

    // console.log('check re render');

    return (
        <section>
            <Container fluid>
                <Row>
                    <Col>
                        <div
                            className={"p-3 rounded bg-white shadow-sm " + (hamberger ? "" : "table-container")}
                        >
                            <div className="card">
                                <TableHeader />
                                <TableBody />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default memo(TableMain);
