import React from 'react'
import PostItem from './PostItem/PostItem'
import PropTypes from 'prop-types';

function Posts({ posts, refetch, bookmarks }) {
    return (
        <div>
            {
                posts &&
                posts.map(post => (
                    <div key={post.id}>
                        <PostItem post={post} 
                            refetch={refetch} 
                        />
                    </div>
                ))
            }
            {
                bookmarks &&
                bookmarks.map(bookmark => (
                    <div key={bookmark.id}>
                        <PostItem post={bookmark.post} 
                            refetch={refetch} 
                        />
                    </div>
                ))
            }
        </div>
    )
}

Posts.propTypes = {
    posts: PropTypes.array
}

export default Posts;


