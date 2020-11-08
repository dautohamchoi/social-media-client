import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';

import './Status.css';
import Avatar from '../../../Avatar/Avatar';
import { gql, useApolloClient, useMutation } from '@apollo/client';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id  
      path
      filename
      mimetype
    }
  }
`;

function Status({ userInfo, postStatus, post, closeUpdateHandler }) {
    const [status, setStatus] = useState(post ? post.contentPost : '');
    const [imagePost, setImagePost] = useState('');

    const [uploadImage, { data }] = useMutation(SINGLE_UPLOAD_MUTATION);
    const apolloClient = useApolloClient();

    const uploadHandler = ({
        target: {
          validity,
          files: [file],
        },
      }) =>
        validity.valid &&
        uploadImage({ variables: { file } }).then(() => {
          apolloClient.resetStore();
    });
    
    useEffect(() => {
        if (data) {
            const imageUrl = "https://dautohamchoi.s3-ap-southeast-1.amazonaws.com/" + data.uploadImage.path.slice(10);
            setImagePost(imageUrl);
        }
    }, [data])

    return (
        <form className={post ? "status update" : "status"}
            onSubmit={(e) => {
                e.preventDefault();
                if (status) {
                    if (post) {
                        postStatus(post.id, status);
                    } else {
                        postStatus(userInfo.name, status, imagePost);
                    }
                }
                setStatus('');
                setImagePost('')
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
            {
                imagePost &&
                <div className="status__imageContainer">
                    <img 
                        src={imagePost} 
                        alt="upload-fail"
                        className="status__imagePost"
                    />
                </div>
            }
            <div className="status__features">
                {
                    post ? 
                    <div className="status__features__note">(*) Chỉ thay đổi nội dung bài viết.</div> 
                    :
                    <div>
                        <label for="file-upload" className="status__features__upload">
                                <FontAwesomeIcon icon={faImages} />
                                <span> Hình ảnh</span>
                        </label>
                        <input id="file-upload"  type="file" onChange={uploadHandler} />
                    </div>
                }
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
