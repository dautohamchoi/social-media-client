import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginScreen.css';
import { Link, useHistory } from 'react-router-dom';
import { REGISTER_USER } from '../../queries/userQuery';
import { useMutation } from '@apollo/client';


function RegisterScreen() {
    const history = useHistory();
    const [userRegister, { loading, error }] = useMutation(REGISTER_USER, {
        onCompleted ({ userRegister }) {
            // Cookie.set('userInfo', userLogin);
            if (userRegister.id) {
                alert('Tạo tài khoản thành công.')
                history.push('/accounts/login');
            } else {
                alert('Thất bại trong việc tạo tài khoản.')
            }
            if (loading) return <p>Loading...</p>;  
            if (error) return <p>An error occurred</p>;
        }
    });

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
                        .required('\u2715 Vui lòng nhập tên người dùng')
                        .matches(/^\w+$/, 'Chỉ có thể chứa dấu gạch dưới')
                        .lowercase('Chỉ sử dụng chữ viết thường'),
                        password: Yup.string()
                        .min(3, 'Phải chứa ít nhất 3 ký tự')
                        .required('\u2715 Vui lòng nhập mật khẩu'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        userRegister({ variables: {
                            email: values.email,
                            name: values.username,
                            password: values.password 
                          } 
                        })
                        setSubmitting(false);
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
                    <p>Bạn đã có tài khoản ?  <Link to="/accounts/login">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;
