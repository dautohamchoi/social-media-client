import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import { LOGIN_USER, IS_LOGGED_IN } from '../../queries/userQuery';
import { useMutation, useApolloClient, useQuery } from '@apollo/client';
import Cookie from 'js-cookie';


function LoginScreen(props) {
    const client = useApolloClient();
    const token = localStorage.getItem('token');
    console.log(token);
    // const userInfo = Cookie.getJSON('userInfo');
    
    const [userLogin, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted ({ userLogin }) {
            // Cookie.set('userInfo', userLogin);
            if (userLogin.token) {
                localStorage.setItem('token', userLogin.token);
                localStorage.setItem('userInfo', JSON.stringify(userLogin))
                props.history.push("/");
            } else {
                alert('Wrong email or password.')
            }
            
            // client.write({ data: { isLoggedIn: true } });

            // if (userLogin) return props.history.push("/");
            if (loading) return <p>Loading...</p>;  
            if (error) return <p>An error occurred</p>;
        }
        // => {
        //     console.log(loading);
        //     console.log(data);
        //     Cookie.set('userInfo', JSON.stringify(data));
        //     // props.history.push("/");
        // }
    });

    useEffect(() => {
        if (token) {
            // if user login successfully, they cannot login again
            props.history.push("/");
        }
    }, [token])

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
                    <p>Bạn chưa có tài khoản ?  <Link to="/register">Đăng ký</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
