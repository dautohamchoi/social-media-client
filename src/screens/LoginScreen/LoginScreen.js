import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import { LOGIN_USER,} from '../../queries/userQuery';
import { useMutation } from '@apollo/client';



function LoginScreen() {
    
    const [userLogin, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted ({ userLogin }) {

            if (userLogin.token) {
                localStorage.setItem('token', userLogin.token);
                localStorage.setItem('userInfo', JSON.stringify(userLogin))
                window.location.reload();
            } else {
                alert('Wrong email or password.')
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
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                        .email('\u2715 Địa chỉ Email không hợp lệ')
                        .required('\u2715 Vui lòng nhập Email'),
                        password: Yup.string()
                        .required('\u2715 Vui lòng nhập mật khẩu'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        userLogin({ variables: { email: values.email, password: values.password } });
                        setSubmitting(false);
                    }}
                    >
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" component="div" />
                        <label htmlFor="password">Mật khẩu</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit">Đăng nhập</button>
                    </Form>
                </Formik>
                <div>
                    <p>Bạn chưa có tài khoản ?  <Link to="/accounts/register">Đăng ký</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
