import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './HeroEdit.css';
import Avatar from '../../../HomeScreen/components/Avatar/Avatar';
import { USER_UPDATE_DETAIL } from '../../../../queries/userQuery';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function HeroEdit({ user, handleEditClick }) {

    const [userUpdateDetail, { loading, error }] = useMutation(USER_UPDATE_DETAIL, {
        onCompleted: handleEditClick
    });
 
    return (
        <div>
            <div className="heroEdit__container">
                <div className="heroEdit__header">
                    <div className="heroEdit__header__avatar">
                        <Avatar user={user} bigPhoto={true} />    
                    </div>
                    <div className="heroEdit__header__info">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <div>
                            <button>Thay đổi ảnh đại diện</button>
                        </div>
                    </div>
                    <aside>
                        <button onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </aside>
                </div>
                <Formik
                    initialValues={{ nickname: user.nickname, status: user.status }}
                    validationSchema={Yup.object({
                        nickname: Yup.string()
                        .min(3, 'Phải chứa ít nhất 3 ký tự')
                        .max(30, 'Không vượt quá 30 ký tự')
                        .required('\u2715 Vui lòng nhập biệt danh của bạn'),
                        status: Yup.string()
                        .min(3, 'Phải chứa ít nhất 3 ký tự')
                        .max(150, 'Không vượt quá 150 ký tự')
                        .required('\u2715 Vui lòng nhập tiểu sử của bạn'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        userUpdateDetail({ variables: { 
                            id: user.id,
                            nickname: values.nickname,
                            status: values.status
                        }})
                        setSubmitting(false);
                    }}
                    >
                    <Form>
                        <label htmlFor="nickname">Biệt danh</label>
                        <Field name="nickname" type="text" />
                        <ErrorMessage name="nickname" component="div" />
                        <label htmlFor="status">Tiểu sử</label>
                        <Field name="status" type="text" component="textarea" />
                        <ErrorMessage name="status" component="div" />
                        <button type="submit">Lưu</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default HeroEdit
