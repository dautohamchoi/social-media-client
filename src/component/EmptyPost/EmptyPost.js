import React from 'react';
import './EmptyPost.css';

function EmptyPost() {
    return (
        <div className="emptyPost">
            <div>
                <div className="emptyPost__img">
                    <img src="/box.svg" alt="empty" />
                </div>
                <div>
                    <h3>Chưa có bài viết</h3>
                </div>
            </div>
        </div>
    )
}

export default EmptyPost
