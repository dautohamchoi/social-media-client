import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faCommentAlt, faBookmark, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import './PostItem.css';
import CommentForm from '../CommentForm/CommentForm';
import CommentContainer from '../CommentContainer/CommentContainer';
import PostEdit from '../PostEdit/PostEdit';
import OutsideClickHandler from 'react-outside-click-handler';
import { DELETE_POST, UPDATE_POST } from '../../../../../../../queries/postQuery';
import { useMutation } from '@apollo/client';
import Status from '../../Status/Status';
import { ADD_LIKE, REMOVE_LIKE } from '../../../../../../../queries/likeQuery';
import Avatar from '../../../../Avatar/Avatar';
import { Link } from 'react-router-dom';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../../../../../../../queries/bookmarkQuery';
import Progress from '../../Progress/Progress';

function PostItem({ post, refetch }) {
    const pathname = window.location.pathname
    const [openComment, setOpenComment] = useState(pathname.length > 1 ? true : false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;
    const likedPost = post.likes.find(like => like.user.id === userId);
    const savedPost = post.bookmarks.find(bookmark => bookmark.user.id === userId);
    const [like, setLike] = useState(!!likedPost);
    const [bookmark, setBookmark] = useState(!!savedPost);


    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted: () => refetch()
    });
    const [updatePost] = useMutation(UPDATE_POST, {
        onCompleted: () => refetch()
    });

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

    const [addBookmark] = useMutation(ADD_BOOKMARK, {
        onCompleted: () => {
            refetch();
            setBookmark(true);
        }
    });
    const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
        onCompleted: () => {
            refetch();
            setBookmark(false);
        }
    });

    const deleteHandler = (id) => {;
        if (window.confirm("Bạn thực sự muốn xoá bài viết này ?")) {
            deletePost({ variables: { postId: id } });
        }
    }
    const likeHandler = () => {
        if (!like) {
            addLike({ variables: { postId: post.id, userId: userId }});
        } else {
            if (likedPost) {
                removeLike({ variables: { likeId: likedPost.id }});
            }
        }
    }

    const bookmarkHandler = () => {
        if (!bookmark) {
            addBookmark({ variables: { postId: post.id, userId: userId }});
        } else {
            if (savedPost) {
                removeBookmark({ variables: { bookmarkId: savedPost.id }});
            }
        }
    }

    const handleUpdate = () => {
        setOpenUpdate(!openUpdate);
        setOpenEdit(false);
    }

    const updateHandler = (postId, contentPost) => {
        updatePost({ variables: { postId, contentPost }});
        setOpenUpdate(false);
    }
    const closeUpdateHandler = () => {
        setOpenUpdate(false);
    }


    return (
        <div className="postItem">
            <div className="postItem__header">
                <div className="postItem__header__info">
                    <div className="postItem__header__avatar">
                        <Avatar user={post.user} />
                    </div>
                    <div>
                        <Link to={`/${post.user.name}`}>
                            <h4>{post.user.name}</h4>
                        </Link>
                        <p>{post.createdAt.slice(4, 15) + ", " + post.createdAt.slice(16, 21)}</p>
                    </div>
                </div>
            </div>
            <div>
                <p>{post.contentPost}</p>
            </div>
            {
                post.imagePost && 
                <div className="postItem__imageContainer">
                    <img 
                        alt="post_img" 
                        src={post.imagePost}
                        className="postItem__imagePost" 
                    />
                </div>
            }
            <div className="postItem__footer">
                <div className="postItem__footer__left">
                    <button 
                        onClick={likeHandler}
                        style={ like ? { color: "#ff8686" } : { color: "#969696" } }
                    >
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span>  {post.likes.length}</span>
                    </button>
                    <button
                        onClick={() => setOpenComment(!openComment)}
                        style={ openComment ? { color: "#ff8686" } : { color: "#969696" } }
                    >
                        <FontAwesomeIcon icon={faCommentAlt}  />
                        <span>  {post.comments.length} </span>
                    </button>
                </div>
                <div className="postItem__footer__right">
                    <button
                        onClick={bookmarkHandler}
                        style={ bookmark ? { color: "#ff8686" } : { color: "#969696" } }
                    >
                        <FontAwesomeIcon icon={faBookmark} />
                    </button>
                </div>
            </div>
            {
                openComment &&
                <div>
                    <CommentContainer comments={post.comments} refetch={refetch} />
                </div>
            }
            <div>
                <CommentForm postId={post.id} refetch={refetch} />
            </div>

            <OutsideClickHandler onOutsideClick={() => setOpenEdit(false)}>
                <aside className="postItem__button__edit">
                    <button onClick={() => openEdit ? setOpenEdit(false) : setOpenEdit(true)}>
                        <FontAwesomeIcon icon={faEllipsisH} className="postItem__icon" />
                    </button>
                </aside>
                {
                    openEdit &&
                    <aside className="postItem__edit" >
                        <PostEdit 
                            deleteHandler={deleteHandler} 
                            postId={post.id} 
                            handleUpdate={handleUpdate}
                        />  
                    </aside> 
                }     
            </OutsideClickHandler>
            {
                openUpdate &&
                <div className="postItem__edit__update">
                    <div className="postItem__edit__update__container">
                        <OutsideClickHandler onOutsideClick={() => setOpenUpdate(false)}>
                            <Status 
                                userInfo={userInfo} post={post} 
                                postStatus={updateHandler} 
                                closeUpdateHandler={closeUpdateHandler}
                            />  
                        </OutsideClickHandler>
                    </div>    
                </div>
            }    
        </div>
    )
}

export default PostItem
