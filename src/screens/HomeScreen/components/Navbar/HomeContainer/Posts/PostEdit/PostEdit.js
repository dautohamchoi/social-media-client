import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './PostEdit.css';



function PostEdit({ deleteHandler, postId, handleUpdate }) {
    const { pathname } = window.location;

    // postId equals to cmtId as postId
    function PostEditItem(props) {
        return (
            <div className="postEdit__item">
                <span className="postEdit__icon">{props.icon}</span>
                <span className="postEdit__feature">{props.feature}</span>
            </div>
        )
    }

    return (
        <div className="postEdit">
            <ul>
                {
                    pathname.length < 5 &&
                    <li>
                        <Link to={`/posts/${postId}`} className="postEdit__link" >
                            <PostEditItem 
                                icon={<FontAwesomeIcon icon={faArrowCircleRight} />}
                                feature="Đi tới bài viết"
                            />
                        </Link>
                    </li> 
                }   
                <li onClick={handleUpdate}>
                    <PostEditItem 
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            feature="Chỉnh sửa"
                    />                
                </li>    
                <li onClick={() => deleteHandler(postId)}>
                    <PostEditItem 
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        feature="Xoá"
                    />
                </li>
            </ul>
        </div>
    )
}

export default PostEdit;
