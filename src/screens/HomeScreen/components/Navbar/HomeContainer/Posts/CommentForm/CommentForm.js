import React, { useState } from 'react'
import './CommentForm.css';
import { CREATE_COMMENT, UPDATE_COMMENT } from '../../../../../../../queries/commentQuery';
import { useMutation } from '@apollo/client';
import Avatar from '../../../../Avatar/Avatar';
import TextareaAutosize from 'react-textarea-autosize';



function CommentForm({ postId, refetch, contentCmt, cmtId, closeUpdateHandler }) {
    const [cmtContent, setCmtContent] = useState(contentCmt);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
        onCompleted: () => refetch()
    });
    const [updateComment] = useMutation(UPDATE_COMMENT, {
        onCompleted: () => refetch()
    });
    
    const postComment = (e) => {
        e.preventDefault();
        createComment({ variables: { 
            userId: userInfo.id,
            postId: postId,
            contentCmt: cmtContent
        }});
        setCmtContent('');
    }

    const editComment = (e) => {
        e.preventDefault();
        console.log('edit')
        console.log(cmtId, cmtContent);
        updateComment({ variables: { 
            cmtId: cmtId,
            contentCmt: cmtContent
        }});
        closeUpdateHandler();
    }

    return (
        <div className="commentForm">
            <div className="commentForm__avatar">
                <Avatar user={userInfo} />
            </div>
            <form onSubmit={contentCmt ? editComment : postComment}>
                <TextareaAutosize 
                    type="text"
                    name="comment"
                    value={cmtContent}
                    onChange={(e) => setCmtContent(e.target.value)}
                    onKeyPress={(event) => event.key === 'Escape' ? closeUpdateHandler : null }
                    placeholder="Thêm bình luận ..."
                    required
                />
                <div className="commentForm__btn">
                    <button type="submit">
                        {
                            contentCmt ? "Lưu" : "Đăng"
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm
