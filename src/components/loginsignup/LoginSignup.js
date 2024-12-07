import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '@/components/inputGroup/InputGroup.scss';
import LoginSignupOne from './LoginSignupOne';
import LoginSignupTwo from './LoginSignupTwo';
import LoginSignupThree from './LoginSignupThree';

const LoginSignup = ({ login, formData, errors, checkError, handleChange, handleSubmit }) => {

    return (
        <section>
            <Container>
                <Row style={{ '--bs-gutter-x': 'none', border: '3px solid #c4efca' }} className='rounded-5'>
                    <LoginSignupOne />
                    <Col className='d-flex justify-content-center'>
                        <div style={{ maxWidth: '400px' }} className='px-3 my-5 w-100'>
                            <div className='mb-5'>
                                <h2 className='fs-1 text-orange text-center'>
                                    {login ? 'Đăng nhập' : 'Đăng ký'}
                                </h2>
                            </div>

                            <LoginSignupTwo
                                login={login}
                                formData={formData}
                                errors={errors}
                                checkError={checkError}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                            <div className='py-3 fancy-title text-center'>
                                Hoặc
                            </div>
                            <LoginSignupThree />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoginSignup;