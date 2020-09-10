import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';

import './Status.css';
import Avatar from '../../../Avatar/Avatar';


function Status({ userInfo, postStatus, post, closeUpdateHandler }) {
    const [status, setStatus] = useState(post ? post.contentPost : '');


    return (
        <form className={post ? "status update" : "status"}
            onSubmit={(e) => {
                e.preventDefault();
                if (status) {
                    if (post) {
                        postStatus(post.id, status);
                    } else {
                        postStatus(userInfo.id, status);
                    }
                }
                setStatus('');
            }}
        >
            <div className="status__info">
                <div className="status__info__avatar">
                    {
                        userInfo &&
                        <Avatar user={userInfo} />
                    }  
                </div>
                <div className="status__info__content">
                    <TextareaAutosize 
                        type="text"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Bạn đang nghĩ gì thế ..."
                        required
                    />
                    
                </div>
                {
                    post &&
                    <div className="status__info__close">
                        <button type="button" onClick={closeUpdateHandler}>
                            <FontAwesomeIcon icon={faTimes} className="status__info__icon" />
                        </button>
                    </div>    
                }
            </div>
            <div className="status__features">
                <div>
                    <button type="button"
                        className="status__features__upload"
                    >
                        <FontAwesomeIcon icon={faImages} />
                        <span> Ảnh/Video</span>
                    </button>
                </div>
                <div>
                    <button 
                        className="status__features__post"
                        type="submit"
                    >
                        {
                            post ? "Lưu" : "Đăng"
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}
Status.defaultProps = {
    userInfo: {
        id: 0,
        name: '',
        imageUser: ''
    }
}

export default Status
