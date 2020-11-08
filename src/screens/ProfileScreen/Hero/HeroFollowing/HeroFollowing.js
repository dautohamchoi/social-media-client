import React from 'react';
import Avatar from '../../../HomeScreen/components/Avatar/Avatar';
import './HeroFollowing.css';

function HeroFollowing({ user, follow, bigPhoto, handleFollowingClick, removeFollowClick}) {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // const name = userInfo.name;
    // const follow = user.followers.find(follower => follower.user.name === name);
    
    return (
        <div>
            <div className="heroFollowing__container">
                <div className="heroFollowing__container__header">
                    <Avatar user={user} bigPhoto={bigPhoto} />
                    <p>Bỏ theo dõi @{user.name} ?</p>
                </div>
                <button 
                    className="heroFollowing__btn__removed"
                    onClick={() => removeFollowClick(follow.id)}
                >Bỏ theo dõi</button>
                <button onClick={handleFollowingClick}>Huỷ</button>
            </div>
        </div>
    )
}

export default HeroFollowing
