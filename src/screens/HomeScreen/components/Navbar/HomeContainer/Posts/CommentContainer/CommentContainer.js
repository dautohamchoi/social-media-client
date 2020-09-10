import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment/Comment';
import './CommentContainer.css';
import PropTypes from 'prop-types';

function CommentContainer({ comments, refetch }) {
    const postId = comments.length ? comments[0].post.id : null;
    const pathname = window.location.pathname;

    return (
        <div className="commentContainer">
            <div className="commentContainer__title">
                {
                    comments.length === 0 ? 
                    <p>Hãy là người đầu tiên bình luận</p>
                    :
                    pathname.length > 1 ? null
                    : 
                    <Link to={`/posts/${postId}`}>Xem tất cả bình luận</Link>
                }
            </div>
            <div>
                {
                    comments.map(comment => (
                        <div key={comment.id}>
                            <Comment comment={comment} refetch={refetch}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

CommentContainer.propTypes = {
    comments: PropTypes.array
};

export default CommentContainer;
