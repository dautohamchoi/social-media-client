import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Comment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ADD_LIKE, REMOVE_LIKE } from '../../../../../../../../queries/likeQuery';
import { useMutation } from '@apollo/client';
import Avatar from '../../../../../Avatar/Avatar';
import spanBetweenDays from '../../../../../../../../functionality/spanBetweenDays';
import PostEdit from '../../PostEdit/PostEdit';
import OutsideClickHandler from 'react-outside-click-handler';
import { DELETE_COMMENT } from '../../../../../../../../queries/commentQuery';
import CommentForm from '../../CommentForm/CommentForm';



function Comment({ comment, refetch }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;
    const likedUser = comment.likes.find(like => like.user.id === userId);
    const [like, setLike] = useState(!!likedUser);
    const pathname = window.location.pathname;
    const [displayEdit, setDisplayEdit] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false)



    const [addLike] = useMutation(ADD_LIKE, {
        onCompleted: () => {
            refetch();
            setLike(true);
        }
    });
    const [removeLike] = useMutation(REMOVE_LIKE, {
        onCompleted: () => {
            refetch();
            setLike(false);
        }
    });
    const likeHandler = () => {
        if (!like) {
            addLike({ variables: { postId: comment.id, userId: userId }});
        } else {
            if (likedUser) {
                removeLike({ variables: { likeId: likedUser.id }});
            }
        }
    }
    const [deleteComment] = useMutation(DELETE_COMMENT, {
        onCompleted: () => refetch()
    });
    const deleteHandler = (id) => {;
        if (window.confirm("Bạn thực sự muốn xoá bình luận này ?")) {
            deleteComment({ variables: { cmtId: id } });
        }
    }

    const handleUpdate = () => {
        setOpenUpdate(!openUpdate);
        setOpenEdit(false);
        console.log('handleUpd')
    }
    const closeUpdateHandler = () => {
        setOpenUpdate(false);
        console.log('escape')
    }

    return (
        <div className="comment" 
            onMouseEnter={() => setDisplayEdit(true)}
            onMouseLeave={() => openEdit ? null : setDisplayEdit(false)}
        >
            {
                !openUpdate &&
                <div className="comment__newsFeed">
                    {
                        pathname.length > 1 &&
                        <div className="comment__avatar">
                            <Avatar user={comment.user} />
                        </div>
                    }
                    <div className="comment__content">
                        <Link to={`/${comment.user.name}`}>
                            {comment.user.name}
                        </Link>
                        <span>{comment.contentCmt}</span>
                        {
                            pathname.length > 1 &&
                            <div className="comment__content__footer">
                                <span>
                                    {spanBetweenDays(comment.createdAt, new Date)}
                                </span>
                                <span className="comment__content__likeCount">{comment.likes.length} lượt thích</span>
                            </div>
                        }
                    </div>
                    <div>
                        <button 
                            onClick={likeHandler}
                            style={ like ? { color: "#ff8686" } : { color: "#969696" }}
                        >
                            <FontAwesomeIcon icon={faThumbsUp}/>
                        </button>
                    </div>
                    {
                        displayEdit &&
                        <div>
                            <OutsideClickHandler onOutsideClick={() => setOpenEdit(false)}>
                                <aside className="comment__edit_btn">
                                    <button onClick={() => setOpenEdit(!openEdit)}>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </button>
                                    {
                                        openEdit &&
                                        <div className="comment__edit" >
                                            <PostEdit 
                                                deleteHandler={deleteHandler}
                                                postId={comment.id}
                                                handleUpdate={handleUpdate}
                                            />  
                                        </div> 
                                    }
                                </aside>
                            </OutsideClickHandler>
                        </div>    
                    }   
                </div>
            }
            <div className="">
                {
                    openUpdate &&
                    <div className="comment__update">
                        <CommentForm 
                            refetch={refetch} 
                            contentCmt={comment.contentCmt}
                            cmtId={comment.id} 
                            closeUpdateHandler={closeUpdateHandler}
                        />
                        <button 
                            className="comment__update__cancelBtn"
                            onClick={() => setOpenUpdate(false)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            <span> Huỷ</span>
                        </button>
                    </div>    
                }
            </div> 
        </div>
    )
}

export default Comment
