import React from 'react'
import PostItem from './PostItem/PostItem'
import PropTypes from 'prop-types';

function Posts({ posts, refetch }) {
    return (
        <div>
            {
                posts.map(post => (
                    <div key={post.id}>
                        <PostItem post={post} 
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


