import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginScreen.css';
import { Link } from 'react-router-dom';


function RegisterScreen() {
    

    return (
        <div className="loginScreen">
            <div className="loginScreen__container">
                <div>
                    <img src="/logo_instagram.png" alt="logo" />
                </div>
                <Formik
                    initialValues={{ email: '', username: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                        .email('\u2715 Địa chỉ Email không hợp lệ')
                        .required('\u2715 Vui lòng nhập Email'),
                        username: Yup.string()
                        .min(3, 'Phải chứa ít nhất 3 ký tự')
                        .required('\u2715 Vui lòng nhập tên người dùng'),
                        password: Yup.string()
                        .min(3, 'Phải chứa ít nhất 3 ký tự')
                        .required('\u2715 Vui lòng nhập mật khẩu'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        }, 400);
                    }}
                    >
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" component="div" />

                        <label htmlFor="username">Tên người dùng</label>
                        <Field name="username" type="username" />
                        <ErrorMessage name="username" component="div" />

                        <label htmlFor="password">Mật khẩu</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit">Đăng ký</button>
                    </Form>
                </Formik>
                <div>
                    <p>Bạn đã có tài khoản ?  <Link to="/login">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;
