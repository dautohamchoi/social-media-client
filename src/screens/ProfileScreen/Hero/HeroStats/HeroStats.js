import React from 'react';
import './HeroStats.css';


function HeroStats({ user, handleFollowersClick, handleFollowingPeopleClick }) {
    return (
        <div className="heroStats">
            <ul>
                <li>
                    <span>{user.posts.length} bài viết</span>
                </li>
                <li>
                    <button onClick={handleFollowersClick}>
                        <span>{user.followers.length} </span>
                        người theo dõi
                    </button>
                </li>
                <li>
                    <button onClick={handleFollowingPeopleClick}>
                        Đang theo dõi
                        <span> {user.followingPeople.length} </span>
                        người dùng
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default HeroStats
